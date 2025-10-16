import { Button } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllPagos } from "../../../services/pagos.service";

export const usePagos = () => {
  type Alumno = {
    id: number;
    nombre: string;
    costo: number;
    diaCobro: number;
    statusPago: boolean;
  };
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (rowSelected: any) => {
    setAlumno(rowSelected);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "costo", headerName: "Costo", width: 70 },
    {
      field: "diaCobro",
      headerName: "Dia de Cobro",
      type: "number",
      width: 110,
    },
    {
      field: "statusPago",
      headerName: "Pago",
      width: 190,
      renderCell: (params) => {
        if (params.row.statusPago) {
          return (
            <Button style={{ backgroundColor: "green" }} variant="contained">
              Pagado
            </Button>
          );
        }
        return (
          <Button
            onClick={() => handleOpen(params.row)}
            style={{ backgroundColor: "#ffcc00" }}
            variant="contained"
          >
            Registrar Pago
          </Button>
        );
      },
    },
  ];

  function createData(
    id: number,
    nombre: string,
    costo: number,
    diaCobro: number,
    statusPago: boolean
  ) {
    return { id, nombre, costo, diaCobro, statusPago };
  }

  const rows = [
    createData(1, "Bruno Gael Barajas Sanches", 800, 1, true),
    createData(2, "Eder Rodriguez Rodriguez", 1100, 1, false),
    createData(3, "Bastian Kaleb Gaitan Ayala", 800, 4, true),
  ];

  useEffect(() => {
    listaDePagos();
  }, []);
  //getAllPagos()

  const listaDePagos = async () => {
    // setLoading(true);
    getAllPagos()
      .then((listaPagos) => {
        console.log(listaPagos);
        if (listaPagos.status === 200) {
          //setRowsAlumnos(listAlumnos.data);
          return;
        }
        //setRowsAlumnos([]);
      })
      .catch((error) => {
        console.log("error", error);
        //setRowsAlumnos([]);
      })
      .finally(() => {
        //setLoading(false);
      });
  };

  return {
    rows,
    columns,
    open,
    handleClose,
    alumno,
  };
};
