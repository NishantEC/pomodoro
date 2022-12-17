import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Features/SessionSlice"

export const store = configureStore(
    {
        reducer:{
            session:sessionReducer,
        }
        
    }
)