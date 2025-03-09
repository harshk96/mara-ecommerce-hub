
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface ProductQuantityProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  max: number;
}

export const ProductQuantity = ({ quantity, setQuantity, max }: ProductQuantityProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Quantity</h3>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-r-none"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
          onClick={() => setQuantity(Math.min(max, quantity + 1))}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
