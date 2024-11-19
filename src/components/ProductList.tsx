import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/shopping_car/Shopping_car';
import { RootState } from '../store';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductList = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={() => dispatch(addToCart(product))}
                disabled={product.stock === 0}
                className={`flex items-center px-4 py-2 rounded-md ${
                  product.stock > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {product.stock} unidades disponibles
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;