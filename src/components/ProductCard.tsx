
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Product } from '@/lib/data';
import { useBlurImageLoad } from '@/lib/animations';

interface ProductCardProps {
  product: Product;
  index?: number;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export const ProductCard = ({ 
  product, 
  index = 0, 
  isAdmin = false,
  onEdit,
  onDelete
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isLoaded, onLoad, imgClass } = useBlurImageLoad();
  const delay = index * 0.1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Added ${product.name} to cart`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Added ${product.name} to favorites`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) onEdit(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(product.id);
  };

  // Calculate discount price if applicable
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100))
    : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group animate-hover-lift"
      style={{
        opacity: 0,
        animation: `fade-in 0.5s ease-out ${delay}s forwards`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-subtle transition-all duration-300 group-hover:shadow-hover pb-4">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Product Labels */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.new && (
              <span className="bg-primary text-white text-xs py-1 px-2 rounded-full">
                New
              </span>
            )}
            {product.discount && (
              <span className="bg-primary/20 text-primary text-xs py-1 px-2 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Product Image with Zoom Effect */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${imgClass} ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onLoad={onLoad}
          />
          
          {/* Quick Action Buttons */}
          <div className={`absolute right-3 top-3 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            {isAdmin ? (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={handleEdit}
                >
                  <Star className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDelete}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={handleFavorite}
              >
                <Heart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          
          {/* Title */}
          <h3 className="font-medium text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
            </div>
            <span className="mx-1.5 text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{product.reviews} reviews</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {discountedPrice ? (
                <>
                  <span className="font-semibold">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-semibold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Add to Cart Button */}
            {!isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-primary hover:text-white transition-colors"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span className="text-xs">Add</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
