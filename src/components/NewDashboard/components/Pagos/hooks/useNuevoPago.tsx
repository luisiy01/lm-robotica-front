import { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAlumnosQueries } from "../../Alumnos/hooks/queries/useAlumnosQueries";
import { usePagosQueries } from "./usePagosQueries";

export const useNuevoPago = (onClose: () => void) => {
  const { alumnosQuery } = useAlumnosQueries();
  const { registrarPago, isRegistrando } = usePagosQueries();

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const alumnos = alumnosQuery.data || [];

  // Filtrado reactivo de alumnos
  const filteredAlumnos = useMemo(() => {
    return alumnos.filter((a: any) =>
      a.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [alumnos, searchTerm]);

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
          setSearchTerm("");
          onClose();
        },
      });
    },
  });

  return {
    formik,
    alumnos: filteredAlumnos,
    searchTerm,
    setSearchTerm,
    isLoadingAlumnos: alumnosQuery.isLoading,
    isRegistrando,
  };
};
