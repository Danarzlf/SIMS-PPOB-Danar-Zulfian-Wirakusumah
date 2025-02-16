import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/endpoint";

const initialState = {
  isLoading: false,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/registration",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_ENDPOINT.AUTH_REGISTRATION,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_ENDPOINT.AUTH_LOGIN,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data?.token || null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
