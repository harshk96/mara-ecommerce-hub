
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import { usePageTransition } from '@/lib/animations';
import { toast } from 'sonner';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductLabels } from '@/components/product/ProductLabels';
import { ProductRating } from '@/components/product/ProductRating';
import { ProductPrice } from '@/components/product/ProductPrice';
import { ProductQuantity } from '@/components/product/ProductQuantity';
import { StockIndicator } from '@/components/product/StockIndicator';
import { ProductActions } from '@/components/product/ProductActions';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { className } = usePageTransition();
  
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

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
          <ProductImageGallery images={product.images} name={product.name} />
          
          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Labels */}
            <ProductLabels isNew={product.new} discount={product.discount} />
            
            {/* Category */}
            <p className="text-sm text-muted-foreground">{product.category}</p>
            
            {/* Title */}
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            
            {/* Rating */}
            <ProductRating rating={product.rating} reviews={product.reviews} />
            
            {/* Price */}
            <ProductPrice price={product.price} discount={product.discount} />
            
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
            <ProductQuantity 
              quantity={quantity} 
              setQuantity={setQuantity} 
              max={product.stock} 
            />
            
            {/* Stock */}
            <StockIndicator stock={product.stock} />
            
            {/* Actions */}
            <ProductActions 
              onAddToCart={handleAddToCart} 
              onAddToWishlist={handleAddToWishlist} 
              disabled={product.stock === 0} 
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
