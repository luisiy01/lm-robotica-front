import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthMutation } from './useAuthMutation';

export const useLogin = () => {
    const { mutate, isPending } = useAuthMutation();

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Introduce un correo electrónico válido')
            .required('El correo es obligatorio'),
        password: Yup.string()
            .min(5, 'La contraseña debe tener al menos 5 caracteres')
            .required('La contraseña es obligatoria'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {

            mutate(values);


        },
    });

    // Retornamos solo lo que el componente necesita
    return {
        formik,
        isValid: formik.isValid && formik.dirty,
        isSubmitting: formik.isSubmitting,
        isLoading: isPending
    };
};