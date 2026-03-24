import { constructSlice } from './constructSlice';

describe('constructSlice reducers', () => {
	const createTestItem = (id: string, type = 'ingredient') => ({
		_id: `mock_${id}`,
		id,
		name: `Ingredient ${id}`,
		type,
		proteins: 5,
		fat: 5,
		carbohydrates: 5,
		calories: 100,
		price: 100,
		image: 'image.jpg',
		image_mobile: 'image_mobile.jpg',
		image_large: 'image_large.jpg',
		__v: 0,
	});

	describe('addIngredient', () => {
		it('should add a bun to the buns array', () => {
			const initialState = {
				data: {
					buns: [],
					ingredients: [],
				},
			};

			const bun = createTestItem('1', 'bun');
			const nextState = constructSlice.reducer(
				initialState,
				constructSlice.actions.addIngredient(bun)
			);

			expect(nextState.data.buns).toEqual([bun]);
			expect(nextState.data.ingredients).toEqual([]);
		});
	});

	describe('deleteIngredient', () => {
		it('should remove an ingredient by id', () => {
			const initialState = {
				data: {
					buns: [],
					ingredients: [createTestItem('1'), createTestItem('2')],
				},
			};

			const nextState = constructSlice.reducer(
				initialState,
				constructSlice.actions.deleteIngredient('1')
			);

			expect(nextState.data.ingredients).toEqual([createTestItem('2')]);
		});
	});

	describe('reorderIngredients', () => {
		it('should reorder ingredients correctly', () => {
			const initialState = {
				data: {
					buns: [],
					ingredients: [
						createTestItem('1'),
						createTestItem('2'),
						createTestItem('3'),
					],
				},
			};

			const action = constructSlice.actions.reorderIngredients({
				from: 0,
				to: 2,
			});
			const nextState = constructSlice.reducer(initialState, action);

			expect(nextState.data.ingredients.map((i) => i.id)).toEqual([
				'2',
				'3',
				'1',
			]);
		});
	});

	describe('resetIngredients', () => {
		it('should reset all ingredients and buns', () => {
			const initialState = {
				data: {
					buns: [createTestItem('1', 'bun')],
					ingredients: [createTestItem('2')],
				},
			};

			const nextState = constructSlice.reducer(
				initialState,
				constructSlice.actions.resetIngredients()
			);

			expect(nextState.data.buns).toEqual([]);
			expect(nextState.data.ingredients).toEqual([]);
		});
	});
});
