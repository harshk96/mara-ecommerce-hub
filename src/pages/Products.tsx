
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Navbar } from '@/components/Navbar';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { products, categories } from '@/lib/data';
import { usePageTransition } from '@/lib/animations';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { className } = usePageTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showNew, setShowNew] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  // Parse URL parameters on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const newParam = searchParams.get('new');
    const discountParam = searchParams.get('discount');
    
    if (category) {
      setSelectedCategories([category]);
    }
    
    if (newParam === 'true') {
      setShowNew(true);
    }
    
    if (discountParam === 'true') {
      setShowDiscount(true);
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [location.search]);
  
  // Update filtered products when filters change
  useEffect(() => {
    let filtered = [...products];
    
    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // New items filter
    if (showNew) {
      filtered = filtered.filter(product => product.new);
    }
    
    // Discounted items filter
    if (showDiscount) {
      filtered = filtered.filter(product => product.discount);
    }
    
    // Sorting
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = filtered.filter(product => product.new).concat(
          filtered.filter(product => !product.new)
        );
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        filtered = filtered.filter(product => product.featured).concat(
          filtered.filter(product => !product.featured)
        );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategories, priceRange, showNew, showDiscount, sortBy]);
  
  // Update URL based on filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length === 1) {
      params.set('category', selectedCategories[0]);
    }
    
    if (showNew) {
      params.set('new', 'true');
    }
    
    if (showDiscount) {
      params.set('discount', 'true');
    }
    
    const queryString = params.toString();
    navigate({
      pathname: '/products',
      search: queryString ? `?${queryString}` : ''
    }, { replace: true });
  }, [selectedCategories, showNew, showDiscount, navigate]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setShowNew(false);
    setShowDiscount(false);
    setSortBy('featured');
  };
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={className}>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-muted pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="page-container">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Browse our complete collection of quality products.
          </p>
        </div>
      </div>
      
      <div className="page-container py-8">
        {/* Mobile Filter Toggle */}
        <div className="flex md:hidden justify-between items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Sort:</span>
            <select
              className="bg-transparent text-sm py-1 pr-6 border-0 focus:ring-0"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`w-full md:w-64 lg:w-72 flex-shrink-0 bg-white rounded-xl p-6 shadow-subtle h-fit sticky top-24 transition-all duration-300 ${
            filtersOpen ? 'block' : 'hidden md:block'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </h2>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 md:hidden"
                  onClick={() => setFiltersOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium mb-2">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search products..."
                className="w-full px-3 py-2 border rounded-md text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-start">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() => toggleCategory(category.name)}
                      className="mt-0.5"
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <span className="text-xs text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            
            {/* Special Filters */}
            <div className="space-y-2">
              <div className="flex items-start">
                <Checkbox 
                  id="new-items" 
                  checked={showNew}
                  onCheckedChange={(checked) => setShowNew(checked as boolean)}
                  className="mt-0.5"
                />
                <label 
                  htmlFor="new-items"
                  className="ml-2 text-sm cursor-pointer"
                >
                  New Arrivals
                </label>
              </div>
              <div className="flex items-start">
                <Checkbox 
                  id="discount-items" 
                  checked={showDiscount}
                  onCheckedChange={(checked) => setShowDiscount(checked as boolean)}
                  className="mt-0.5"
                />
                <label 
                  htmlFor="discount-items"
                  className="ml-2 text-sm cursor-pointer"
                >
                  On Sale
                </label>
              </div>
            </div>
          </div>
          
          {/* Product Grid and Sorting */}
          <div className="flex-1">
            {/* Desktop Sorting */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                <select
                  className="bg-transparent text-sm py-1 pr-6 border rounded-md focus:ring-0"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {/* Active Filters */}
            {(selectedCategories.length > 0 || showNew || showDiscount || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(category => (
                  <div key={category} className="bg-muted rounded-full text-xs px-3 py-1 flex items-center">
                    {category}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={() => toggleCategory(category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                {showNew && (
                  <div className="bg-muted rounded-full text-xs px-3 py-1 flex items-center">
                    New Arrivals
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={() => setShowNew(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {showDiscount && (
                  <div className="bg-muted rounded-full text-xs px-3 py-1 flex items-center">
                    On Sale
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={() => setShowDiscount(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {searchQuery && (
                  <div className="bg-muted rounded-full text-xs px-3 py-1 flex items-center">
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Products */}
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
