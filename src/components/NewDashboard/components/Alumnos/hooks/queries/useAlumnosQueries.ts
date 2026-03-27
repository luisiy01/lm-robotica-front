// src/hooks/queries/useAlumnos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as AlumnoService from '../../../../../../services/alumno.service';
import { toast } from 'sonner';

export const useAlumnosQueries = () => {
    const queryClient = useQueryClient();

    // 1. Query para obtener todos los alumnos
    const alumnosQuery = useQuery({
        queryKey: ['alumnos'],
        queryFn: AlumnoService.getAlumnos,
    });

    // 2. Mutación para Crear
    const createMutation = useMutation({
        mutationFn: AlumnoService.addAlumno,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alumnos'] });
            toast.success('Alumno registrado con éxito');
        },
        onError: () => toast.error('Error al registrar alumno'),
    });

    // 3. Mutación para Eliminar
    const deleteMutation = useMutation({
        mutationFn: AlumnoService.deleteAlumno,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alumnos'] });
            toast.success('Alumno eliminado del sistema');
        },
        onError: () => toast.error('No se pudo eliminar al alumno'),
    });

    return {
        alumnosQuery,
        createAlumno: createMutation.mutate,
        isCreating: createMutation.isPending,
        deleteAlumno: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending
    };
};