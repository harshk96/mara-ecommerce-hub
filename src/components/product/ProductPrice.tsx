
interface ProductPriceProps {
  price: number;
  discount: number | null;
}

export const ProductPrice = ({ price, discount }: ProductPriceProps) => {
  const discountedPrice = discount 
    ? price - (price * (discount / 100))
    : null;

  return (
    <div className="flex items-center">
      {discountedPrice ? (
        <>
          <span className="text-2xl font-semibold">${discountedPrice.toFixed(2)}</span>
          <span className="ml-3 text-lg text-muted-foreground line-through">
            ${price.toFixed(2)}
          </span>
        </>
      ) : (
        <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
      )}
    </div>
  );
};
