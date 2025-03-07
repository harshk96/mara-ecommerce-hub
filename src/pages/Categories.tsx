
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { usePageTransition } from '@/lib/animations';
import { categories } from '@/lib/data';

const Categories = () => {
  const { className } = usePageTransition();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className={className}>
      <Navbar />
      
      <div className="page-container py-24">
        <h1 className="text-3xl font-bold mb-2 text-center">Product Categories</h1>
        <p className="text-center text-muted-foreground mb-12">
          Explore our wide range of product categories
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="relative overflow-hidden rounded-xl shadow-subtle group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              
              <img 
                src={category.image} 
                alt={category.name}
                className={`w-full h-60 object-cover transition-transform duration-500 ${
                  hoveredCategory === category.id ? 'scale-110' : 'scale-100'
                }`}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Categories;
