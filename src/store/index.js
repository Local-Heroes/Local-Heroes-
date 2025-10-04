import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
  },
});

export default store;