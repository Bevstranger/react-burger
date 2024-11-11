import { configureStore } from "@reduxjs/toolkit";
import { ingSlice } from "./ingredientsSlice";
import { constructSlice } from "./constructSlice";
import { ingredientsDetailsSlice } from "./ingrenietsDetailsSlice";




const store = configureStore({
    reducer: {
        ing: ingSlice.reducer,
        construct: constructSlice.reducer,
        ingredientsDetails: ingredientsDetailsSlice.reducer
        
    }, 
    
});

export default store