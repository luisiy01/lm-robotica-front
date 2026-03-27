// hooks/useAlumnos.ts
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoLM from "@assets/images/logo_lm_robotica.jpg";

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
            "Nombre del Ingeniero": a.nombre,
            "Tutor Responsable": a.nombreTutor,
            "Teléfono de Emergencia": a.telefono,
            "Notas Médicas / Alergias": a.alergias || 'Ninguna'
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos_LM");
        XLSX.writeFile(workbook, `Lista_Alumnos_LM_Robotica.xlsx`);
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 14;

        // --- 1. CONFIGURACIÓN DEL LOGO ---
        // Ajustamos dimensiones para que no invada el espacio del texto
        const logoW = 25;
        const logoH = 25;
        const logoX = margin;
        const logoY = 10;

        try {
            doc.addImage(logoLM, 'JPEG', logoX, logoY, logoW, logoH);
        } catch (e) {
            console.error("Error al cargar el logo", e);
        }

        // --- 2. TEXTOS DEL ENCABEZADO (DESPLAZADOS A LA DERECHA) ---
        // Empezamos el texto después del ancho del logo (logoX + logoW + 8mm de espacio)
        const textX = logoX + logoW + 8;
        const textY = logoY + 8;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(31, 41, 55); // Gris oscuro
        doc.text("LM ROBÓTICA", textX, textY);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Reporte Oficial de Ingenieros Inscritos", textX, textY + 6);
        doc.text(`Fecha: ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, textX, textY + 11);

        // --- 3. LÍNEA DE SEPARACIÓN ---
        // La línea va debajo del logo y el texto (punto más bajo + margen)
        const lineY = logoY + logoH + 5;
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, lineY, pageWidth - margin, lineY);

        // --- 4. TABLA DE DATOS ---
        const tableColumn = ["Ingeniero", "Tutor Responsable", "Teléfono", "Notas Médicas"];
        const tableRows = (filteredAlumnos || []).map(a => [
            a.nombre.toUpperCase(),
            a.nombreTutor,
            a.telefono,
            a.alergias || 'Sin observaciones'
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: lineY + 10, // Iniciamos la tabla 10mm debajo de la línea
            theme: 'striped',
            headStyles: {
                fillColor: [14, 165, 233],
                halign: 'center',
                fontStyle: 'bold'
            },
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: {
                0: { cellWidth: 50 },
                3: { cellWidth: 'auto' }
            }
        });

        // --- 5. PIE DE PÁGINA ---
        const pageCount = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                `Página ${i} de ${pageCount} - LM Robótica`,
                pageWidth / 2,
                doc.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
        }

        doc.save(`Reporte_Alumnos_LM_${new Date().getTime()}.pdf`);
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