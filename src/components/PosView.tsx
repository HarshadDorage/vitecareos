import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Grid, Search, Trash2, Plus, Minus, CreditCard, Banknote, Coffee, LogOut } from 'lucide-react';
import { User, Product, Category, Table, CartItem, Order } from '../types';
import { storage } from '../services/storageService';
import { Receipt } from './Receipt';

interface PosViewProps {
  user: User;
  onLogout: () => void;
}

export const PosView: React.FC<PosViewProps> = ({ user, onLogout }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [c, p, t] = await Promise.all([
        storage.getCategories(),
        storage.getProducts(),
        storage.getTables()
      ]);
      setCategories(c);
      setProducts(p);
      setTables(t);
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, cartId: Date.now().toString(), quantity: 1 }];
    });
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = subtotal * (discountPercent / 100);
    const tax = (subtotal - discount) * 0.10; // 10% tax
    const total = subtotal - discount + tax;
    return { subtotal, discount, tax, total };
  }, [cart, discountPercent]);

  const handleCheckout = async (method: Order['paymentMethod']) => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    const order: Order = {
      id: crypto.randomUUID(),
      tableId: selectedTable?.id || null,
      tableName: selectedTable?.name,
      items: [...cart],
      ...totals,
      paymentMethod: method,
      timestamp: Date.now(),
      cashierId: user.id,
      status: 'COMPLETED'
    };

    await storage.createOrder(order);
    
    // Update local table state to reflect availability if needed (simplified here)
    if (selectedTable) {
        const updatedTables = tables.map(t => t.id === selectedTable.id ? {...t, status: 'AVAILABLE' as const} : t);
        setTables(updatedTables);
        setSelectedTable(null);
    }

    setLastOrder(order);
    setCart([]);
    setDiscountPercent(0);
    setIsProcessing(false);

    // Auto print
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Receipt order={lastOrder} />

      {/* LEFT SIDE: Menu & Tables */}
      <div className="flex-1 flex flex-col min-w-0 no-print">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">RestoBill</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search menu..." 
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Table:</span>
              <select 
                className={`p-2 rounded border font-bold ${selectedTable ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50'}`}
                value={selectedTable?.id || ''}
                onChange={(e) => setSelectedTable(tables.find(t => t.id === e.target.value) || null)}
              >
                <option value="">Takeaway / None</option>
                {tables.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.status})</option>
                ))}
              </select>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500">
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border-b overflow-x-auto whitespace-nowrap p-2 flex gap-2">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col justify-between h-32 group"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={16} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Cart & Checkout */}
      <div className="w-96 bg-white shadow-xl flex flex-col border-l no-print z-10">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <ShoppingCart size={20} />
            Current Order
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {selectedTable ? `Dine-in • ${selectedTable.name}` : 'Takeaway Order'}
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Coffee size={48} className="mb-2 opacity-50" />
              <p>No items added yet</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartId} className="flex justify-between items-start group">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <div className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded">
                    <Plus size={14} />
                  </button>
                  <button onClick={() => removeFromCart(item.cartId)} className="ml-2 p-1 text-red-300 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals Section */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Discount</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="0" max="100" 
                  value={discountPercent} 
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-12 text-right p-1 border rounded text-xs" 
                />
                <span>%</span>
                <span>- ${totals.discount.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>${totals.tax.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6 pt-2 border-t border-gray-200">
            <span className="font-bold text-xl text-gray-800">Total</span>
            <span className="font-bold text-2xl text-blue-600">${totals.total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              disabled={cart.length === 0 || isProcessing}
              onClick={() => handleCheckout('CASH')}
              className="flex flex-col items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Banknote size={24} className="mb-1" />
              <span className="font-semibold">CASH</span>
            </button>
            <button 
              disabled={cart.length === 0 || isProcessing}
              onClick={() => handleCheckout('CARD')}
              className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <CreditCard size={24} className="mb-1" />
              <span className="font-semibold">CARD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};