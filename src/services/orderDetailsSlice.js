import { createSlice } from "@reduxjs/toolkit";
import { postData } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    order: null,
    orderRequest: false,
    orderRequestError: false
};

export const postOrder = createAsyncThunk("order/postOrder", async (orderDetails) => {

    const body = {
        ingredients: orderDetails
    };
    const response = await postData("https://norma.nomoreparties.space/api/orders", body);
    return response;
});

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {
        
        
     },
     extraReducers: (builder) => {
        builder.addCase(postOrder.pending, (state) => {
            state.orderRequest = true;
            state.orderRequestError = false;
        }),
        builder.addCase(postOrder.fulfilled, (state, action) => {
            
            state.order = action.payload.order.number;
            
            state.orderRequest = false;
            state.orderRequestError = false;
            
        }),
        builder.addCase(postOrder.rejected, (state) => {
            state.orderRequest = false;
            state.orderRequestError = true;
        })
     }
});

export const { getIngredientsOrder } = orderDetailsSlice.actions;