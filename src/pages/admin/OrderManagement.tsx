
import { AdminSidebar } from '@/components/AdminSidebar';
import { usePageTransition } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2023-10-15',
    total: 129.99,
    status: 'processing',
    items: [
      { name: 'Wireless Headphones', price: 129.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2023-10-14',
    total: 89.99,
    status: 'shipped',
    items: [
      { name: 'Smart Watch', price: 89.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-003',
    customer: 'Robert Johnson',
    email: 'robert@example.com',
    date: '2023-10-13',
    total: 259.97,
    status: 'delivered',
    items: [
      { name: 'Bluetooth Speaker', price: 79.99, quantity: 1 },
      { name: 'Wireless Earbuds', price: 89.99, quantity: 2 }
    ]
  },
  {
    id: 'ORD-004',
    customer: 'Mary Williams',
    email: 'mary@example.com',
    date: '2023-10-12',
    total: 199.99,
    status: 'pending',
    items: [
      { name: 'Tablet', price: 199.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-005',
    customer: 'David Brown',
    email: 'david@example.com',
    date: '2023-10-11',
    total: 349.98,
    status: 'processing',
    items: [
      { name: 'Smartphone', price: 349.98, quantity: 1 }
    ]
  }
];

const OrderManagement = () => {
  const { className } = usePageTransition();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Handle order status update
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
    setIsDialogOpen(false);
  };
  
  // View order details
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get appropriate badge color based on status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={className}>
      <AdminSidebar />
      
      <div className="lg:pl-64 pl-0">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Order Management</h1>
            <p className="text-muted-foreground">View and manage customer orders</p>
          </div>
          
          {/* Filters and Controls */}
          <div className="bg-white rounded-xl p-4 shadow-subtle mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-subtle overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
      
      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Order Details - {selectedOrder.id}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </DialogTitle>
              <DialogDescription>
                Placed on {selectedOrder.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Customer Information</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <p>{selectedOrder.customer}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Order Status</h3>
                  <Select 
                    defaultValue={selectedOrder.status}
                    onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="text-sm font-medium mb-2">Order Items</h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="flex justify-end">
                <div className="w-full md:w-64">
                  <div className="flex justify-between py-2 border-t">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between py-2 border-t font-medium">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderManagement;
