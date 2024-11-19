import { CreditCard, Loader } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../features/order/order';
import { setPaymentIntent } from '../features/payment_gateway/payment_gateway';
import { clearCart } from '../features/shopping_car/Shopping_car';
import { RootState } from '../store';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum: number, item: { product: { price: number; }; quantity: number; }) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderId = Math.random().toString(36).substr(2, 9);
    
    // Create order
    dispatch(createOrder({
      id: orderId,
      items: cartItems,
      total,
      status: 'processing',
      createdAt: new Date().toISOString(),
    }));

    // Create payment intent
    dispatch(setPaymentIntent({
      id: Math.random().toString(36).substr(2, 9),
      amount: total,
      status: 'succeeded',
      orderId,
    }));

    // Clear cart
    dispatch(clearCart());
    setLoading(false);
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pago</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>
          {cartItems.map((item: { product: { id: any; name: any; price: number; }; quantity: number; }) => (
            <div key={item.product.id} className="flex justify-between py-2">
              <span>{item.product.name} x {item.quantity}</span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Detalles de Pago</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Tarjeta
              </label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Vencimiento
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pagar {formatPrice(total)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;