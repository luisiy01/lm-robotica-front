import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useAlumnosQueries } from "../../hooks/queries/useAlumnosQueries";
import { toast } from "sonner";

export const useNuevoAlumno = () => {
  const navigate = useNavigate();
  const { createAlumno, isCreating } = useAlumnosQueries();

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .required("El nombre completo es obligatorio"),
    fechaNacimiento: Yup.date()
      .required("La fecha de nacimiento es obligatoria")
      .max(new Date(), "No puede ser una fecha futura"),
    // Cambiado de email a nombre (string)
    nombreTutor: Yup.string()
      .min(3, "El nombre del tutor es muy corto")
      .required("El nombre del tutor es obligatorio"),
    telefono: Yup.string()
      .matches(/^[0-9]{10}$/, "Introduce un teléfono a 10 dígitos")
      .required("El teléfono es obligatorio"),
    alergias: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      fechaNacimiento: "",
      nombreTutor: "",
      telefono: "",
      alergias: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createAlumno(values, {
        onSuccess: (data) => {
          if (data) {
            toast.success("Alumno registrado con éxito", {
              description: "El alumno ha sido agregado al sistema.",
            });
            setTimeout(() => navigate("/dashboard/alumnos"), 1000);
          } else {
            toast.error("Error al registrar alumno", {
              description: "El alumno no ha sido agregado al sistema.",
            });
          }
        },
        onError: (error: any) => {
          const mensaje = error.response?.data?.message || "Error al conectar";
          toast.error("Fallo de autenticación", {
            description: mensaje,
          });
        },
      });
    },
  });

  return {
    formik,
    navigate,
    isValid: formik.isValid && formik.dirty,
    isSubmitting: formik.isSubmitting,
    isLoading: isCreating,
  };
};
