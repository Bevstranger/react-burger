import { createSlice } from "@reduxjs/toolkit";

export const constructSlice = createSlice({
    name: "construct",
    initialState: {
        data: [],
        
    },
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === "bun") {
                const bunIndex = state.data.findIndex((item) => item.type === "bun");
                if (bunIndex !== -1) {
                    state.data[bunIndex] = action.payload;
                } else {
                    state.data.push(action.payload);
                }
            } else {
                state.data.push(action.payload);
            }
        },

        deleteIngredient: (state, action) => {

            console.log(state);
            state.data = state.data.filter((item) => item._id !== action.payload);
        },

        updateIngredients: (state, action) => {
            state.data = action.payload;
        },
    },
});


export const { addIngredient, deleteIngredient } = constructSlice.actions;
