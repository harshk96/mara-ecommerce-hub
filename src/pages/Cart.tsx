
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { usePageTransition } from '@/lib/animations';
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { products } from '@/lib/data';
import { CartItem } from '@/lib/data';

const Cart = () => {
  const { className } = usePageTransition();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Initialize with some items for demo
  useEffect(() => {
    const demoCart = [
      { ...products[0], quantity: 1 },
      { ...products[2], quantity: 2 }
    ];
    setCartItems(demoCart);
  }, []);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.discount 
      ? item.price - (item.price * (item.discount / 100)) 
      : item.price;
    return total + price * item.quantity;
  }, 0);
  
  // Free shipping threshold
  const freeShippingThreshold = 100;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 10;
  
  // Total
  const total = subtotal + shipping;
  
  // Increment quantity
  const incrementQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  // Decrement quantity
  const decrementQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };
  
  // Remove item
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  return (
    <div className={className}>
      <Navbar />
      
      <div className="page-container py-24">
        <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
              
              {/* Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const discountedPrice = item.discount 
                    ? item.price - (item.price * (item.discount / 100)) 
                    : null;
                    
                  return (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-xl shadow-subtle"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden mb-4 sm:mb-0 mr-0 sm:mr-4">
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        
                        {/* Price */}
                        <div className="flex items-center mt-1">
                          {discountedPrice ? (
                            <>
                              <span className="font-semibold">${discountedPrice.toFixed(2)}</span>
                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                ${item.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-semibold">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-4 sm:mt-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => decrementQuantity(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="h-8 w-10 flex items-center justify-center border-y">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => incrementQuantity(item.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-4 text-muted-foreground hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-subtle sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {shipping > 0 ? (
                      <span>${shipping.toFixed(2)}</span>
                    ) : (
                      <span className="text-green-500">Free</span>
                    )}
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                      Add ${(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                  
                  <div className="pt-3 border-t flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure payments provided by Stripe. We never store your payment information.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-subtle">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
