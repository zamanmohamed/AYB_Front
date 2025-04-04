import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PORT from "../../port";

const API_URL = `${PORT}/api/customer`;

// Fetch Customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async ({ page = 1, limit = 10, startDate, endDate, searchText }) => {
    const params = { page, limit };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (searchText) params.searchText = searchText;
    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  }
);

// Create Customer
export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (customer) => {
    const response = await axios.post(`${API_URL}/create`, customer);
    return response.data;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: { data: [],pagination: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.data.push(action.payload.customer);
      });
  },
});

export default customerSlice.reducer;
