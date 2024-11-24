import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../api/api';

const initialState = {
  order: null,
  orderRequest: false,
  orderRequestError: false,
};

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (orderDetails) => {
    const body = {
      ingredients: orderDetails,
    };
    return await postData('https://norma.nomoreparties.space/api/orders', body);
  }
);

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.orderRequest = true;
      state.orderRequestError = false;
    }),
      builder.addCase(postOrder.fulfilled, (state, action) => {
        console.log('API Response:', action.payload);
        if (action.payload && action.payload.order) {
          state.order = action.payload.order.number;
        } else {
          state.orderRequestError = true;
        }
        state.orderRequest = false;
      });
    builder.addCase(postOrder.rejected, (state) => {
      state.orderRequest = false;
      state.orderRequestError = true;
    });
  },
});

export const { getIngredientsOrder } = orderDetailsSlice.actions;
