import { useState, useMemo } from "react";
import { useAsistencias } from "../../hooks/useAsistencias";
import { useNuevoPago } from "../../../Pagos/hooks/useNuevoPago";
import { useAlumnosQueries } from "../../../Alumnos/hooks/queries/useAlumnosQueries";

export const useModalProgramarClase = ({
  isOpen,
  onClose,
  selectedDay,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: Date | undefined;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { alumnosQuery } = useAlumnosQueries();
  const { searchTerm, setSearchTerm } = useNuevoPago(() => {});

  const alumnos = alumnosQuery.data || [];

  const filteredAlumnos = useMemo(() => {
    return alumnos.filter((a: any) =>
      a.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [alumnos, searchTerm]);

  const {
    isGuardando,
    alumnoSeleccionado,
    setAlumnoSeleccionado,
    horaSeleccionada,
    setHoraSeleccionada,
    guardarHorario,
  } = useAsistencias(() => {
    onClose();
    clearData();
  });

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    guardarHorario(selectedDay);
  };

  const clearData = () => {
    setSearchTerm("");
    setAlumnoSeleccionado(null);
    setHoraSeleccionada("");
    setShowDropdown(false);
  };

  return {
    showDropdown,
    setShowDropdown,
    isGuardando,
    searchTerm,
    setSearchTerm,
    alumnos: filteredAlumnos,
    alumnoSeleccionado,
    setAlumnoSeleccionado,
    horaSeleccionada,
    setHoraSeleccionada,
    handleFormSubmit,
    clearData,
  };
};
