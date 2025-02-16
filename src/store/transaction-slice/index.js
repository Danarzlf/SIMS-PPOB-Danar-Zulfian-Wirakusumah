import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk fetch riwayat transaksi
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async ({ token, offset = 0, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 0) {
        return {
          records: response.data.data.records,  // Data riwayat transaksi
          offset: offset,  // Offset yang digunakan untuk pagination
        };
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Thunk untuk fetch saldo
export const fetchBalance = createAsyncThunk(
  "transaction/fetchBalance",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 0) {
        return response.data.data.balance;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk untuk Top Up
export const topUpBalance = createAsyncThunk(
  "transaction/topUpBalance",
  async ({ token, amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        { top_up_amount: amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 0) {
        return response.data.data.balance;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Thunk untuk melakukan transaksi PULSA
export const doTransaction = createAsyncThunk(
  "transaction/doTransaction",
  async ({ token, serviceCode }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          service_code: serviceCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 0) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    history: [],
    balance: null,
    loading: false,
    error: null,
    transactionResult: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      
      // Cek apakah ini fetch pertama kali (offset 0)
      if (action.payload.offset === 0) {
        state.history = action.payload.records; // Ganti data history
      } else {
        state.history = [...state.history, ...action.payload.records]; // Tambah data untuk load more
      }
    })
    .addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(doTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.transactionResult = null;
      })
      .addCase(doTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionResult = action.payload;
      })
      .addCase(doTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;