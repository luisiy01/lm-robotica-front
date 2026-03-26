// hooks/useNuevoAlumno.ts
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

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
            console.log("Enviando datos del nuevo alumno:", values);
            alert("¡Alumno inscrito con éxito!");
            navigate('/dashboard/alumnos');
        }
    });

    return {
        formik,
        navigate,
        isValid: formik.isValid && formik.dirty
    };
};