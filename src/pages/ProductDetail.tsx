
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import { usePageTransition } from '@/lib/animations';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { className } = usePageTransition();
  
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100))
    : null;

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`Added ${product.name} to wishlist`);
  };

  return (
    <div className={className}>
      <Navbar />
      
      <div className="page-container py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl overflow-hidden h-96 w-full shadow-subtle">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`h-20 w-20 rounded-md overflow-hidden shadow-sm flex-shrink-0 transition-all ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Labels */}
            <div className="flex flex-wrap gap-2">
              {product.new && (
                <span className="bg-primary text-white text-xs py-1 px-2 rounded-full">
                  New
                </span>
              )}
              {product.discount && (
                <span className="bg-primary/20 text-primary text-xs py-1 px-2 rounded-full">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
            
            {/* Category */}
            <p className="text-sm text-muted-foreground">{product.category}</p>
            
            {/* Title */}
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="ml-1 font-medium">{product.rating.toFixed(1)}</span>
              </div>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center">
              {discountedPrice ? (
                <>
                  <span className="text-2xl font-semibold">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-3 text-lg text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>
            
            {/* Colors if available */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className="h-10 px-3 rounded-md border hover:border-primary transition-colors"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sizes if available */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className="h-10 w-10 flex items-center justify-center rounded-md border hover:border-primary transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-10 px-4 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Stock */}
            <p className="text-sm">
              {product.stock > 10 ? (
                <span className="text-green-600">In stock</span>
              ) : product.stock > 0 ? (
                <span className="text-amber-600">Only {product.stock} left in stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </p>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
