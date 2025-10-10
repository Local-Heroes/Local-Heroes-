import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// TODO: Implement checkAuthStatus thunk
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
  
    try {
    const token = localStorage.getItem("token");
      // if (!token) {
      //   return rejectWithValue({ message: "No token found" });
      // }
    const response = await axios.get(`${BASE_URL}/users/me`, {
     headers: {
    Authorization: `Bearer ${token}`,
  },
});

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Network Error" });
      }
    }
  }
);

// TODO: Implement login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
   
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        }); 
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: "Network Error" });
        }
      }
   
  }
);

// TODO: Implement register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    console.log("Registering user with data:", userData);
 
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      return response.data;
  
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Network Error" });
      }
    }
  }
);

// TODO: Implement logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
 
    try {
      await axios.post(`${BASE_URL}/auth/logout`);
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Network Error" });
      }
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading:false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder;
    // TODO: Add cases for checkAuthStatus
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(checkAuthStatus.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });

    // TODO: Add cases for login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.user ? action.payload.user.message : action.error.message;
      console.log("Login error:", state.error);
    });
    // TODO: Add cases for register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.user ? action.payload.message : action.error.message;

    });
    // TODO: Add cases for logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
