// hooks/queries/usePagosQueries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
//import api from '../../services/api';
import { toast } from 'sonner';

export const usePagosQueries = () => {
    const queryClient = useQueryClient();

    const pagosQuery = useQuery({
        queryKey: ['pagos'],
        queryFn: async () => {
            /* const { data } = await api.get('/pagos');
            return data; */
            return [] as any[];
        }
    });

    /*  const registrarPago = useMutation({
         mutationFn: (nuevoPago: any) => api.post('/pagos', nuevoPago),
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ['pagos'] });
             toast.success('Pago registrado correctamente');
         }
     }); */

    return {
        pagosQuery,
        //registrarPago 
    };
};