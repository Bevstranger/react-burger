import { configureStore } from "@reduxjs/toolkit";
import { ingSlice } from "./ingredientsSlice";
import { constructSlice } from "./constructSlice";




const store = configureStore({
    reducer: {
        ing: ingSlice.reducer,
        construct: constructSlice.reducer
        
    }, 
    
});

export default store