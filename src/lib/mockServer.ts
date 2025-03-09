
import { faker } from '@faker-js/faker';

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  new: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Mock Database
let products: Product[] = [];
let users: User[] = [];
let orders: Order[] = [];

// Generate initial data
const generateInitialData = () => {
  // Generate products
  for (let i = 0; i < 20; i++) {
    const name = faker.commerce.productName();
    const category = faker.commerce.department();
    const price = Number(faker.commerce.price({ min: 10, max: 1000, dec: 2 }));
    
    products.push({
      id: faker.string.uuid(),
      name,
      description: faker.commerce.productDescription(),
      price,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : undefined,
      category,
      images: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        faker.image.urlLoremFlickr({ category: category.toLowerCase(), width: 640, height: 480 })
      ),
      stock: Math.floor(Math.random() * 100),
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      reviews: Math.floor(Math.random() * 500),
      featured: Math.random() > 0.8,
      new: Math.random() > 0.8,
      createdAt: faker.date.past().toISOString()
    });
  }
  
  // Generate users
  for (let i = 0; i < 10; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: i === 0 ? 'admin' : 'user',
      avatar: faker.image.avatar(),
      status: Math.random() > 0.2 ? 'active' : 'inactive',
      createdAt: faker.date.past().toISOString()
    });
  }
  
  // Generate orders
  for (let i = 0; i < 15; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const orderProducts = [];
    let total = 0;
    
    const numProducts = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const productTotal = product.price * quantity;
      
      orderProducts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
      });
      
      total += productTotal;
    }
    
    orders.push({
      id: faker.string.uuid(),
      customer: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      products: orderProducts,
      total,
      status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)] as Order['status'],
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      paymentMethod: ['credit_card', 'paypal', 'bank_transfer'][Math.floor(Math.random() * 3)] as Order['paymentMethod'],
      shippingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      }
    });
  }
};

// Generate data on initialization
generateInitialData();

// Mock Server API
export const mockServer = {
  // Product methods
  getProducts: () => products,
  
  getProductById: (id: string) => {
    return products.find(product => product.id === id);
  },
  
  createProduct: (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct = {
      ...product,
      id: faker.string.uuid(),
      createdAt: new Date().toISOString()
    };
    products.push(newProduct as Product);
    return newProduct;
  },
  
  updateProduct: (id: string, updates: Partial<Product>) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    return products[index];
  },
  
  deleteProduct: (id: string) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return false;
    
    products.splice(index, 1);
    return true;
  },
  
  // User methods
  getUsers: () => users,
  
  getUserById: (id: string) => {
    return users.find(user => user.id === id);
  },
  
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser = {
      ...user,
      id: faker.string.uuid(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser as User);
    return newUser;
  },
  
  updateUser: (id: string, updates: Partial<User>) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updates };
    return users[index];
  },
  
  deleteUser: (id: string) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  },
  
  toggleUserStatus: (id: string, status: User['status']) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    users[index].status = status;
    return users[index];
  },
  
  // Order methods
  getOrders: () => orders,
  
  getOrderById: (id: string) => {
    return orders.find(order => order.id === id);
  },
  
  updateOrderStatus: (id: string, status: Order['status']) => {
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) return null;
    
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    return orders[index];
  },
  
  deleteOrder: (id: string) => {
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) return false;
    
    orders.splice(index, 1);
    return true;
  }
};
