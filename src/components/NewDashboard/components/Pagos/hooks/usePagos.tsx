// pages/Pagos/hooks/usePagos.ts
import { useState, useMemo } from "react";

export const usePagos = (pagos: any[] = []) => {
  // Estado para el rango de fechas (YYYY-MM-DD)
  const [dateRange, setDateRange] = useState({
    inicio: "",
    fin: "",
  });

  // 1. Filtrado por rango de fechas
  const filteredPagos = useMemo(() => {
    if (!pagos) return [];
    const { inicio, fin } = dateRange;

    return pagos.filter((pago) => {
      // Convertimos la fecha del pago a un formato comparable (sin horas)
      const fechaPago = new Date(pago.fecha_pago).getTime();

      // Si hay inicio y fin seleccionados
      if (inicio && fin) {
        const start = new Date(inicio).getTime();
        const end = new Date(fin).getTime();
        return fechaPago >= start && fechaPago <= end;
      }

      // Si solo hay fecha de inicio
      if (inicio) {
        return fechaPago >= new Date(inicio).getTime();
      }

      // Si solo hay fecha de fin
      if (fin) {
        return fechaPago <= new Date(fin).getTime();
      }

      return true; // Si no hay filtros, mostrar todo
    });
  }, [dateRange, pagos]);

  // 2. Estadísticas dinámicas basadas en el filtro
  const stats = useMemo(() => {
    const total = filteredPagos.reduce(
      (acc, pago) =>
        pago.estado === "completado" ? acc + Number(pago.monto) : acc,
      0,
    );

    const pendientes = filteredPagos.filter(
      (p) => p.estado === "pendiente",
    ).length;

    const esteMes = filteredPagos.filter((p) => {
      const fecha = new Date(p.fecha_pago);
      const hoy = new Date();
      return (
        fecha.getMonth() === hoy.getMonth() &&
        fecha.getFullYear() === hoy.getFullYear()
      );
    }).length;

    return { total, pendientes, esteMes };
  }, [filteredPagos]);

  return {
    dateRange,
    setDateRange,
    filteredPagos,
    stats,
  };
};
