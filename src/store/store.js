import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import profileSlice from "./profile-slice";
import informationSlice from "./information-slice";
import transactionSlice from "./transaction-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileSlice,
    information: informationSlice,
    transaction: transactionSlice,

  },
});

export default store;