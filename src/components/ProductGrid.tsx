
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);

  // Load products immediately rather than staggering them
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      setLoadedProducts(products);
    }
  }, [isLoading, products]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">No products found</h3>
        <p className="mt-2">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {loadedProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={0}
        />
      ))}
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-subtle pb-4">
    <Skeleton className="h-64 w-full" />
    <div className="p-4">
      <Skeleton className="h-3 w-20 mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-32 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);
