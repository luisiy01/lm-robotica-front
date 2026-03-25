import { Chip, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface myProps {
  setMesSeleccionado: (mes: number) => void;
  isChipSelected: (chipNumber: number) => boolean;
  nextYear: () => void;
  backYear: () => void;
  yearSeleccionado: number;
}

export const ChipsMeses = ({
  setMesSeleccionado,
  isChipSelected,
  nextYear,
  backYear,
  yearSeleccionado,
}: myProps) => {
  return (
    <>
      <Grid size={1}>
        <IconButton onClick={backYear}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid size={10} />
      <Grid size={1}>
        <IconButton onClick={nextYear}>
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Enero ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(1)}
          variant={isChipSelected(1) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Febrero ${yearSeleccionado}`}
          clickable
          onClick={() => setMesSeleccionado(2)}
          variant={isChipSelected(2) ? "filled" : "outlined"}
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Marzo ${yearSeleccionado}`}
          clickable
          onClick={() => setMesSeleccionado(3)}
          variant={isChipSelected(3) ? "filled" : "outlined"}
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Abril ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(4)}
          variant={isChipSelected(4) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Mayo ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(5)}
          variant={isChipSelected(5) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Junio ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(6)}
          variant={isChipSelected(6) ? "filled" : "outlined"}
          clickable
        />
      </Grid>

      <Grid size={2}>
        <Chip
          label={`Julio ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(7)}
          variant={isChipSelected(7) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Agosto ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(8)}
          variant={isChipSelected(8) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Septiembre ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(9)}
          variant={isChipSelected(9) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Octubre ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(10)}
          variant={isChipSelected(10) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Noviembre ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(11)}
          variant={isChipSelected(11) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label={`Diciembre ${yearSeleccionado}`}
          onClick={() => setMesSeleccionado(12)}
          variant={isChipSelected(12) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
    </>
  );
};
