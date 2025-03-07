
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  // Track scrolling to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-semibold tracking-tight md:text-3xl relative overflow-hidden group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Mara</span>
            <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">Mara</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/categories" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            {isAdmin() && (
              <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-muted">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  0
                </span>
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    {user.name}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdmin() && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden page-container py-4 bg-white/95 backdrop-blur-md animate-slide-down">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="px-4 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="px-4 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
            >
              About
            </Link>
            
            {isAdmin() && (
              <Link 
                to="/admin" 
                className="px-4 py-2 rounded-md text-base font-medium text-primary hover:bg-secondary transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            
            {user ? (
              <Button 
                variant="ghost" 
                className="px-4 py-2 h-auto justify-start font-medium hover:bg-secondary"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
              >
                Account
              </Link>
            )}
            
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute top-2 right-3 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
