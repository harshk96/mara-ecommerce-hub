
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('mara_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock admin user
  const adminUser = {
    id: '1',
    email: 'admin@mara.com',
    name: 'Admin User',
    role: 'admin' as const,
  };

  // Mock regular user
  const regularUser = {
    id: '2',
    email: 'user@mara.com',
    name: 'Regular User',
    role: 'user' as const,
  };

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login logic (would be replaced with real API calls)
      if (email === adminUser.email && password === 'admin123') {
        setUser(adminUser);
        localStorage.setItem('mara_user', JSON.stringify(adminUser));
        toast.success('Logged in as Admin');
        return true;
      } else if (email === regularUser.email && password === 'user123') {
        setUser(regularUser);
        localStorage.setItem('mara_user', JSON.stringify(regularUser));
        toast.success('Logged in successfully');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just create a new user (would be replaced with real API)
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: 'user' as const,
      };
      
      setUser(newUser);
      localStorage.setItem('mara_user', JSON.stringify(newUser));
      
      toast.success('Registration successful');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('mara_user');
    toast.success('Logged out successfully');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
