import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";


//configure dfault
axios.defaults.withCredentials = true;

//login user

export const loginUser = createAsyncThunk (
    "auth/loginUser",
    async () => {
        try{
           const response = await axios.post(`${BASE_URL}/auth/login`)
           return response.data

        }catch (error) {
            console.log(error)
        }
        
    }
);








//initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
};



const authSlice = createSlice ({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder

        //add login user cases
         .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    }
})


export default authSlice.reducer