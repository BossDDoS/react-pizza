import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryId, sortProperty, order, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://66641d59932baf9032aa0642.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}${search}&sortBy=${sortProperty}&order=${order}`,
    );

    return data;
  },
);
