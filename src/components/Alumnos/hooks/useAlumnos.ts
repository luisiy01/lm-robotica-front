import { useState, useEffect } from "react";
import { getAlumnos } from "../../../services/alumno.service";
import { useStore } from "../../../store/useStore";

export const useAlumnos = () => {
  const { alumno } = useStore();
  const [rowsAlumnos, setRowsAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listaDeAlumnos();
  }, [alumno]);

  const listaDeAlumnos = async () => {
    setLoading(true);
    getAlumnos()
      .then((listAlumnos) => {
        if (listAlumnos.status === 200) {
          setRowsAlumnos(listAlumnos.data);
          return;
        }
        setRowsAlumnos([]);
      })
      .catch((error) => {
        console.log("error", error);
        setRowsAlumnos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    rowsAlumnos,
    loading,
  };
};
