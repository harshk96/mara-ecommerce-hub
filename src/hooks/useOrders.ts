
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import { toast } from 'sonner';

export function useOrders() {
  const queryClient = useQueryClient();
  
  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getAll
  });
  
  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      ordersApi.update(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated successfully');
    }
  });
  
  const deleteOrderMutation = useMutation({
    mutationFn: ordersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order deleted successfully');
    }
  });
  
  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    deleteOrder: deleteOrderMutation.mutate
  };
}
