
import { mockServer } from './mockServer';

// This module intercepts fetch calls and returns mock data
// In a real app, you'd use a library like MSW (Mock Service Worker)

const originalFetch = window.fetch;

window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
  const url = typeof input === 'string' 
    ? input 
    : input instanceof Request 
      ? input.url 
      : input.toString();
  
  const method = init?.method || 'GET';
  
  // Only intercept calls to our API
  if (url.includes('mock-api.lovable.dev')) {
    return handleMockRequest(url, method, init);
  }
  
  // Pass through all other requests
  return originalFetch(input, init);
};

async function handleMockRequest(url: string, method: string, init?: RequestInit): Promise<Response> {
  // Extract the path from the URL
  const path = url.replace(/^.*\/v1/, '');
  
  // Add artificial delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Handle different API endpoints
  if (path.match(/^\/products\/?$/)) {
    if (method === 'GET') {
      return mockResponse(200, mockServer.getProducts());
    } else if (method === 'POST' && init?.body) {
      const newProduct = JSON.parse(init.body as string);
      return mockResponse(201, mockServer.createProduct(newProduct));
    }
  }
  
  if (path.match(/^\/products\/([^/]+)$/)) {
    const id = path.split('/')[2];
    if (method === 'GET') {
      const product = mockServer.getProductById(id);
      return product 
        ? mockResponse(200, product)
        : mockResponse(404, { message: 'Product not found' });
    } else if (method === 'PUT' && init?.body) {
      const updates = JSON.parse(init.body as string);
      const updated = mockServer.updateProduct(id, updates);
      return updated
        ? mockResponse(200, updated)
        : mockResponse(404, { message: 'Product not found' });
    } else if (method === 'DELETE') {
      const deleted = mockServer.deleteProduct(id);
      return deleted
        ? mockResponse(200, { message: 'Product deleted' })
        : mockResponse(404, { message: 'Product not found' });
    }
  }
  
  if (path.match(/^\/orders\/?$/)) {
    if (method === 'GET') {
      return mockResponse(200, mockServer.getOrders());
    }
  }
  
  if (path.match(/^\/orders\/([^/]+)$/)) {
    const id = path.split('/')[2];
    if (method === 'GET') {
      const order = mockServer.getOrderById(id);
      return order
        ? mockResponse(200, order)
        : mockResponse(404, { message: 'Order not found' });
    } else if (method === 'PATCH' && init?.body) {
      const { status } = JSON.parse(init.body as string);
      const updated = mockServer.updateOrderStatus(id, status);
      return updated
        ? mockResponse(200, updated)
        : mockResponse(404, { message: 'Order not found' });
    } else if (method === 'DELETE') {
      const deleted = mockServer.deleteOrder(id);
      return deleted
        ? mockResponse(200, { message: 'Order deleted' })
        : mockResponse(404, { message: 'Order not found' });
    }
  }
  
  if (path.match(/^\/users\/?$/)) {
    if (method === 'GET') {
      return mockResponse(200, mockServer.getUsers());
    } else if (method === 'POST' && init?.body) {
      const newUser = JSON.parse(init.body as string);
      return mockResponse(201, mockServer.createUser(newUser));
    }
  }
  
  if (path.match(/^\/users\/([^/]+)$/)) {
    const id = path.split('/')[2];
    if (method === 'GET') {
      const user = mockServer.getUserById(id);
      return user
        ? mockResponse(200, user)
        : mockResponse(404, { message: 'User not found' });
    } else if (method === 'PUT' && init?.body) {
      const updates = JSON.parse(init.body as string);
      const updated = mockServer.updateUser(id, updates);
      return updated
        ? mockResponse(200, updated)
        : mockResponse(404, { message: 'User not found' });
    } else if (method === 'DELETE') {
      const deleted = mockServer.deleteUser(id);
      return deleted
        ? mockResponse(200, { message: 'User deleted' })
        : mockResponse(404, { message: 'User not found' });
    }
  }
  
  if (path.match(/^\/users\/([^/]+)\/status$/)) {
    const id = path.split('/')[2];
    if (method === 'PATCH' && init?.body) {
      const { status } = JSON.parse(init.body as string);
      const updated = mockServer.toggleUserStatus(id, status);
      return updated
        ? mockResponse(200, updated)
        : mockResponse(404, { message: 'User not found' });
    }
  }
  
  // Default response for unhandled routes
  return mockResponse(
    404, 
    { message: `Route not found: ${method} ${path}` }
  );
}

function mockResponse(status: number, body: any): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: new Headers({ 'Content-Type': 'application/json' })
  });
}
