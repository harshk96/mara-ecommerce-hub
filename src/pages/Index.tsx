
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, CreditCard, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { products, categories } from '@/lib/data';
import { usePageTransition, useScrollAnimation } from '@/lib/animations';

const Index = () => {
  const { className } = usePageTransition();
  const featuredProducts = products.filter(product => product.featured);
  const newProducts = products.filter(product => product.new);

  // Animations for scroll sections
  const featuredSection = useScrollAnimation(0.1);
  const categoriesSection = useScrollAnimation(0.1);
  const benefitsSection = useScrollAnimation(0.1);
  const ctaSection = useScrollAnimation(0.1);

  return (
    <div className={className}>
      <Navbar />
      <Hero />

      {/* Featured Products */}
      <section className="section-spacing" ref={featuredSection.ref}>
        <div className={`page-container transition-all duration-700 ${
          featuredSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">Curated selection</h2>
              <h3 className="text-3xl font-semibold tracking-tight">Featured Products</h3>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted py-16 md:py-24" ref={categoriesSection.ref}>
        <div className={`page-container transition-all duration-700 delay-200 ${
          categoriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">Browse by category</h2>
            <h3 className="text-3xl font-semibold tracking-tight mb-4">Shop Our Collections</h3>
            <p className="text-muted-foreground">
              Explore our wide variety of carefully curated categories designed to meet all your daily needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.name}`}
                className="group"
                style={{
                  opacity: 0,
                  animation: `fade-in 0.5s ease-out ${index * 0.1 + 0.3}s forwards`
                }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-subtle h-full flex flex-col animate-hover-lift">
                  <div className="h-36 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 text-center flex flex-col items-center justify-center flex-grow">
                    <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">Fresh finds</h2>
              <h3 className="text-3xl font-semibold tracking-tight">New Arrivals</h3>
            </div>
            <Link to="/products?new=true">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid products={newProducts} />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted section-spacing" ref={benefitsSection.ref}>
        <div className={`page-container transition-all duration-700 ${
          benefitsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">Why choose us</h2>
            <h3 className="text-3xl font-semibold tracking-tight mb-4">The Mara Experience</h3>
            <p className="text-muted-foreground">
              We offer a seamless shopping experience with quality products, fast delivery, and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-subtle animate-hover-lift">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-lg mb-2">Quality Products</h4>
              <p className="text-muted-foreground">
                We source and curate products of the highest quality for your everyday needs.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-subtle animate-hover-lift">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-lg mb-2">Fast Delivery</h4>
              <p className="text-muted-foreground">
                Get your orders delivered to your doorstep quickly and securely.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-subtle animate-hover-lift">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-lg mb-2">Secure Payments</h4>
              <p className="text-muted-foreground">
                Multiple secure payment options for a worry-free shopping experience.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-subtle animate-hover-lift">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LifeBuoy className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-lg mb-2">24/7 Support</h4>
              <p className="text-muted-foreground">
                Our customer service team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing" ref={ctaSection.ref}>
        <div className={`page-container max-w-5xl transition-all duration-700 delay-300 ${
          ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-mara-950 text-white rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ 
                  backgroundImage: `url(https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80)`
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Ready to Start Shopping?
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers and discover the convenience of shopping with Mara.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/products">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-white/90 w-full sm:w-auto"
                    >
                      Shop Now
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
