import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import { Registro } from "./Registro/Registro";
import { useStore } from "../../store/useStore";

function createData(id: number, nombre: string, accion: boolean) {
  return { id, nombre, accion };
}

const rows = [
  createData(1, "Bruno Gael Barajas Sanches", true),
  createData(2, "Eder Rodriguez Rodriguez", false),
  createData(3, "Bastian Kaleb Gaitan Ayala", true),
];

const paginationModel = { page: 0, pageSize: 5 };

export const Alumnos = () => {
  const { alumno, selectAlumno, newAlumno } = useStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 250 },
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

  return (
    <>
      {!alumno ? (
        <Grid container spacing={2}>
          <Grid>
            <Button
              variant="contained"
              style={{ backgroundColor: "green" }}
              onClick={() => newAlumno()}
            >
              Agregar
            </Button>
          </Grid>
          <Grid size={12}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel },
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              disableRowSelectionOnClick
            />
          </Grid>
        </Grid>
      ) : (
        <Registro />
      )}
    </>
  );
};
