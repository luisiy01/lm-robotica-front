// hooks/useEditarAlumno.ts
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAlumnoById, updateAlumno } from '../../../../../../services/alumno.service';

interface EditarAlumnoFormValues {
    nombre: string;
    fechaNacimiento: string;
    nombreTutor: string; // Cambiado de emailTutor
    telefono: string;
    alergias: string;
}

export const useEditarAlumno = (id: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: alumno, isLoading: isLoadingData } = useQuery({
        queryKey: ['alumno', id],
        queryFn: () => getAlumnoById(id),
        enabled: !!id, // Solo se ejecuta si hay un ID
    });

    const { mutate: editMutate, isPending: isUpdating } = useMutation({
        mutationFn: (values: any) => updateAlumno(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alumnos'] });
            queryClient.invalidateQueries({ queryKey: ['alumno', id] });
            toast.success('Cambios guardados correctamente');
            navigate('/dashboard/alumnos');
        },
        onError: () => toast.error('Error al actualizar el perfil')
    });

    const validationSchema = Yup.object({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .required('El nombre es obligatorio'),
        fechaNacimiento: Yup.date()
            .required('La fecha de nacimiento es obligatoria')
            .max(new Date(), 'No puede ser una fecha futura'),
        nombreTutor: Yup.string()
            .min(3, 'El nombre del tutor es muy corto')
            .required('El nombre del tutor es obligatorio'),
        telefono: Yup.string()
            .matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos')
            .required('El teléfono es obligatorio'),
        alergias: Yup.string()
    });

    const formik = useFormik<EditarAlumnoFormValues>({
        initialValues: {
            nombre: alumno?.nombre || '',
            fechaNacimiento: alumno?.fechaNacimiento || '',
            nombreTutor: alumno?.nombreTutor || '',
            telefono: alumno?.telefono || '',
            alergias: alumno?.alergias || ''
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            editMutate(values);
        }
    });

    const confirmDelete = () => {
        toast.error('¿Eliminar alumno?', {
            description: 'Esta acción dará de baja al ingeniero permanentemente.',
            action: {
                label: 'Eliminar',
                onClick: () => {
                    toast.success('Alumno eliminado del sistema');
                    navigate('/dashboard/alumnos');
                },
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => console.log('Eliminación cancelada')
            },
            duration: 10000,
        });
    };

    return {
        formik,
        navigate,
        isValid: formik.isValid && formik.dirty,
        isSubmitting: formik.isSubmitting,
        confirmDelete,
        isLoadingData,
        isUpdating,
    };
};