import * as yup from "yup";

export const validationSchema = yup.object({
  nombre: yup.string().required("El nombre del alumno es requerido"),
  diaCobro: yup.number().required("El cobro es requerido"),
  costo: yup.number().required("El costo mensual es requerido"),
  contacto: yup.number().required("El numero de contacto es requerido"),
  dia1: yup.string().required("El dia es requerido"),
  hora1: yup.string().required("La hora es requerida"),
  dia2: yup.string().required("El dia es requerido"),
  hora2: yup.string().required("La hora es requerida"),
});
