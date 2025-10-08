import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Button, CircularProgress, Grid } from "@mui/material";
import { Registro } from "./Registro/Registro";
import { useStore } from "../../store/useStore";
import { useAlumnos } from "./hooks/useAlumnos";

const paginationModel = { page: 0, pageSize: 5 };

export const Alumnos = () => {
  const { alumno, selectAlumno, newAlumno } = useStore();
  const { rowsAlumnos, loading } = useAlumnos();

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

  const drawAlumnos = () => {
    if (!alumno) {
      return (
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
              rows={rowsAlumnos}
              getRowId={(row) => row._id}
              columns={columns}
              initialState={{
                pagination: { paginationModel },
                columns: {
                  columnVisibilityModel: {
                    _id: false,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              disableRowSelectionOnClick
            />
          </Grid>
        </Grid>
      );
    } else {
      return <Registro />;
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        drawAlumnos()
      )}
    </>
  );
};
