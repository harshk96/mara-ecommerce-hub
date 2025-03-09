
interface ProductLabelsProps {
  isNew: boolean;
  discount: number | null;
}

export const ProductLabels = ({ isNew, discount }: ProductLabelsProps) => {
  if (!isNew && !discount) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {isNew && (
        <span className="bg-primary text-white text-xs py-1 px-2 rounded-full">
          New
        </span>
      )}
      {discount && (
        <span className="bg-primary/20 text-primary text-xs py-1 px-2 rounded-full">
          -{discount}% OFF
        </span>
      )}
    </div>
  );
};
