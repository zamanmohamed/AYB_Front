import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PORT from "../../port";

const API_URL = `${PORT}/api/transaction`;

// Fetch Transactions (Normal)
export const fetchProfitLossCompany = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await axios.get(`${API_URL}/profit-loss/company`);
    return response.data;
  }
);

// Fetch Transactions with Search & Filters
export const fetchFilteredTransactions = createAsyncThunk(
  "transactions/fetchFilteredTransactions",
  async ({ page = 1, limit = 20, startDate, endDate, searchText }) => {
    const params = { page, limit };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (searchText) params.searchText = searchText;

    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  }
);

// Create Transaction
export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (transaction) => {
    const response = await axios.post(`${API_URL}/create`, transaction);
    return response.data;
  }
);

// Delete Transaction
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// Update Transaction
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, updatedData }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data.transaction;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [],
    pagination: {},
    loading: false,
    error: null,
    profitOrLoss: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchFilteredTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchFilteredTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.data.push(action.payload.transaction);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.data = state.data.filter((tx) => tx._id !== action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (tx) => tx._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(fetchProfitLossCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfitLossCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.profitOrLoss = action.payload.data;
        // state.pagination = action.payload.pagination;
      })
      .addCase(fetchProfitLossCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
