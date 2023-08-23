import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import {favReducer} from "./slices/favouriteSlice"
import { addressReducer } from "./slices/addressSlice";


const store = configureStore({
    reducer:{cartReducer,favReducer,addressReducer}

})
export default store;