import { BASE_URL } from '../../api/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './auth';
export const ws = createApi({
	reducerPath: 'wsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders,
	}),
	endpoints: (builder) => ({
		getOrders: builder.query<TOrdersResponse, void>({
			query: () => {
				return `/orders`;
			},
			async onCacheEntryAdded(
				arg,
				{ cacheDataLoaded, cacheEntryRemoved, updateCachedData }
			) {
				const websocket = new WebSocket(
					'wss://norma.nomoreparties.space/orders?token=' +
						localStorage.getItem('accessToken')?.split(' ')[1]
				);
				console.log(websocket, 'websocket');
				try {
					await cacheDataLoaded;

					const listener = (event: MessageEvent) => {
						const data = JSON.parse(event.data);
						console.log(data, 'Apidata');

						updateCachedData((draft) => {
							draft.orders = data.orders;
							draft.total = data.total;
							draft.totalToday = data.totalToday;
						});
					};

					websocket.addEventListener('message', listener);
				} catch {}

				await cacheEntryRemoved;

				websocket.close();
			},
		}),
		getOrdersAll: builder.query<TOrdersResponse, void>({
			query: () => {
				return `/orders/all`;
			},
			async onCacheEntryAdded(
				arg,
				{ cacheDataLoaded, cacheEntryRemoved, updateCachedData }
			) {
				const websocket = new WebSocket(
					'wss://norma.nomoreparties.space/orders/all'
				);
				console.log(websocket, 'websocket');
				try {
					await cacheDataLoaded;

					const listener = (event: MessageEvent) => {
						const data = JSON.parse(event.data);

						updateCachedData((draft) => {
							draft.orders = data.orders;
							draft.total = data.total;
							draft.totalToday = data.totalToday;
						});
					};

					websocket.addEventListener('message', listener);
				} catch {}

				await cacheEntryRemoved;

				websocket.close();
			},
		}),
	}),
});

function isMessage(data: any): data is { channel: string } {
	return typeof data === 'object' && 'channel' in data;
}

export const { useGetOrdersQuery, useGetOrdersAllQuery } = ws;

export type TOrder = {
	_id: string;
	ingredients: string[];
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
};

export type TOrdersResponse = {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};
