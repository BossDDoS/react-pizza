import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';
import { getCartFromLocalStoragets } from '../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

const initialState: CartSliceState = getCartFromLocalStoragets();

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

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;

        state.totalPrice = calcTotalPrice(state.items);
      }

      if (findItem.count === 0) {
        state.items = state.items.filter((obj) => obj !== findItem);
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
