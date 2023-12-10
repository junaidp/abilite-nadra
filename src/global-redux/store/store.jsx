import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../reducers/common/slice";
import authReducer from "../reducers/auth/slice";
export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
  },
});
