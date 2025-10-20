import { Button } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllPagos } from "../../../services/pagos.service";

const columnasReporte = [
  {
    id: "nombreAlumno",
    displayName: "Nombre",
  },
  {
    id: "fechaPago",
    displayName: "Fecha Pago",
  },
  {
    id: "monto",
    displayName: "Monto",
  },
];

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
  const [mesSeleccionado, setMesSeleccionado] = useState(
    new Date().getMonth() + 1
  );
  const [yearSeleccionado, setYearSeleccionado] = useState(
    new Date().getFullYear()
  );
  const [rowsPagos, setRowsPagos] = useState<any[]>([]);
  const [csvRows, setCsvRows] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listaDePagos();
  }, [mesSeleccionado, yearSeleccionado]);

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
      sortable: false,
      filterable: false,
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

  const listaDePagos = async () => {
    setLoading(true);
    getAllPagos({
      periodo: `${mesSeleccionado}-${yearSeleccionado}`,
    })
      .then((listaPagos) => {
        if (listaPagos.status === 200) {
          console.log(listaPagos.data);
          const newData: any[] = [];
          listaPagos.data.forEach((data: any) => {
            newData.push({
              id: data.pago._id,
              nombre: data.alumno.name,
              costo: data.alumno.costoMensual,
              diaCobro: data.alumno.diaCobro,
              statusPago: data.pago.pagado,
              responseData: data,
            });
          });
          setRowsPagos(newData);
          let totalPagos = 0;
          const csvData = listaPagos.data.map((data: any) => {
            if (data.pago?.totalPagado) {
              totalPagos = totalPagos + data.pago?.totalPagado;
            }
            return {
              nombreAlumno: data.alumno.name,
              fechaPago: data.pago?.fechaDePago
                ? new Date(data.pago?.fechaDePago).toDateString()
                : "PENDIENTE",
              monto: data.pago?.totalPagado ? `$${data.pago?.totalPagado}` : "",
            };
          });
          csvData.push({
            nombreAlumno: "Total",
            fechaPago: "",
            monto: totalPagos,
          });
          setCsvRows(csvData);
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
        setRowsPagos([]);
        setCsvRows([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isChipSelected = (mes: number) => {
    return mesSeleccionado === mes ? true : false;
  };

  const nextYear = () => {
    setYearSeleccionado(yearSeleccionado + 1);
  };

  const backYear = () => {
    setYearSeleccionado(yearSeleccionado - 1);
  };

  const getReporte = () => {
    return csvRows;
  };

  return {
    rowsPagos,
    columns,
    open,
    handleClose,
    alumno,
    isChipSelected,
    setMesSeleccionado,
    loading,
    listaDePagos,
    mesSeleccionado,
    yearSeleccionado,
    nextYear,
    backYear,
    getReporte,
    columnasReporte,
  };
};
