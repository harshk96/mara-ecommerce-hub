
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { usePageTransition } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowRight, CreditCard, Package, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const Checkout = () => {
  const { className } = usePageTransition();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  // Dummy cart items for display
  const cartItems = [
    { id: '1', name: 'Wireless Headphones', price: 299.99, quantity: 1 },
    { id: '3', name: 'Non-Stick Cookware Set', price: 199.99, quantity: 1 },
  ];
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 15.99;
  const tax = totalPrice * 0.1; // 10% tax
  const orderTotal = totalPrice + shippingCost + tax;
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const validateShippingForm = () => {
    const { fullName, address, city, state, zipCode } = shippingInfo;
    if (!fullName || !address || !city || !state || !zipCode) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };
  
  const validatePaymentForm = () => {
    const { cardNumber, cardName, expiry, cvv } = paymentInfo;
    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast.error('Please fill in all payment details');
      return false;
    }
    return true;
  };
  
  const handleContinue = () => {
    if (currentStep === 'shipping') {
      if (validateShippingForm()) {
        setCurrentStep('payment');
      }
    } else if (currentStep === 'payment') {
      if (validatePaymentForm()) {
        setCurrentStep('review');
      }
    }
  };
  
  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className={className}>
      <Navbar />
      
      <div className="page-container py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'review' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                <Truck className="w-5 h-5" />
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${
              currentStep === 'payment' || currentStep === 'review' ? 'bg-primary' : 'bg-gray-200'
            }`} />
            
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep === 'payment' || currentStep === 'review' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${
              currentStep === 'review' ? 'bg-primary' : 'bg-gray-200'
            }`} />
            
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep === 'review' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                <Package className="w-5 h-5" />
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side: Form */}
            <div className="flex-1">
              {currentStep === 'shipping' && (
                <div className="bg-white p-6 rounded-xl shadow-subtle">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                      <Input 
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                      <Textarea 
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                        className="min-h-20"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                        <Input 
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                        <Input 
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">Zip Code</label>
                        <Input 
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 'payment' && (
                <div className="bg-white p-6 rounded-xl shadow-subtle">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card</label>
                      <Input 
                        id="cardName"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                      <Input 
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                        <Input 
                          id="expiry"
                          name="expiry"
                          value={paymentInfo.expiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                        <Input 
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 'review' && (
                <div className="bg-white p-6 rounded-xl shadow-subtle">
                  <h2 className="text-xl font-semibold mb-4">Order Review</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{shippingInfo.fullName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Payment Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{paymentInfo.cardName}</p>
                        <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                        <p>Expires: {paymentInfo.expiry}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Items</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep === 'payment' ? 'shipping' : 'payment')}
                  disabled={currentStep === 'shipping'}
                >
                  Back
                </Button>
                
                {currentStep !== 'review' ? (
                  <Button onClick={handleContinue}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                )}
              </div>
            </div>
            
            {/* Right Side: Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-subtle sticky top-24">
                <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
