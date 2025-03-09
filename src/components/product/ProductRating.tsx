
import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  reviews: number;
}

export const ProductRating = ({ rating, reviews }: ProductRatingProps) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <Star className="h-5 w-5 fill-primary text-primary" />
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
      <span className="mx-2 text-muted-foreground">•</span>
      <span className="text-sm text-muted-foreground">{reviews} reviews</span>
    </div>
  );
};
