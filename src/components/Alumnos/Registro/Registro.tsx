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
import { useFormik } from "formik";
import * as yup from "yup";

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

const validationSchema = yup.object({
  nombre: yup.string().required("El nombre del alumno es requerido"),
  diaCobro: yup.number().required("El cobro es requerido"),
  costo: yup.number().required("El costo mensual es requerido"),
  contacto: yup.number().required("El numero de contacto es requerido"),
  dia1: yup.string().required("El dia es requerido"),
  hora1: yup.string().required("La hora es requerida"),
  dia2: yup.string().required("El dia es requerido"),
  hora2: yup.string().required("La hora es requerida"),
});

export const Registro = () => {
  const { alumno, disSelectAlumno } = useStore();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        nombre: "",
        diaCobro: "",
        costo: "",
        contacto: "",
        dia1: "",
        hora1: "",
        dia2: "",
        hora2: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <form onSubmit={handleSubmit}>
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
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nombre && Boolean(errors.nombre)}
            helperText={touched.nombre && errors.nombre}
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
              name="dia1"
              label="Dia"
              value={values.dia1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dia1 && Boolean(errors.dia1)}
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
              name="hora1"
              label="Hora"
              value={values.hora1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hora1 && Boolean(errors.hora1)}
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
              name="dia2"
              label="Dia"
              value={values.dia2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dia2 && Boolean(errors.dia2)}
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
              name="hora2"
              label="Hora"
              value={values.hora2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hora2 && Boolean(errors.hora2)}
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
            helperText="Dia entre (1-31)"
            value={values.diaCobro}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.diaCobro && Boolean(errors.diaCobro)}
          />
        </Grid>

        <Grid size={6} style={marginGridItem}>
          <TextField
            fullWidth
            id="costo"
            type="number"
            label="Costo Mensual"
            variant="outlined"
            value={values.costo}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.costo && Boolean(errors.costo)}
            helperText={touched.costo && errors.costo}
          />
        </Grid>

        <Grid size={12} style={marginGridItem}>
          <TextField
            fullWidth
            type="number"
            id="contacto"
            label="# Contacto"
            variant="outlined"
            value={values.contacto}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.contacto && Boolean(errors.contacto)}
            helperText={touched.contacto && errors.contacto}
          />
        </Grid>

        {!alumno?.id ? (
          <Grid size={2}>
            <Button
              style={{ backgroundColor: "green" }}
              variant="contained"
              type="submit"
            >
              Agregar
            </Button>
          </Grid>
        ) : (
          <>
            <Grid size={2}>
              <Button variant="contained" type="submit">
                Modificar
              </Button>
            </Grid>

            <Grid size={2}>
              <Button
                style={{ backgroundColor: "red" }}
                variant="contained"
                type="button"
              >
                Eliminar
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};
