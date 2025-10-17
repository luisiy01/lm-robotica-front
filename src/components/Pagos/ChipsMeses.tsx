import { Chip, Grid } from "@mui/material";

interface myProps {
  setMesSeleccionado: (mes: number) => void;
  isChipSelected: (chipNumber: number) => boolean;
}

export const ChipsMeses = ({ setMesSeleccionado, isChipSelected }: myProps) => {
  return (
    <>
      <Grid size={2}>
        <Chip
          label="Enero 2025"
          onClick={() => setMesSeleccionado(1)}
          variant={isChipSelected(1) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Febrero 2025"
          clickable
          onClick={() => setMesSeleccionado(2)}
          variant={isChipSelected(2) ? "filled" : "outlined"}
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Marzo 2025"
          clickable
          onClick={() => setMesSeleccionado(3)}
          variant={isChipSelected(3) ? "filled" : "outlined"}
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Abril 2025"
          onClick={() => setMesSeleccionado(4)}
          variant={isChipSelected(4) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Mayo 2025"
          onClick={() => setMesSeleccionado(5)}
          variant={isChipSelected(5) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Junio 2025"
          onClick={() => setMesSeleccionado(6)}
          variant={isChipSelected(6) ? "filled" : "outlined"}
          clickable
        />
      </Grid>

      <Grid size={2}>
        <Chip
          label="Julio 2025"
          onClick={() => setMesSeleccionado(7)}
          variant={isChipSelected(7) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Agosto 2025"
          onClick={() => setMesSeleccionado(8)}
          variant={isChipSelected(8) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Septiembre 2025"
          onClick={() => setMesSeleccionado(9)}
          variant={isChipSelected(9) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Octubre 2025"
          onClick={() => setMesSeleccionado(10)}
          variant={isChipSelected(10) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Noviembre 2025"
          onClick={() => setMesSeleccionado(11)}
          variant={isChipSelected(11) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Diciembre 2025"
          onClick={() => setMesSeleccionado(12)}
          variant={isChipSelected(12) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
    </>
  );
};
