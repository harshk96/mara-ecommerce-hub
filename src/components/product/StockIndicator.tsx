
interface StockIndicatorProps {
  stock: number;
}

export const StockIndicator = ({ stock }: StockIndicatorProps) => {
  return (
    <p className="text-sm">
      {stock > 10 ? (
        <span className="text-green-600">In stock</span>
      ) : stock > 0 ? (
        <span className="text-amber-600">Only {stock} left in stock</span>
      ) : (
        <span className="text-red-600">Out of stock</span>
      )}
    </p>
  );
};
