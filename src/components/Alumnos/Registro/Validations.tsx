import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("El nombre del alumno es requerido"),
  diaCobro: yup.number().min(1).max(31).required("El cobro es requerido"),
  costoMensual: yup.number().min(0).required("El costo mensual es requerido"),
  contacto: yup.number().required("El numero de contacto es requerido"),
  dia1: yup.string().required("El dia es requerido"),
  hora1: yup.string().required("La hora es requerida"),
  dia2: yup.string().required("El dia es requerido"),
  hora2: yup.string().required("La hora es requerida"),
});
