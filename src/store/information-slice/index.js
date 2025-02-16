import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/endpoint";

// Thunk untuk mengambil data banner
export const fetchBanners = createAsyncThunk(
  "information/fetchBanners",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINT.GET_BANNER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk untuk mengambil data services
export const fetchServices = createAsyncThunk(
  "information/fetchServices",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINT.GET_SERVICES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const informationSlice = createSlice({
  name: "information",
  initialState: {
    banners: [],
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchBanners
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchServices
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default informationSlice.reducer;
