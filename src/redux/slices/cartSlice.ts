import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  count: number;
  price: number;
  imageUrl: string;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const updateTotalPrice = (state: CartSliceState) => {
  return (state.totalPrice = state.items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      updateTotalPrice(state);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;

        updateTotalPrice(state);
      }

      if (findItem.count === 0) {
        state.items = state.items.filter((obj) => obj !== findItem);
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      updateTotalPrice(state);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
