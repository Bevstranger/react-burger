import { configureStore } from '@reduxjs/toolkit';
import { ingSlice } from './ingredientsSlice';
import { constructSlice } from './constructSlice';
import { ingredientsDetailsSlice } from './ingrenietsDetailsSlice';
import { orderDetailsSlice } from './orderDetailsSlice';
import { authApi } from './api/auth';

const store = configureStore({
  reducer: {
    ing: ingSlice.reducer,
    construct: constructSlice.reducer,
    ingredientsDetails: ingredientsDetailsSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
