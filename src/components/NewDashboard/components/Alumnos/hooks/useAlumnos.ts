// hooks/useAlumnos.ts
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const initialAlumnosData = [
    { id: 1, nombre: "Mateo García", email: "mateo.g@email.com", nivel: "Advanced", proyectos: 12, asistencia: "95%", color: "bg-blue-500" },
    { id: 2, nombre: "Valentina Luna", email: "val.luna@email.com", nivel: "Intermediate", proyectos: 8, asistencia: "88%", color: "bg-yellow-500" },
    { id: 3, nombre: "Santiago Ruiz", email: "santi.robot@email.com", nivel: "Basic", proyectos: 3, asistencia: "100%", color: "bg-green-500" },
    { id: 4, nombre: "Lucía Fernández", email: "lucia.f@email.com", nivel: "Advanced", proyectos: 15, asistencia: "92%", color: "bg-purple-500" },
    { id: 5, nombre: "Thiago Pérez", email: "thiago.p@email.com", nivel: "Intermediate", proyectos: 7, asistencia: "80%", color: "bg-orange-500" },
];

export const useAlumnos = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [nivelFilter, setNivelFilter] = useState('Todos');

    const filteredAlumnos = useMemo(() => {
        return initialAlumnosData.filter((alumno) => {
            const matchesSearch =
                alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesNivel = nivelFilter === 'Todos' || alumno.nivel === nivelFilter;
            return matchesSearch && matchesNivel;
        });
    }, [searchTerm, nivelFilter]);

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