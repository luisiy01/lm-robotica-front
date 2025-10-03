import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";

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
        <Button style={{ backgroundColor: "#ffcc00" }} variant="contained">
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

const paginationModel = { page: 0, pageSize: 5 };

export const Pagos = () => {
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
    </Grid>
  );
};
