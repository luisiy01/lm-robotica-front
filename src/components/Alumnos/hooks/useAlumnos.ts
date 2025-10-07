import { useState, useEffect } from "react";
import { getAlumnos } from "../../../services/alumno.service";

export const useAlumnos = () => {
  const [rowsAlumnos, setRowsAlumnos] = useState([]);

  useEffect(() => {
    listaDeAlumnos();
  }, []);

  const listaDeAlumnos = async () => {
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
      });
  };

  return {
    rowsAlumnos,
  };
};
