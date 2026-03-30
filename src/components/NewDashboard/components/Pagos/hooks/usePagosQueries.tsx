import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as PagoService from '../../../../../services/pagos.service';
import { toast } from 'sonner';

export const usePagosQueries = () => {
    const queryClient = useQueryClient();

    // Query para obtener la lista de pagos
    const pagosQuery = useQuery({
        queryKey: ['pagos'],
        queryFn: PagoService.getPagos,
    });

    // Mutación para registrar pago
    const registrarPagoMutation = useMutation({
        mutationFn: PagoService.addPago,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pagos'] });
            toast.success('Pago registrado exitosamente');
        },
        onError: () => {
            toast.error('Hubo un error al procesar el pago');
        }
    });

    return {
        pagosQuery,
        registrarPago: registrarPagoMutation.mutate,
        isRegistrando: registrarPagoMutation.isPending
    };
};