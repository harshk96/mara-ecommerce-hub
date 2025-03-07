
import { AdminSidebar } from '@/components/AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { usePageTransition } from '@/lib/animations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, Package, ShoppingCart, Users } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const Dashboard = () => {
  const { className } = usePageTransition();
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total Sales',
      value: '$12,456',
      change: '+12%',
      icon: CreditCard,
      color: 'bg-blue-500',
    },
    {
      title: 'Orders',
      value: '384',
      change: '+8%',
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      title: 'Products',
      value: '56',
      change: '+2',
      icon: Package,
      color: 'bg-amber-500',
    },
    {
      title: 'Customers',
      value: '1,893',
      change: '+19%',
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className={className}>
      <AdminSidebar />
      
      <div className="lg:pl-64 pl-0">
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {statsCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-subtle">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground">{card.title}</p>
                    <h3 className="text-2xl font-semibold mt-1">{card.value}</h3>
                    <p className="text-green-500 text-sm mt-1">{card.change} from last month</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg text-white`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sales Chart */}
          <div className="bg-white rounded-xl p-6 shadow-subtle mb-8">
            <h2 className="text-lg font-medium mb-4">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3f51b5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-subtle">
            <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                  <div className="bg-primary/10 rounded-full p-2 mr-4">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">New order #1{i}23</p>
                    <p className="text-sm text-muted-foreground">Customer purchased Product X</p>
                    <p className="text-xs text-muted-foreground mt-1">{i+1} hour ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
