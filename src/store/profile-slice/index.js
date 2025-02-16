import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/endpoint";

// Initial State
const initialState = {
  isLoading: false,
  profile: null,
};

// Thunk untuk mengambil profil
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINT.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data profil."
      );
    }
  }
);

// Thunk untuk mengupdate Profile Image
export const updateProfileImage = createAsyncThunk(
  "profile/updateProfileImage",
  async ({ token, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put(
        API_ENDPOINT.PUT_UPDATE_IMAGE_PROFILE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengupdate foto profil."
      );
    }
  }
);

// Thunk untuk mengupdate profil
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ token, first_name, last_name }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        API_ENDPOINT.PUT_UPDATE_PROFILE,
        {
          first_name,
          last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengupdate profil."
      );
    }
  }
);


// Slice untuk Profile
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        // alert(action.payload);
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        // alert("Profil berhasil diperbarui!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        // alert(action.payload);
      })
      // Update Profile Image
      .addCase(updateProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = {
          ...state.profile,
          profile_image: action.payload.profile_image,
        };
        // alert("Foto profil berhasil diperbarui!");
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        // alert(action.payload);
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
