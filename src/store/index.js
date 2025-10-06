import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import heroesReducer from "./slices/heroesSlice";


const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    heroes: heroesReducer, // Example reducer
  },
});

export default store;