import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Order, Product, Category } from '../types';
import { storage } from '../services/storageService';
import { Download, TrendingUp, DollarSign, ShoppingBag, Settings, Cloud } from 'lucide-react';

// Menu Management Component Internal
const MenuManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name: '', price: 0, categoryId: '' });

  const load = async () => {
    setProducts(await storage.getProducts());
    setCategories(await storage.getCategories());
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.categoryId) return;
    
    await storage.saveProduct({
      id: newProduct.id || crypto.randomUUID(),
      categoryId: newProduct.categoryId,
      name: newProduct.name,
      price: Number(newProduct.price),
      isAvailable: true,
      ...newProduct
    } as Product);
    
    setNewProduct({ name: '', price: 0, categoryId: '' });
    setIsEditing(false);
    load();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-bold">Menu Management</h3>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {isEditing ? 'Cancel' : 'Add New Item'}
        </button>
      </div>

      {isEditing && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-blue-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              className="w-full p-2 border rounded" 
              value={newProduct.name} 
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              type="number"
              className="w-full p-2 border rounded" 
              value={newProduct.price} 
              onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="w-full p-2 border rounded"
              value={newProduct.categoryId}
              onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})}
            >
              <option value="">Select...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save Item</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-gray-500">{categories.find(c => c.id === p.categoryId)?.name}</td>
                <td className="p-3">${p.price.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <button 
                    onClick={async () => { if(confirm('Delete?')) { await storage.deleteProduct(p.id); load(); } }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Backup Settings
const BackupSettings = () => {
  const [enabled, setEnabled] = useState(false);
  const [daysLeft, setDaysLeft] = useState(7);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Cloud className="text-blue-500" /> 
        Backup & Sync
      </h3>
      <div className="border border-blue-100 bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-blue-800 font-medium">Trial Status: Active</p>
        <p className="text-sm text-blue-600">{daysLeft} days remaining in your 7-day OneDrive trial.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-semibold">OneDrive Integration</p>
            <p className="text-sm text-gray-500">Automatically upload daily sales logs CSV to cloud.</p>
          </div>
          <button 
            onClick={() => setEnabled(!enabled)}
            className={`px-4 py-2 rounded-full transition-colors ${enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
          >
            {enabled ? 'Connected' : 'Connect Account'}
          </button>
        </div>
      </div>
      
      <p className="mt-4 text-xs text-gray-400">
        Note: In the Production Electron build, this connects to the Microsoft Graph API using the user's system credentials.
      </p>
    </div>
  );
};

export const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'settings'>('dashboard');

  useEffect(() => {
    storage.getOrders().then(setOrders);
  }, [activeTab]);

  // Analytics
  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  
  const salesByDate = orders.reduce((acc: any, order) => {
    const date = new Date(order.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {});

  const chartData = Object.keys(salesByDate).map(date => ({ date, sales: salesByDate[date] })).slice(-7);
  
  const exportCSV = () => {
    const headers = ['Order ID', 'Date', 'Items', 'Total', 'Payment', 'Cashier'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.timestamp).toLocaleString(),
      o.items.map(i => `${i.quantity}x ${i.name}`).join('; '),
      o.total.toFixed(2),
      o.paymentMethod,
      o.cashierId
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of your restaurant's performance</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'dashboard' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('menu')} 
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'menu' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
          >
            Menu
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'settings' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Total Revenue</span>
                <DollarSign className="text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">${totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Total Orders</span>
                <ShoppingBag className="text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={exportCSV}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Reports</span>
                <Download className="text-orange-500" />
              </div>
              <p className="text-lg font-semibold text-blue-600">Download CSV</p>
              <p className="text-xs text-gray-400">Export full sales history</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
              <h3 className="font-bold text-gray-700 mb-4">Sales Trend (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col items-center justify-center">
               <h3 className="font-bold text-gray-700 w-full text-left mb-2">Platform Note</h3>
               <div className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
                 <p className="mb-2">This is a Web Demo running in your browser.</p>
                 <p className="text-sm">
                   To deploy as a Windows EXE, wrap this source code using <code className="bg-gray-200 px-1 rounded">electron-builder</code>.
                   Replace <b>storageService.ts</b> with <b>sqlite3</b> calls for production machine-level persistence.
                 </p>
               </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'menu' && <MenuManager />}
      {activeTab === 'settings' && <BackupSettings />}
    </div>
  );
};