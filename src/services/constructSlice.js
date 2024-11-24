import { createSlice } from '@reduxjs/toolkit';

export const constructSlice = createSlice({
  name: 'construct',
  initialState: {
    data: {
      buns: [],
      ingredients: [],
    },
  },
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.data.buns = [action.payload];
      } else {
        state.data.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action) => {
      state.data.ingredients = state.data.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    reorderIngredients: (state, action) => {
      const { from: dragIndex, to: hoverIndex } = action.payload;
      const ingredients = state.data.ingredients;
      const [dragItem] = ingredients.splice(dragIndex, 1);
      ingredients.splice(hoverIndex, 0, dragItem);
    },
  },
});

export const { addIngredient, deleteIngredient, reorderIngredients } =
  constructSlice.actions;
