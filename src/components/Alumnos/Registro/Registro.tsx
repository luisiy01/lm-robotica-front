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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStore } from "../../../store/useStore";
import { useFormik } from "formik";
import { diasHabiles, horasHbiles } from "../../../lib/Constants";
import { validationSchema } from "./Validations";
import { useRegistro } from "./hooks/useRegistro";
import { ToastContainer, toast } from "react-toastify";

const marginGridItem = {
  marginBottom: 8,
};

export const Registro = () => {
  const { alumno, disSelectAlumno } = useStore();
  const { agregarAlumno } = useRegistro(toast);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: alumno?.name || "",
        diaCobro: "",
        costoMensual: "",
        contacto: "",
        dia1: "",
        hora1: "",
        dia2: "",
        hora2: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        if (!alumno?._id) {
          agregarAlumno(values);
        }
      },
    });

  return (
    <>
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
              id="name"
              label="Nombre completo del alumno"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
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
                {diasHabiles.map((dia) => (
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
                {horasHbiles.map((hora) => (
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
                {diasHabiles.map((dia) => (
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
                {horasHbiles.map((hora) => (
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
              id="costoMensual"
              type="number"
              label="Costo Mensual"
              variant="outlined"
              value={values.costoMensual}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.costoMensual && Boolean(errors.costoMensual)}
              helperText={touched.costoMensual && errors.costoMensual}
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

          {!alumno?._id ? (
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
      <ToastContainer />
    </>
  );
};
