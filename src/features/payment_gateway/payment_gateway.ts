import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentIntent } from '../../types';

interface PaymentState {
  currentPayment: PaymentIntent | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  currentPayment: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment_gateway',
  initialState,
  reducers: {
    setPaymentIntent: (state: { currentPayment: any; }, action: PayloadAction<PaymentIntent>) => {
      state.currentPayment = action.payload;
    },
    clearPaymentIntent: (state: { currentPayment: null; }) => {
      state.currentPayment = null;
    },
    setLoading: (state: { loading: any; }, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: { error: any; }, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPaymentIntent, clearPaymentIntent, setLoading, setError } = paymentSlice.actions;
export default paymentSlice.reducer;