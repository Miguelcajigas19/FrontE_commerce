import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/order/order';
import paymentReducer from '../features/payment_gateway/payment_gateway';
import productReducer from '../features/product/product';
import cartReducer from '../features/shopping_car/Shopping_car';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;