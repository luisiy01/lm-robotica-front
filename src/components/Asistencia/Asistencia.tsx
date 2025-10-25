import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { useAsistencia } from "./hooks/useAsistencia";
import { ChipsMeses } from "../Pagos/ChipsMeses";

export const Asistencia = () => {
  const {
    isChipSelected,
    setMesSeleccionado,
    nextYear,
    backYear,
    yearSeleccionado,
    rows,
    paginationModel,
    columns,
  } = useAsistencia();

  return (
    <Grid container spacing={2}>
      <ChipsMeses
        {...{
          isChipSelected,
          setMesSeleccionado,
          nextYear,
          backYear,
          yearSeleccionado,
        }}
      />

      <Grid size={12}>
        <DataGrid
          rowHeight={120}
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
        />
      </Grid>
    </Grid>
  );
};
