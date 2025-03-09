
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const slides = [
    {
      title: "The Best Daily Essentials",
      subtitle: "Quality products delivered to your doorstep",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      cta: "Shop Now",
      link: "/products"
    },
    {
      title: "New Arrivals",
      subtitle: "Discover our latest collection of premium products",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      cta: "Explore Collection",
      link: "/products?new=true"
    },
    {
      title: "Special Offers",
      subtitle: "Limited time discounts on selected items",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80",
      cta: "View Deals",
      link: "/products?discount=true"
    }
  ];

  // Preload all slide images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slides.map(slide => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = resolve; // Proceed even if there's an error
        });
      });
      
      // Wait for all images to load
      await Promise.all(imagePromises);
      setImagesPreloaded(true);
    };
    
    preloadImages();
  }, []);

  // Auto-advance slides only after images are preloaded
  useEffect(() => {
    if (!imagesPreloaded) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesPreloaded, slides.length]);

  if (!imagesPreloaded) {
    return (
      <section className="relative h-[70vh] md:h-[80vh] bg-muted flex items-center justify-center mt-16 md:mt-0">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden mt-16 md:mt-0">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={`slide-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[3000ms]"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.0)' : 'scale(1.05)'
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="page-container flex flex-col items-center text-center text-white">
              <div className={`transform transition-all duration-1000 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
                  {slide.subtitle}
                </p>
                <Link to={slide.link}>
                  <Button 
                    size="lg" 
                    className="bg-white text-black hover:bg-white/90 font-medium btn-hover-effect"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
