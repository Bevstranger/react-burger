import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, BASE_URL } from '../api/api';
import { resetIngredients } from './constructSlice';

const initialState = {
  order: null,
  orderRequest: false,
  orderRequestError: false,
};

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (orderDetails, {dispatch}) => {
    const body = {
      ingredients: orderDetails,
    };
    return await postData(`${BASE_URL}/orders`, body).then(
      (response) => {
        dispatch(resetIngredients());
        return response
      }
    )
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

