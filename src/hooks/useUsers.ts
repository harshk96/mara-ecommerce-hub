
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/lib/api';
import { toast } from 'sonner';

export function useUsers() {
  const queryClient = useQueryClient();
  
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAll
  });
  
  const createUserMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    }
  });
  
  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: { id: string; user: any }) => 
      usersApi.update(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    }
  });
  
  const toggleUserStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      usersApi.toggleStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User status updated successfully');
    }
  });
  
  const deleteUserMutation = useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    }
  });
  
  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    toggleUserStatus: toggleUserStatusMutation.mutate,
    deleteUser: deleteUserMutation.mutate
  };
}
