import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";

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

const paginationModel = { page: 0, pageSize: 5 };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Pagos = () => {
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

  const [open, setOpen] = useState(false);
  type Alumno = {
    id: number;
    nombre: string;
    costo: number;
    diaCobro: number;
    statusPago: boolean;
  };

  const [alumno, setAlumno] = useState<Alumno | null>(null);

  const handleOpen = (rowSelected: any) => {
    setAlumno(rowSelected);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Grid>
      <Grid>
        <Button variant="contained">Reporte de Pagos</Button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Registrar pago para ${alumno ? alumno?.nombre : ""}`}
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginBottom: 8 }}
            sx={{ mt: 2 }}
          >
            {`Fecha: ${new Date().toLocaleString("es-MX", {
              month: "long",
            })} ${new Date().getFullYear()}`}
          </Typography>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            1 Mes - $1,100
          </Button>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            3 Mes - $2,400
          </Button>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            6 Mes - $4,000
          </Button>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            Monto Personalizado ($1000.00)
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};
