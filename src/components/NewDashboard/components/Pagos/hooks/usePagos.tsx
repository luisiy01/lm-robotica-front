// pages/Pagos/hooks/usePagos.ts
import { useState, useMemo } from 'react';

export const usePagos = (pagos: any[] = []) => {
    const [searchTerm, setSearchTerm] = useState('');

    // 1. Lógica de filtrado por nombre de alumno
    const filteredPagos = useMemo(() => {
        if (!pagos) return [];
        if (!searchTerm.trim()) return pagos;

        return pagos.filter(pago =>
            pago.alumnos?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, pagos]);

    // 2. Cálculos financieros (Solo sumamos los completados)
    const stats = useMemo(() => {
        const total = filteredPagos.reduce((acc, pago) =>
            pago.estado === 'completado' ? acc + Number(pago.monto) : acc, 0
        );

        const pendientes = filteredPagos.filter(p => p.estado === 'pendiente').length;

        const esteMes = filteredPagos.filter(p => {
            const fecha = new Date(p.fecha_pago);
            const hoy = new Date();
            return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
        }).length;

        return { total, pendientes, esteMes };
    }, [filteredPagos]);

    return {
        searchTerm,
        setSearchTerm,
        filteredPagos,
        stats
    };
};