import {
	ingSlice,
	ingredientsRequest,
	IIngredientState,
	IDataItem,
} from './ingredientsSlice';

describe('ингредиенты', () => {
	const mockIngredients: IDataItem[] = [
		{
			_id: '1',
			name: 'Булка',
			type: 'bun',
			proteins: 100,
			fat: 100,
			carbohydrates: 100,
			calories: 100,
			price: 100,
			image: 'image',
			image_mobile: 'image_mobile',
			image_large: 'image_large',
			__v: 0,
		},
	];
	const initialState: IIngredientState = {
		data: [],
		error: false,
		fetching: false,
		fetched: false,
	};
	it('начальное состояние', () => {
		expect(ingSlice.reducer(undefined, { type: 'unknown' })).toEqual({
			data: [],
			error: false,
			fetching: false,
			fetched: false,
		});
	});

	describe('экшен ingredientsRequest', () => {
		it('обработка pending', () => {
			const action = { type: ingredientsRequest.pending.type };
			const state = ingSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				fetching: true,
				fetched: false,
			});
		});

		it('обработка fulfilled', () => {
			const action = {
				type: ingredientsRequest.fulfilled.type,
				payload: mockIngredients,
			};
			const state = ingSlice.reducer(initialState, action);
			expect(state).toEqual({
				data: mockIngredients,
				error: false,
				fetching: false,
				fetched: true,
			});
		});

		it('обработка rejected', () => {
			const action = { type: ingredientsRequest.rejected.type };
			const state = ingSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				error: true,
				fetching: false,
				fetched: false,
			});
		});
	});
});
