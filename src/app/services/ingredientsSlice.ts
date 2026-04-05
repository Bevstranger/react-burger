import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../api/api';

export interface IIngredientState {
	data: IDataItem[];
	error: boolean;
	fetching: boolean;
	fetched: boolean;
}

export interface IDataItem {
	id: number;
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v?: number;
}

export const ingredientsRequest = createAsyncThunk(
	'ing/ingredientsRequest',
	async () => {
		const data = await getIngredients();
		return data.map((item) => ({
			...item,
			_id: String(item.id),
		}));
	}
);

const initialState: IIngredientState = {
	data: [],
	error: false,
	fetching: false,
	fetched: false,
};

export const ingSlice = createSlice({
	name: 'ing',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(ingredientsRequest.fulfilled, (state, action) => {
			state.data = action.payload;
			state.fetching = false;
			state.fetched = true;
		}),
			builder.addCase(ingredientsRequest.pending, (state) => {
				state.fetching = true;
				state.fetched = false;
			}),
			builder.addCase(ingredientsRequest.rejected, (state) => {
				state.fetching = false;
				state.fetched = false;
				state.error = true;
			});
	},
});
