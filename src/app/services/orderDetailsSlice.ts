import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, BASE_URL } from '../api/api';
import { resetIngredients } from './constructSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './api/auth';

interface IOrderDetailsState {
	order: IOrderInfo | null;
	orderRequest: boolean;
	orderRequestError: boolean;
}

// {
//     "success": true,
//     "name": "Space бургер",
//     "order": {
//         "number": 1448
//     }
// }

interface IOrderInfo {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

const initialState: IOrderDetailsState = {
	order: null,
	orderRequest: false,
	orderRequestError: false,
};

// export const postOrder = createAsyncThunk(
// 	'order/postOrder',
// 	async (orderDetails: string[], { dispatch }) => {
// 		const body = {
// 			ingredients: orderDetails,
// 		};
// 		return await postData(`${BASE_URL}/orders`, body).then((response) => {
// 			dispatch(resetIngredients());
// 			return response;
// 		});
// 	}
// );

// export const orderDetailsSlice = createSlice({
// 	name: 'orderDetails',
// 	initialState,
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder.addCase(postOrder.pending, (state) => {
// 			state.orderRequest = true;
// 			state.orderRequestError = false;
// 		}),
// 			builder.addCase(postOrder.fulfilled, (state, action) => {
// 				if (action.payload && action.payload.order) {
// 					state.order = action.payload;
// 				} else {
// 					state.orderRequestError = true;
// 				}
// 				state.orderRequest = false;
// 			});
// 		builder.addCase(postOrder.rejected, (state) => {
// 			state.orderRequest = false;
// 			state.orderRequestError = true;
// 		});
// 	},
// });

export const orderDetailsApi = createApi({
	reducerPath: 'orderDetailsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders,
	}),
	endpoints: (builder) => ({
		postOrder: builder.mutation<IOrderInfo, string[] >({
			query: (orderDetails) => ({
				url: '/orders',
				method: 'POST',
				body: orderDetails,
			}),
		}),
	}),
});

export const{ usePostOrderMutation } = orderDetailsApi;