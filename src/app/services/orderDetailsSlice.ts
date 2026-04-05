import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createOrder, getOrders } from '../api/api';
import { resetIngredients } from './constructSlice';

export interface IOrderInfo {
	id: number;
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export const orderDetailsApi = createApi({
	reducerPath: 'orderDetailsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '' }),
	endpoints: (builder) => ({
		postOrder: builder.mutation<IOrderInfo, string[]>({
			queryFn: async (ingredients, { dispatch }) => {
				try {
					const order = await createOrder(ingredients);
					dispatch(resetIngredients());
					return {
						data: {
							id: order.id,
							name: order.name || '',
							order: { number: order.id },
							success: true,
						},
					};
				} catch (error) {
					return {
						error: {
							status: 500,
							data: (error as Error).message,
						},
					};
				}
			},
		}),
		getOrders: builder.query<any[], void>({
			queryFn: async () => {
				try {
					const orders = await getOrders();
					return { data: orders };
				} catch (error) {
					return {
						error: {
							status: 500,
							data: (error as Error).message,
						},
					};
				}
			},
		}),
	}),
});

export const { usePostOrderMutation, useGetOrdersQuery } = orderDetailsApi;
