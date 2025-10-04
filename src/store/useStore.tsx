import { create } from "zustand";
import type { Alumno } from "../interfaces/Alumno";

type State = {
  // properties
  alumno: Alumno | null;
  // getters

  // actions
  selectAlumno: (alumno: Alumno) => void;
  disSelectAlumno: () => void;
  newAlumno: () => void;
};

export const useStore = create<State>()((set, _get) => ({
  //implementacion
  alumno: null,
  //getters

  //actions
  selectAlumno: (alumno: Alumno) => {
    set({ alumno });
  },
  disSelectAlumno: () => {
    set({ alumno: null });
  },
  newAlumno: () => {
    const newAlumno: Alumno = {
      id: null,
      nombre: "",
      horario1: "",
      horario2: "",
      diaCobro: 1,
      costoMensual: 0,
      contacto: "",
    };
    set({ alumno: newAlumno });
  },
}));
