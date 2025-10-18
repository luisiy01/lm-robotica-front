import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import { usePagos } from "./hooks/usePagos";
import { ChipsMeses } from "./ChipsMeses";
import { CircularLoader } from "../common/CircularLoader";
import { RegistroPago } from "./RegistroPago";

const paginationModel = { page: 0, pageSize: 5 };

export const Pagos = () => {
  const {
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
  } = usePagos();

  return (
    <Grid container spacing={2}>
      <ChipsMeses
        {...{
          isChipSelected,
          setMesSeleccionado,
        }}
      />

      {loading && <CircularLoader />}
      <Grid size={12}>
        <DataGrid
          rows={rowsPagos}
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
      <Grid>
        <Button variant="contained">Reporte de Pagos</Button>
      </Grid>

      <RegistroPago
        {...{
          open,
          handleClose,
          alumno,
          listaDePagos,
          mesSeleccionado,
          yearSeleccionado,
        }}
      />
    </Grid>
  );
};
