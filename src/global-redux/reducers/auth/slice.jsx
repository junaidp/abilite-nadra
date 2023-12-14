import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userLoggedIn: false,
  forgotPasswordResponseSuccess: false,
  resetPasswordResponseSuccess: false,
  authError: false,
  user: [],
};

export const setupRegisterUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    return registerUser(data, thunkAPI);
  }
);

export const setupLoginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    return loginUser(data, thunkAPI);
  }
);

export const setupForgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, thunkAPI) => {
    return forgetPassword(data, thunkAPI);
  }
);

export const setupResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    return resetPassword(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    changeForgotPasswordResponseSuccess: (state, action) => {
      state.forgotPasswordResponseSuccess = action.payload;
    },
    changeResetPasswordResponseSuccess: (state, action) => {
      state.resetPasswordResponseSuccess = action.payload;
    },
    changeAuthErrorResponse: (state, action) => {
      state.authError = action.payload;
    },
    changeAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    // Register
    [setupRegisterUser.pending]: (state) => {
      state.loading = true;
    },
    [setupRegisterUser.fulfilled]: (state) => {
      state.loading = false;
      state.userLoggedIn = true;
    },
    [setupRegisterUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userLoggedIn = false;
      state.authError = true;
    },

    // Login
    [setupLoginUser.pending]: (state) => {
      state.loading = true;
    },
    [setupLoginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userLoggedIn = true;
      state.user = [
        {
          token: payload?.data?.jwt,
          firstname: payload?.data?.firstname,
          lastname: payload?.data?.lastname,
          email: payload?.data?.email,
        },
      ];
    },
    [setupLoginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userLoggedIn = false;
      state.authError = true;
    },
    // Forgot Password
    [setupForgetPassword.pending]: (state) => {
      state.loading = true;
    },
    [setupForgetPassword.fulfilled]: (state) => {
      state.loading = false;
      state.forgotPasswordResponseSuccess = true;
    },
    [setupForgetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.forgotPasswordResponseSuccess = false;
      state.authError = true;
    },
    // Reset Password
    [setupResetPassword.pending]: (state) => {
      state.loading = true;
    },
    [setupResetPassword.fulfilled]: (state) => {
      state.loading = false;
      state.resetPasswordResponseSuccess = true;
    },
    [setupResetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.resetPasswordResponseSuccess = false;
      state.authError = true;
    },
  },
});

export const {
  changeUserLoggedIn,
  changeForgotPasswordResponseSuccess,
  changeResetPasswordResponseSuccess,
  changeAuthErrorResponse,
  changeAuthUser,
} = slice.actions;

export default slice.reducer;
