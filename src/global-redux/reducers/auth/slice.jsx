import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  internalResetPassword,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  // Login States
  loginEmail: "",
  loginPassword: "",
  // Register States
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerConfirmPassword: "",
  registerDesignation: "",
  registerCreatedByEmail: "",
  registerReportingToEmail: "",
  registerSuccess: false,
  // Forget Password State
  forgetPasswordEmail: "",
  // Reset Password States
  resetPassword: "",
  resetConfirmPassword: "",
  resetPasswordSuccess: "",
  // Common States
  loading: false,
  user: [],
  authSuccess: false,
  // Internal Reset Password
  internalResetPasswordSuccess: false,
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

export const setupInternalResetPassword = createAsyncThunk(
  "auth/internalResetPassword",
  async (data, thunkAPI) => {
    return internalResetPassword(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthUser: (state, action) => {
      state.user = action.payload;
    },
    changeAuthState: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    resetAuthValues: (state) => {
      state.authSuccess = false;
    },
    resetRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    resetResetPasswordSuccess: (state) => {
      state.resetPasswordSuccess = false;
    },
    resetInternalResetPasswordSuccess: (state) => {
      state.internalResetPasswordSuccess = false;
    },
  },
  extraReducers: {
    // Register
    [setupRegisterUser.pending]: (state) => {
      state.loading = true;
    },
    [setupRegisterUser.fulfilled]: (state) => {
      state.loading = false;
      state.registerSuccess = true;
      state.registerName=""
      state.registerEmail = "";
      state.registerPassword = "";
      state.registerConfirmPassword = "";
      state.registerDesignation=""
      state.registerReportingToEmail=""
      state.registerCreatedByEmail=""
      toast.success("Register success please login");
    },
    [setupRegisterUser.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },

    // Login
    [setupLoginUser.pending]: (state) => {
      state.loading = true;
    },
    [setupLoginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loginEmail = "";
      state.loginPassword = "";
      state.user = [
        {
          token: payload?.data?.jwt,
          email: payload?.data?.email,
        },
      ];
      state.authSuccess = true;
      toast.success("Login Success Redirecting!");
    },
    [setupLoginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Forgot Password
    [setupForgetPassword.pending]: (state) => {
      state.loading = true;
    },
    [setupForgetPassword.fulfilled]: (state) => {
      state.loading = false;
      state.forgetPasswordEmail = "";
      toast.success("Please check your email to change password");
    },
    [setupForgetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Reset Password
    [setupResetPassword.pending]: (state) => {
      state.loading = true;
    },
    [setupResetPassword.fulfilled]: (state) => {
      state.loading = false;
      state.resetPasswordSuccess = true;
      toast.success("Password reset successfully please login");
    },
    [setupResetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Internal Reset Password
    [setupInternalResetPassword.pending]: (state) => {
      state.loading = true;
    },
    [setupInternalResetPassword.fulfilled]: (state) => {
      state.loading = false;
      state.internalResetPasswordSuccess = true;
      toast.success("Password reset successfully");
    },
    [setupInternalResetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const {
  changeAuthUser,
  changeAuthState,
  resetAuthValues,
  resetRegisterSuccess,
  resetResetPasswordSuccess,
  resetInternalResetPasswordSuccess,
} = slice.actions;

export default slice.reducer;
