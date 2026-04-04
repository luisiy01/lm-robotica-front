// pages/Pagos/hooks/usePagos.ts
import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const usePagos = (pagos: any[] = []) => {
  const [dateRange, setDateRange] = useState({ inicio: "", fin: "" });

  const filteredPagos = useMemo(() => {
    if (!pagos) return [];
    const { inicio, fin } = dateRange;
    return pagos.filter((pago) => {
      const fechaPago = new Date(pago.fecha_pago).getTime();
      if (inicio && fin) {
        const start = new Date(inicio).getTime();
        const end = new Date(fin).getTime();
        return fechaPago >= start && fechaPago <= end;
      }
      if (inicio) return fechaPago >= new Date(inicio).getTime();
      if (fin) return fechaPago <= new Date(fin).getTime();
      return true;
    });
  }, [dateRange, pagos]);

  // Función para Exportar Excel
  const exportToExcel = () => {
    const data = filteredPagos.map((p) => ({
      Fecha: new Date(p.fecha_pago).toLocaleDateString(),
      Ingeniero: p.alumnos?.nombre,
      Concepto: p.concepto,
      Duracion: `${p.duracion} mes(es)`,
      Monto: p.monto,
      Metodo: p.metodo_pago,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pagos");
    XLSX.writeFile(
      workbook,
      `Reporte_Pagos_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
  };

  // Función para Exportar PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Pagos - LM Robotica", 14, 15);
    const tableRows = filteredPagos.map((p) => [
      new Date(p.fecha_pago).toLocaleDateString(),
      p.alumnos?.nombre,
      p.concepto,
      `${p.duracion} mes(es)`,
      `$${p.monto}`,
    ]);
    autoTable(doc, {
      head: [["Fecha", "Ingeniero", "Concepto", "Duración", "Monto"]],
      body: tableRows,
      startY: 20,
    });
    doc.save(`Reporte_Pagos_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const stats = useMemo(() => {
    const total = filteredPagos.reduce(
      (acc, pago) =>
        pago.estado === "completado" ? acc + Number(pago.monto) : acc,
      0,
    );
    const pendientes = filteredPagos.filter(
      (p) => p.estado === "pendiente",
    ).length;
    return { total, pendientes };
  }, [filteredPagos]);

  return {
    dateRange,
    setDateRange,
    filteredPagos,
    stats,
    exportToExcel,
    exportToPDF,
  };
};
