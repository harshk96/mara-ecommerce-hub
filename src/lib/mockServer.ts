
import { faker } from '@faker-js/faker';

// Generates mock data for development
class MockServer {
  products: any[];
  orders: any[];
  users: any[];

  constructor() {
    this.products = [];
    this.orders = [];
    this.users = [];
    this.seedData();
  }

  seedData() {
    // Generate mock products
    for (let i = 0; i < 20; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        category: faker.commerce.department(),
        images: [
          faker.image.urlLoremFlickr({ category: 'product' }),
          faker.image.urlLoremFlickr({ category: 'product' })
        ],
        stock: faker.number.int({ min: 0, max: 100 }),
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        reviews: faker.number.int({ min: 0, max: 500 }),
        new: faker.datatype.boolean(),
        discount: faker.helpers.maybe(() => faker.number.int({ min: 5, max: 30 }), { probability: 0.3 })
      });
    }

    // Generate mock orders
    for (let i = 0; i < 15; i++) {
      const orderItems = [];
      const itemCount = faker.number.int({ min: 1, max: 5 });
      
      for (let j = 0; j < itemCount; j++) {
        const product = faker.helpers.arrayElement(this.products);
        orderItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: faker.number.int({ min: 1, max: 3 })
        });
      }

      const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      this.orders.push({
        id: faker.string.uuid(),
        user: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email()
        },
        items: orderItems,
        total,
        status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
        createdAt: faker.date.recent({ days: 30 }).toISOString(),
        shippingAddress: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: 'United States'
        },
        paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'stripe'])
      });
    }

    // Generate mock users
    this.users = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@mara.com',
        role: 'admin',
        joinedDate: faker.date.past().toISOString().split('T')[0],
        status: 'active',
        orders: 4
      },
      {
        id: '2',
        name: 'Regular User',
        email: 'user@mara.com',
        role: 'user',
        joinedDate: faker.date.past().toISOString().split('T')[0],
        status: 'active',
        orders: 8
      }
    ];

    // Add more mock users
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: 'user',
        joinedDate: faker.date.past().toISOString().split('T')[0],
        status: faker.helpers.arrayElement(['active', 'inactive']),
        orders: faker.number.int({ min: 0, max: 15 })
      });
    }
  }

  // Product methods
  getProducts() {
    return [...this.products];
  }

  getProductById(id: string) {
    return this.products.find(p => p.id === id);
  }

  createProduct(product: any) {
    const newProduct = {
      id: faker.string.uuid(),
      ...product,
      reviews: 0,
      rating: 0
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: any) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id: string) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = this.products[index];
      this.products.splice(index, 1);
      return deleted;
    }
    return null;
  }

  // Order methods
  getOrders() {
    return [...this.orders];
  }

  getOrderById(id: string) {
    return this.orders.find(o => o.id === id);
  }

  updateOrderStatus(id: string, status: string) {
    const index = this.orders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.orders[index].status = status;
      return this.orders[index];
    }
    return null;
  }

  deleteOrder(id: string) {
    const index = this.orders.findIndex(o => o.id === id);
    if (index !== -1) {
      const deleted = this.orders[index];
      this.orders.splice(index, 1);
      return deleted;
    }
    return null;
  }

  // User methods
  getUsers() {
    return [...this.users];
  }

  getUserById(id: string) {
    return this.users.find(u => u.id === id);
  }

  createUser(user: any) {
    const newUser = {
      id: faker.string.uuid(),
      ...user,
      joinedDate: new Date().toISOString().split('T')[0],
      orders: 0
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updates: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      const deleted = this.users[index];
      this.users.splice(index, 1);
      return deleted;
    }
    return null;
  }

  toggleUserStatus(id: string, status: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index].status = status;
      return this.users[index];
    }
    return null;
  }
}

export const mockServer = new MockServer();
