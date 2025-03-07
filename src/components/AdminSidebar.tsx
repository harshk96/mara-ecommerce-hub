
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut,
  ChevronRight,
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin'
    },
    {
      title: 'Products',
      icon: Package,
      path: '/admin/products'
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      path: '/admin/orders'
    },
    {
      title: 'Users',
      icon: Users,
      path: '/admin/users'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white border-r z-40 transition-all duration-300 shadow-md
                   ${isCollapsed ? 'w-20' : 'w-64'} 
                   ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-4 border-b h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && <h1 className="text-lg font-semibold">Mara Admin</h1>}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 py-4 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-md transition-colors
                          ${isActive(item.path) 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-muted text-gray-700'}`}
              >
                <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t mt-auto">
            <Button
              variant="ghost"
              className={`w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50
                        ${isCollapsed ? 'px-0 justify-center' : ''}`}
              onClick={logout}
            >
              <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'mr-2'}`} />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
