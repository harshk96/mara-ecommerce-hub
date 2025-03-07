
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { usePageTransition } from '@/lib/animations';

const Login = () => {
  const { className } = usePageTransition();
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={className}>
      <Navbar />
      
      <div className="min-h-screen flex flex-col justify-center px-4 py-24">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-subtle p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Mara account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">Email address</label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required 
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-muted-foreground">
            <p>Demo Accounts:</p>
            <p className="mt-1">Admin: admin@mara.com / admin123</p>
            <p>User: user@mara.com / user123</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
