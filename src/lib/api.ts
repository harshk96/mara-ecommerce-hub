
// API service for handling backend requests
import { toast } from "sonner";

const API_URL = "https://mock-api.lovable.dev/v1"; // This would be your real API URL in production

// Helper function for API requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const user = localStorage.getItem('mara_user');
  const token = user ? JSON.parse(user).id : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    toast.error(errorMessage);
    throw error;
  }
}

// Products API
export const productsApi = {
  getAll: () => fetchWithAuth('/products'),
  getById: (id: string) => fetchWithAuth(`/products/${id}`),
  create: (product: any) => fetchWithAuth('/products', {
    method: 'POST',
    body: JSON.stringify(product)
  }),
  update: (id: string, product: any) => fetchWithAuth(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product)
  }),
  delete: (id: string) => fetchWithAuth(`/products/${id}`, {
    method: 'DELETE'
  }),
  updateStock: (id: string, stock: number) => fetchWithAuth(`/products/${id}/stock`, {
    method: 'PATCH',
    body: JSON.stringify({ stock })
  })
};

// Orders API
export const ordersApi = {
  getAll: () => fetchWithAuth('/orders'),
  getById: (id: string) => fetchWithAuth(`/orders/${id}`),
  update: (id: string, status: string) => fetchWithAuth(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  delete: (id: string) => fetchWithAuth(`/orders/${id}`, {
    method: 'DELETE'
  })
};

// Users API
export const usersApi = {
  getAll: () => fetchWithAuth('/users'),
  getById: (id: string) => fetchWithAuth(`/users/${id}`),
  create: (user: any) => fetchWithAuth('/users', {
    method: 'POST',
    body: JSON.stringify(user)
  }),
  update: (id: string, user: any) => fetchWithAuth(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user)
  }),
  delete: (id: string) => fetchWithAuth(`/users/${id}`, {
    method: 'DELETE'
  }),
  toggleStatus: (id: string, status: string) => fetchWithAuth(`/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  })
};
