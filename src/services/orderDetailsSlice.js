import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, BASE_URL } from '../api/api';
import { resetIngredients } from './constructSlice';

const initialState = {
  order: null,
  orderRequest: false,
  orderRequestError: false,
};

// Создаем thunk, который будет отправлять пост запрос на сервер
// с данными о заказе (ingredients)
export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (orderDetails, {dispatch}) => {
    const body = {
      ingredients: orderDetails,
    };
    // после отправки запроса очищаем ингредиенты в конструкторе
    
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
    // pending - ожидание ответа от сервера
    builder.addCase(postOrder.pending, (state) => {
      state.orderRequest = true;
      state.orderRequestError = false;
    }),
      // fulfilled - ответ от сервера получен
      builder.addCase(postOrder.fulfilled, (state, action) => {
        console.log('API Response:', action.payload);
        // если ответ от сервера содержит номер заказа
        if (action.payload && action.payload.order) {
          // то кладем его в стейт
          state.order = action.payload.order.number;
          
        } else {
          // если номер заказа не пришел, то кладем ошибку
          state.orderRequestError = true;
        }
        // и убираем флаг ожидания
        state.orderRequest = false;
      });
    // rejected - ошибка при отправке запроса
    builder.addCase(postOrder.rejected, (state) => {
      state.orderRequest = false;
      state.orderRequestError = true;
    });
  },
});

