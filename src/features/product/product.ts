import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [
    {
      id: '1',
      name: 'Audífonos Inalámbricos Premium',
      price: 120000,
      description: 'Audífonos inalámbricos de alta calidad con cancelación de ruido',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      category: 'Electrónicos',
      stock: 10,
    },
    {
      id: '2',
      name: 'Reloj Inteligente Pro',
      price: 220000,
      description: 'Reloj inteligente avanzado con funciones de seguimiento de salud',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
      category: 'Electrónicos',
      stock: 15,
    },
    {
      id: '3',
      name: 'Kit de Cámara Profesional',
      price: 3899900,
      description: 'Cámara mirrorless de fotograma completo con capacidades de video 4K',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
      category: 'Fotografía',
      stock: 5,
    },
    {
      id: '4',
      name: 'Portátil Gamer Pro',
      price: 5699900,
      description: 'Portátil gaming de alto rendimiento con gráficos RTX',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
      category: 'Computadores',
      stock: 8,
    },
    {
      id: '5',
      name: 'Mouse Gamer Inalámbrico',
      price: 200000,
      description: 'Mouse gaming inalámbrico ultra-responsivo con iluminación RGB',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
      category: 'Gaming',
      stock: 20,
    },
    // Nuevos productos
    {
      id: '6',
      name: 'Tablet Profesional',
      price: 2299900,
      description: 'Tablet de alta gama para diseñadores y artistas digitales',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
      category: 'Electrónicos',
      stock: 12,
    },
    {
      id: '7',
      name: 'Consola de Videojuegos 4K',
      price: 3400000,
      description: 'Consola de última generación con soporte para juegos en 4K',
      image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800',
      category: 'Gaming',
      stock: 7,
    },
    {
      id: '8',
      name: 'Micrófono Profesional USB',
      price: 349900,
      description: 'Micrófono de condensador USB para streaming y podcasting',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      category: 'Audio',
      stock: 15,
    }
  ],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state: { items: any; }, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    updateStock: (state: { items: any[]; }, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.stock -= action.payload.quantity;
      }
    },
  },
});

export const { setProducts, updateStock } = productSlice.actions;
export default productSlice.reducer;