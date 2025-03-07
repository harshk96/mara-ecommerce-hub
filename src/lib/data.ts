
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  new?: boolean;
  discount?: number;
  colors?: string[];
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "The latest tech gadgets and accessories",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: "2",
    name: "Home & Kitchen",
    description: "Essential items for your home",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: "3",
    name: "Clothing",
    description: "Stylish apparel for everyone",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: "4",
    name: "Beauty & Personal Care",
    description: "Premium beauty products and personal care essentials",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: "5",
    name: "Groceries",
    description: "Fresh produce and everyday essentials",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: "6",
    name: "Toys & Games",
    description: "Fun items for all ages",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation, providing immersive sound quality and all-day comfort.",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Electronics",
    stock: 45,
    rating: 4.8,
    reviews: 256,
    featured: true,
    colors: ["Black", "Silver", "Blue"],
  },
  {
    id: "2",
    name: "Smart Home Security Camera",
    description: "HD security camera with motion detection, two-way audio, and cloud storage for home monitoring.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Electronics",
    stock: 30,
    rating: 4.5,
    reviews: 189,
    new: true,
  },
  {
    id: "3",
    name: "Non-Stick Cookware Set",
    description: "Complete 12-piece non-stick cookware set with tempered glass lids, suitable for all cooktops.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1584990347449-a851c12c8e17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Home & Kitchen",
    stock: 20,
    rating: 4.7,
    reviews: 75,
    discount: 15,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description: "Soft, breathable organic cotton t-shirt with a classic fit, perfect for everyday wear.",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Clothing",
    stock: 100,
    rating: 4.3,
    reviews: 42,
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5",
    name: "Natural Skincare Gift Set",
    description: "Luxurious set of natural skincare products, including facial cleanser, toner, moisturizer, and serum.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Beauty & Personal Care",
    stock: 15,
    rating: 4.9,
    reviews: 68,
    featured: true,
  },
  {
    id: "6",
    name: "Organic Fresh Fruit Box",
    description: "Seasonal selection of fresh, organic fruits delivered directly from local farms.",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Groceries",
    stock: 50,
    rating: 4.6,
    reviews: 124,
    new: true,
  },
  {
    id: "7",
    name: "Educational STEM Building Kit",
    description: "Interactive building kit that teaches science, technology, engineering, and math concepts through play.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1536748317104-84cbe11c6134?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Toys & Games",
    stock: 25,
    rating: 4.7,
    reviews: 89,
    discount: 10,
  },
  {
    id: "8",
    name: "Smartphone with Triple Camera",
    description: "Latest smartphone with a triple camera system, fast processor, and all-day battery life.",
    price: 899.99,
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    ],
    category: "Electronics",
    stock: 10,
    rating: 4.8,
    reviews: 201,
    featured: true,
    colors: ["Black", "Silver", "Gold"],
  },
];

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
