
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, PhoneCall, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-mara-950 text-white">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Info */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-semibold tracking-tight">
              Mara
            </Link>
            <p className="text-mara-300 max-w-xs">
              Your one-stop e-commerce convenience store with a wide variety of daily-use products.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-mara-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-mara-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-mara-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-mara-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-mara-300 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-mara-300 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-mara-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-mara-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-mara-300 hover:text-white transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/orders" className="text-mara-300 hover:text-white transition-colors">Order Tracking</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-mara-300 hover:text-white transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link to="/terms" className="text-mara-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-mara-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-mara-300 flex-shrink-0 mt-0.5" />
                <span className="text-mara-300">
                  123 Market Street, Suite 456, San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 mr-2 text-mara-300" />
                <a href="tel:+1-234-567-8901" className="text-mara-300 hover:text-white transition-colors">
                  (234) 567-8901
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-mara-300" />
                <a href="mailto:support@mara.com" className="text-mara-300 hover:text-white transition-colors">
                  support@mara.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-mara-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mara-300 text-sm">
            &copy; {currentYear} Mara Ecommerce. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
              alt="Visa" 
              className="h-8 w-auto opacity-70" 
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
              alt="Mastercard" 
              className="h-8 w-auto opacity-70" 
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
              alt="PayPal" 
              className="h-8 w-auto opacity-70" 
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/5968/5968144.png" 
              alt="Apple Pay" 
              className="h-8 w-auto opacity-70" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
