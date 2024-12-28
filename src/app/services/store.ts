import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ingSlice } from './ingredientsSlice';
import { constructSlice } from './constructSlice';
import { ingredientsDetailsSlice } from './ingrenietsDetailsSlice';
import { orderDetailsApi } from './orderDetailsSlice';
import { authApi } from './api/auth';
import { ws } from './api/ws';

const store = configureStore({
	reducer: {
		ing: ingSlice.reducer,
		construct: constructSlice.reducer,
		ingredientsDetails: ingredientsDetailsSlice.reducer,

		[authApi.reducerPath]: authApi.reducer,
		[orderDetailsApi.reducerPath]: orderDetailsApi.reducer,
		[ws.reducerPath]: ws.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			orderDetailsApi.middleware,
			ws.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
