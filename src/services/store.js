import { configureStore } from "@reduxjs/toolkit";
import { ingSlice } from "./ingredientsSlice";
import { constructSlice } from "./constructSlice";
import { ingredientsDetailsSlice } from "./ingrenietsDetailsSlice";
import { orderDetailsSlice } from "./orderDetailsSlice";




const store = configureStore({
    reducer: {
        ing: ingSlice.reducer,
        construct: constructSlice.reducer,
        ingredientsDetails: ingredientsDetailsSlice.reducer,
        orderDetails: orderDetailsSlice.reducer
        
    }, 
    
});

export default store