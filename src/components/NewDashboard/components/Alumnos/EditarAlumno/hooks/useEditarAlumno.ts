import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

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
            toast.success('¡Ingeniero actualizado!', {
                description: `Los cambios de ${values.nombre} se guardaron correctamente.`,
            });

            setTimeout(() => {
                navigate('/dashboard/alumnos');
            }, 1000);
        }
    });

    const confirmDelete = () => {
        toast.error('¿Eliminar alumno?', {
            description: 'Esta acción dará de baja al ingeniero permanentemente.',
            action: {
                label: 'Eliminar',
                onClick: () => {
                    // Aquí iría tu lógica de borrado real
                    toast.success('Alumno eliminado del sistema');
                    navigate('/dashboard/alumnos');
                },
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => console.log('Eliminación cancelada')
            },
            duration: 10000, // Dar tiempo para decidir
        });
    };

    return {
        formik,
        navigate,
        isValid: formik.isValid && formik.dirty,
        isSubmitting: formik.isSubmitting,
        confirmDelete
    };
};