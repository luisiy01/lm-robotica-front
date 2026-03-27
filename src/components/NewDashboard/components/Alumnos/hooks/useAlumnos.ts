// hooks/useAlumnos.ts
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const useAlumnos = (alumnos: any[] = []) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [nivelFilter, setNivelFilter] = useState('Todos');

    const filteredAlumnos = useMemo(() => {
        // Si no hay alumnos (aún cargando o error), devolvemos vacío
        if (!alumnos) return [];

        // Si no hay término de búsqueda, devolvemos la lista completa
        if (!searchTerm.trim()) return alumnos;

        // Filtrado por nombre
        return alumnos.filter(alumno =>
            alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, alumnos]);

    // Función para exportar a EXCEL
    const exportToExcel = () => {
        const dataToExport = filteredAlumnos.map(a => ({
            Nombre: a.nombre,
            Email: a.email,
            Nivel: a.nivel,
            Proyectos: a.proyectos,
            Asistencia: a.asistencia
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos");
        XLSX.writeFile(workbook, `Lista_Alumnos_LM_Robotica.xlsx`);
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Reporte de Alumnos - LM Robótica", 14, 15);

        const tableColumn = ["Nombre", "Email", "Nivel", "Proyectos", "Asistencia"];
        const tableRows = filteredAlumnos.map(a => [
            a.nombre, a.email, a.nivel, a.proyectos, a.asistencia
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            theme: 'striped',
            headStyles: { fillColor: [14, 165, 233] } // Color sky-500
        });

        doc.save(`Reporte_Alumnos.pdf`);
    };

    const handleEdit = (id: number) => navigate(`/dashboard/alumnos/editar/${id}`);
    const handleCreate = () => navigate('/dashboard/alumnos/nuevo');

    return {
        searchTerm, setSearchTerm,
        nivelFilter, setNivelFilter,
        filteredAlumnos,
        handleEdit, handleCreate,
        exportToExcel, exportToPDF
    };
};