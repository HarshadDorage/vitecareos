import React from 'react';
import { Order } from '../types';

interface ReceiptProps {
  order: Order | null;
}

export const Receipt: React.FC<ReceiptProps> = ({ order }) => {
  if (!order) return null;

  return (
    <div className="print-only p-4 text-xs font-mono w-[80mm] mx-auto">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">RESTOBILL PRO</h1>
        <p>123 Culinary Ave, Food City</p>
        <p>Tel: (555) 123-4567</p>
      </div>

      <div className="border-b border-black mb-2 pb-2">
        <div className="flex justify-between">
          <span>Order #:</span>
          <span>{order.id.slice(-6).toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>{new Date(order.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Table:</span>
          <span>{order.tableName || 'Takeaway'}</span>
        </div>
      </div>

      <table className="w-full mb-2">
        <thead>
          <tr className="text-left">
            <th className="pb-1">Item</th>
            <th className="pb-1 text-right">Qty</th>
            <th className="pb-1 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx}>
              <td className="py-1">{item.name}</td>
              <td className="text-right py-1">{item.quantity}</td>
              <td className="text-right py-1">{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-black pt-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span>-${order.discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center border-t border-black pt-2">
        <p>Thank you for dining with us!</p>
        <p className="mt-1">WiFi: RestoGuest / Pass: yummy123</p>
      </div>
    </div>
  );
};