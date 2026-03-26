import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

interface EditarAlumnoFormValues {
    nombre: string;
    fechaNacimiento: string;
    nivel: string;
    emailTutor: string;
    telefono: string;
    alergias: string;
}

export const useEditarAlumno = (alumnoInicial: any) => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .required('El nombre es obligatorio'),
        fechaNacimiento: Yup.date()
            .required('La fecha de nacimiento es obligatoria')
            .max(new Date(), 'No puede ser una fecha futura'),
        nivel: Yup.string()
            .required('El nivel de robótica es obligatorio'),
        emailTutor: Yup.string()
            .email('Introduce un correo válido')
            .required('El correo es obligatorio'),
        telefono: Yup.string()
            .matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos')
            .required('El teléfono es obligatorio'),
        alergias: Yup.string()
    });

    const formik = useFormik<EditarAlumnoFormValues>({
        initialValues: {
            nombre: alumnoInicial.nombre || '',
            fechaNacimiento: alumnoInicial.fechaNacimiento || '',
            nivel: alumnoInicial.nivel || 'Basic',
            emailTutor: alumnoInicial.emailTutor || '',
            telefono: alumnoInicial.telefono || '',
            alergias: alumnoInicial.alergias || ''
        },
        enableReinitialize: true, // Permite que el formulario se actualice si los datos externos cambian
        validationSchema,
        onSubmit: (values) => {
            console.log("Actualizando datos del alumno:", values);
            alert("¡Ingeniero actualizado correctamente!");
            navigate('/dashboard/alumnos');
        }
    });

    return {
        formik,
        navigate,
        isValid: formik.isValid && formik.dirty,
        isSubmitting: formik.isSubmitting
    };
};