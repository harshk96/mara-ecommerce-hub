
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/lib/api';
import { toast } from 'sonner';

export function useProducts() {
  const queryClient = useQueryClient();
  
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll
  });
  
  const createProductMutation = useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    }
  });
  
  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: any }) => 
      productsApi.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    }
  });
  
  const deleteProductMutation = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    }
  });
  
  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate
  };
}
