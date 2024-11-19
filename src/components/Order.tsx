import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const OrderStatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'processing':
      return <Package className="w-5 h-5 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'processing':
      return 'En Proceso';
    case 'completed':
      return 'Completado';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};

const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">No hay pedidos aún</h2>
        <p className="text-gray-600 mt-2">Tu historial de pedidos aparecerá aquí</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tus Pedidos</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Pedido #{order.id}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('es-CO')}
                </p>
              </div>
              <div className="flex items-center">
                <OrderStatusIcon status={order.status} />
                <span className="ml-2">{getStatusText(order.status)}</span>
              </div>
            </div>
            <div className="border-t pt-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between py-2">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;