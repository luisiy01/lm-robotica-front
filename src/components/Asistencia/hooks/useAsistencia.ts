import { useState } from "react";

export const useAsistencia = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState(
    new Date().getMonth() + 1
  );
  const [yearSeleccionado, setYearSeleccionado] = useState(
    new Date().getFullYear()
  );

  const isChipSelected = (mes: number) => {
    return mesSeleccionado === mes ? true : false;
  };

  const nextYear = () => {
    setYearSeleccionado(yearSeleccionado + 1);
  };

  const backYear = () => {
    setYearSeleccionado(yearSeleccionado - 1);
  };

  return {
    isChipSelected,
    setMesSeleccionado,
    nextYear,
    backYear,
    yearSeleccionado
  };
};
