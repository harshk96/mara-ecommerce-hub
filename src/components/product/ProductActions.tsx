
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductActionsProps {
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  disabled: boolean;
}

export const ProductActions = ({ onAddToCart, onAddToWishlist, disabled }: ProductActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button 
        size="lg" 
        className="flex-1"
        onClick={onAddToCart}
        disabled={disabled}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
      <Button 
        variant="outline" 
        size="lg"
        className="flex-1"
        onClick={onAddToWishlist}
      >
        <Heart className="mr-2 h-5 w-5" />
        Add to Wishlist
      </Button>
    </div>
  );
};
