import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthMutation } from "./useAuthMutation";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const { mutate, isPending } = useAuthMutation();
  const navigate = useNavigate();

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Introduce un correo electrónico válido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(5, "La contraseña debe tener al menos 5 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const isLogged = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!token && !!user;
  };

  useEffect(() => {
    if (isLogged()) {
      navigate("/dashboard");
    }
  }, []);

  // Retornamos solo lo que el componente necesita
  return {
    formik,
    isValid: formik.isValid && formik.dirty,
    isSubmitting: formik.isSubmitting,
    isLoading: isPending,
  };
};
