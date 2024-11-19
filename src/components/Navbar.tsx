import { Package, ShoppingCart, Store } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">
              E_Commerce<span className="text-blue-600">Tecnology</span>
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/orders" className="flex items-center text-gray-600 hover:text-gray-800">
              <Package className="w-6 h-6 mr-1" />
              <span>Pedidos</span>
            </Link>
            
            <Link to="/cart" className="flex items-center text-gray-600 hover:text-gray-800">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="ml-1">Carrito</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;