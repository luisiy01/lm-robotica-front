// pages/Pagos/hooks/useNuevoPago.ts
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAlumnosQueries } from "../../Alumnos/hooks/queries/useAlumnosQueries";
import { usePagosQueries } from "./usePagosQueries";

export const useNuevoPago = (onClose: () => void) => {
  const { alumnosQuery } = useAlumnosQueries();
  const { registrarPago, isRegistrando } = usePagosQueries();

  const formik = useFormik({
    initialValues: {
      alumno_id: "",
      monto: "",
      concepto: "Mensualidad",
      metodo_pago: "efectivo",
      estado: "completado",
      notas: "",
      duracion: "1",
    },
    validationSchema: Yup.object({
      alumno_id: Yup.string().required("Selecciona un alumno"),
      monto: Yup.number()
        .positive("Debe ser mayor a 0")
        .required("El monto es obligatorio"),
      concepto: Yup.string().required("El concepto es obligatorio"),
    }),
    onSubmit: (values) => {
      registrarPago(values, {
        onSuccess: () => {
          formik.resetForm();
          onClose();
        },
      });
    },
  });

  return {
    formik,
    alumnos: alumnosQuery.data || [],
    isLoadingAlumnos: alumnosQuery.isLoading,
    isRegistrando,
  };
};
