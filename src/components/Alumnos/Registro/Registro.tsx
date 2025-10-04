import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  type SelectChangeEvent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStore } from "../../../store/useStore";

const dias: string[] = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const horas: string[] = ["15:00 - 17:00", "17:00 - 19:00", "19:00 - 21:00"];

const marginGridItem = {
  marginBottom: 8,
};

export const Registro = () => {
  const { alumno, disSelectAlumno } = useStore();

  const [dia1, setDia1] = useState("");
  const [dia2, setDia2] = useState("");
  const [hora1, setHora1] = useState("");
  const [hora2, setHora2] = useState("");

  const handleDia1Change = (event: SelectChangeEvent) => {
    setDia1(event.target.value as string);
  };

  const handleDia2Change = (event: SelectChangeEvent) => {
    setDia2(event.target.value as string);
  };

  const handleHora1Change = (event: SelectChangeEvent) => {
    setHora1(event.target.value as string);
  };

  const handleHora2Change = (event: SelectChangeEvent) => {
    setHora2(event.target.value as string);
  };

  return (
    <Grid container spacing={2}>
      <Grid>
        <IconButton onClick={() => disSelectAlumno()}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid size={12} style={marginGridItem}>
        <TextField
          fullWidth
          id="nombre"
          label="Nombre completo del alumno"
          variant="outlined"
          value={alumno?.nombre}
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="h6" component="h6">
          Horario 1
        </Typography>
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth>
          <InputLabel id="dia1-label">Dia</InputLabel>
          <Select
            labelId="dia1-label"
            id="dia1"
            value={dia1}
            label="Age"
            onChange={handleDia1Change}
          >
            {dias.map((dia) => (
              <MenuItem value={dia}>{dia}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth>
          <InputLabel id="hora1-label">Hora</InputLabel>
          <Select
            labelId="hora1-label"
            id="hora1"
            value={hora1}
            label="Age"
            onChange={handleHora1Change}
          >
            {horas.map((hora) => (
              <MenuItem value={hora}>{hora}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={12}>
        <Typography variant="h6" component="h6">
          Horario 2
        </Typography>
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth>
          <InputLabel id="dia2-label">Dia</InputLabel>
          <Select
            labelId="dia2-label"
            id="dia2"
            value={dia2}
            label="Age"
            onChange={handleDia2Change}
          >
            {dias.map((dia) => (
              <MenuItem value={dia}>{dia}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth>
          <InputLabel id="hora2-label">Hora</InputLabel>
          <Select
            labelId="hora2-label"
            id="hora2"
            value={hora2}
            label="Age"
            onChange={handleHora2Change}
          >
            {horas.map((hora) => (
              <MenuItem value={hora}>{hora}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <TextField
          fullWidth
          id="diaCobro"
          type="number"
          label="Dia de cobro"
          variant="outlined"
          helperText="(1-31)"
        />
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <TextField
          fullWidth
          id="costo"
          type="number"
          label="Costo Mensual"
          variant="outlined"
        />
      </Grid>

      <Grid size={12} style={marginGridItem}>
        <TextField
          fullWidth
          type="number"
          id="contacto"
          label="# Contacto"
          variant="outlined"
        />
      </Grid>

      {!alumno?.id ? (
        <Grid size={2}>
          <Button style={{ backgroundColor: "green" }} variant="contained">
            Agregar
          </Button>
        </Grid>
      ) : (
        <>
          <Grid size={2}>
            <Button variant="contained">Modificar</Button>
          </Grid>

          <Grid size={2}>
            <Button style={{ backgroundColor: "red" }} variant="contained">
              Eliminar
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
