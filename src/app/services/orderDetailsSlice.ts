import { BASE_URL } from '../api/api';
import { resetIngredients } from './constructSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './api/auth';

export interface IOrderInfo {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export const initialState = { 
  orders: [], 
  status: 'idle', 
  error: null 
};

export const orderDetailsApi = createApi({
	reducerPath: 'orderDetailsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders,
	}),
	endpoints: (builder) => ({
		postOrder: builder.mutation<IOrderInfo, string[]>({
			query: (orderDetails) => ({
				url: '/orders',
				method: 'POST',
				body: { ingredients: orderDetails },
			}),

			async onQueryStarted(orderDetails, { dispatch, queryFulfilled }) {
				await queryFulfilled;
				dispatch(resetIngredients());
			},
		}),
	}),
});

export const { usePostOrderMutation } = orderDetailsApi;
