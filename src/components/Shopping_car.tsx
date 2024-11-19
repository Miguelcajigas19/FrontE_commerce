import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../features/shopping_car/Shopping_car';
import { RootState } from '../store';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ShoppingCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum: number, item: { product: { price: number; }; quantity: number; }) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Tu carrito está vacío</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Carrito de Compras</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex items-center py-4 border-b">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.product.name}
              </h3>
              <p className="text-gray-600">{formatPrice(item.product.price)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(updateQuantity({
                  id: item.product.id,
                  quantity: Math.max(1, item.quantity - 1)
                }))}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(updateQuantity({
                  id: item.product.id,
                  quantity: Math.min(item.product.stock, item.quantity + 1)
                }))}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-800">
            Total: {formatPrice(total)}
          </div>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;