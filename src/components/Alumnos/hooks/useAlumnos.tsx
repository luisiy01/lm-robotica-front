import { useState, useEffect } from "react";
import { type GridColDef } from "@mui/x-data-grid";
import { getAlumnos } from "../../../services/alumno.service";
import { useStore } from "../../../store/useStore";
import { Button } from "@mui/material";

export const useAlumnos = () => {
  const { alumno, selectAlumno } = useStore();
  const [rowsAlumnos, setRowsAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!alumno) listaDeAlumnos();
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

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 250 },
    {
      field: "accion",
      headerName: "Accion",
      width: 190,
      sortable: false,
      filterable: false,
      renderCell: (_params) => {
        return (
          <Button variant="contained" onClick={() => selectAlumno(_params.row)}>
            Ver
          </Button>
        );
      },
    },
  ];

  return {
    rowsAlumnos,
    columns,
    loading,
  };
};
