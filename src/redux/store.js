import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customerSlice";
import transactionReducer from "./features/transactionSlice";

const store = configureStore({
  reducer: {
    customers: customerReducer,
    transactions: transactionReducer,
  },
});

export default store;

