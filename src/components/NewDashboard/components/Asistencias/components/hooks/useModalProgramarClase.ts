import { useState } from "react";
import { useAsistencias } from "../../hooks/useAsistencias";

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

  const {
    isGuardando,
    searchTerm,
    setSearchTerm,
    filteredAlumnos,
    alumnoSeleccionado,
    setAlumnoSeleccionado,
    horaSeleccionada,
    setHoraSeleccionada,
    guardarHorario,
  } = useAsistencias(onClose);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    guardarHorario(selectedDay);
  };

  return {
    showDropdown,
    setShowDropdown,
    isGuardando,
    searchTerm,
    setSearchTerm,
    filteredAlumnos,
    alumnoSeleccionado,
    setAlumnoSeleccionado,
    horaSeleccionada,
    setHoraSeleccionada,
    handleFormSubmit,
  };
};
