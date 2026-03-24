import { ingredientsDetailsSlice } from './ingrenietsDetailsSlice';
import { setIngredientsDetails } from './ingrenietsDetailsSlice';

describe('ингредиент детали', () => {
	it('Начальное состояние соответствует ожидаемому', () => {
		// Проверяем, что начальное состояние соответствует заданному
		expect(ingredientsDetailsSlice.reducer(undefined, { type: '' })).toEqual({
			name: '',
			calories: 0,
			proteins: 0,
			carbohydrates: 0,
			fat: 0,
			image_large: '',
		});
	});

	it('Редюсер обновляет состояние при вызове setIngredientsDetails', () => {
		// Моковые данные для теста
		const mockIngredient = {
			name: 'Булка',
			calories: 250,
			proteins: 10,
			carbohydrates: 40,
			fat: 5,
			image_large: 'bulka.png',
		};

		// Вызываем редюсер с экшеном setIngredientsDetails и моковыми данными
		const result = ingredientsDetailsSlice.reducer(
			undefined,
			setIngredientsDetails(mockIngredient)
		);

		// Проверяем, что состояние полностью заменено на переданные данные
		expect(result).toEqual(mockIngredient);
	});

	it('Редюсер корректно обрабатывает частичные данные', () => {
		// Моковые данные с частичным набором полей
		const partialMockIngredient = {
			name: 'Соус',
			calories: 100,
			image_large: 'sous.png',
		};

		const expectedState = {
			...ingredientsDetailsSlice.getInitialState(), // Берём начальное состояние
			...partialMockIngredient, // Перезаписываем существующие поля
		};

		const result = ingredientsDetailsSlice.reducer(
			undefined,
			setIngredientsDetails(partialMockIngredient)
		);

		// Проверяем, что неизменённые поля остались с начальными значениями
		expect(result).toEqual({
			name: 'Соус',
			calories: 100,
			proteins: 0, // Значение из initialState
			carbohydrates: 0, // Значение из initialState
			fat: 0, // Значение из initialState
			image_large: 'sous.png',
		});
	});
});
