// hooks/useNuevoAlumno.ts
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useNuevoAlumno = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .required('El nombre completo es obligatorio'),
        fechaNacimiento: Yup.date()
            .required('La fecha de nacimiento es obligatoria')
            .max(new Date(), 'No puede ser una fecha futura'),
        nivel: Yup.string()
            .required('Debes seleccionar un nivel de robótica'),
        emailTutor: Yup.string()
            .email('Introduce un correo válido')
            .required('El correo del tutor es obligatorio'),
        telefono: Yup.string()
            .matches(/^[0-9]{10}$/, 'Introduce un teléfono a 10 dígitos')
            .required('El teléfono es obligatorio'),
        alergias: Yup.string()
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            fechaNacimiento: '',
            nivel: 'Basic',
            emailTutor: '',
            telefono: '',
            alergias: ''
        },
        validationSchema,
        onSubmit: (values) => {
            toast.success('¡Inscripción Exitosa!', {
                description: `${values.nombre} ha sido ensamblado correctamente en el sistema.`,
                duration: 4000,
            });

            setTimeout(() => {
                navigate('/dashboard/alumnos');
            }, 1000);
        }
    });

    return {
        formik,
        navigate,
        isValid: formik.isValid && formik.dirty
    };
};