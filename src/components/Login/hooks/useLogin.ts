import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

export const useLogin = () => {
    const navigate = useNavigate();

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Introduce un correo electrónico válido')
            .required('El correo es obligatorio'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('La contraseña es obligatoria'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Iniciando sesión para:', values.email);
            // Simulación de login exitoso
            navigate('/dashboard');
        },
    });

    // Retornamos solo lo que el componente necesita
    return {
        formik,
        isValid: formik.isValid && formik.dirty,
        isSubmitting: formik.isSubmitting
    };
};