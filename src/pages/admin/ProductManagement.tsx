
import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { usePageTransition } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'sonner';
import { Product, products as initialProducts } from '@/lib/data';

const ProductManagement = () => {
  const { className } = usePageTransition();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // New product template
  const newProductTemplate: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3'],
    category: '',
    stock: 0,
    rating: 0,
    reviews: 0
  };
  
  // Form state
  const [formData, setFormData] = useState<Product>(newProductTemplate);
  
  // Handle dialog open for create/edit
  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setFormData({ ...product });
      setSelectedProduct(product);
    } else {
      setFormData({ 
        ...newProductTemplate, 
        id: Math.random().toString(36).substring(2, 9)
      });
      setSelectedProduct(null);
    }
    setIsDialogOpen(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'stock' || name === 'rating' || name === 'reviews' || name === 'discount') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProduct) {
      // Update existing product
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === selectedProduct.id ? formData : p)
      );
      toast.success(`Product "${formData.name}" updated successfully`);
    } else {
      // Create new product
      setProducts(prevProducts => [...prevProducts, formData]);
      toast.success(`Product "${formData.name}" created successfully`);
    }
    
    setIsDialogOpen(false);
  };
  
  // Handle delete
  const handleDelete = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    if (productToDelete) {
      setSelectedProduct(productToDelete);
      setIsDeleteDialogOpen(true);
    }
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== selectedProduct.id));
      toast.success(`Product "${selectedProduct.name}" deleted successfully`);
      setIsDeleteDialogOpen(false);
    }
  };
  
  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <AdminSidebar />
      
      <div className="lg:pl-64 pl-0">
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold">Product Management</h1>
              <p className="text-muted-foreground">Manage your products inventory</p>
            </div>
            
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
          
          {/* Filters and Controls */}
          <div className="bg-white rounded-xl p-4 shadow-subtle mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
            </div>
          </div>
          
          {/* Products List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  index={index}
                  isAdmin={true}
                  onEdit={() => handleOpenDialog(product)}
                  onDelete={() => handleDelete(product.id)}
                />
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">No products found.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-subtle overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
      </div>
      
      {/* Product Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct 
                ? 'Update product details below.' 
                : 'Fill in the information for the new product.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Input 
                  id="category" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="discount" className="text-sm font-medium">Discount (%) - Optional</label>
                <Input 
                  id="discount" 
                  name="discount" 
                  type="number" 
                  step="1" 
                  min="0" 
                  max="100"
                  value={formData.discount || ''} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number" 
                  min="0" 
                  value={formData.stock} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="imageUrl" className="text-sm font-medium">Image URL</label>
                <Input 
                  id="imageUrl" 
                  name="imageUrl" 
                  type="url" 
                  value={formData.images[0]} 
                  onChange={(e) => {
                    const newImages = [...formData.images];
                    newImages[0] = e.target.value;
                    setFormData({ ...formData, images: newImages });
                  }} 
                  required 
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  className="w-full p-2 border rounded-md h-24"
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {selectedProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
