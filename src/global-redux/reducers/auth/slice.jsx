import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  internalResetPassword,
  updateUserName,
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
  user: JSON.parse(localStorage.getItem("user")) || [],
  authSuccess: false,
  // Internal Reset Password
  internalResetPasswordSuccess: false,
  // Internal Reset Password
  userNameUpdateSuccess: false,
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

export const setupUpdateUserName = createAsyncThunk(
  "auth/updateUserName",
  async (data, thunkAPI) => {
    return updateUserName(data, thunkAPI);
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
    resetUpdateUserNameSuccess: (state) => {
      state.userNameUpdateSuccess = false;
    },
    updateUserState: (state, action) => {
      state.user = [{ ...state?.user[0], name: action.payload }];
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(setupRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerSuccess = !action.error;
        if (!action.error) {
          state.registerName = "";
          state.registerEmail = "";
          state.registerPassword = "";
          state.registerConfirmPassword = "";
          state.registerDesignation = "";
          state.registerReportingToEmail = "";
          state.registerCreatedByEmail = "";
          toast.success("Register success please login");
        }
      })
      .addCase(setupRegisterUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Login User
    builder
      .addCase(setupLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginEmail = "";
        state.loginPassword = "";
        state.user = [
          {
            name: action.payload?.data?.userId?.name,
            token: action.payload?.data?.jwt,
            email: action.payload?.data?.email,
            company: action.payload?.data?.userId?.company,
            id: action.payload?.data?.userId?.id,
            userId: action.payload?.data?.userId,
          },
        ];
        localStorage.setItem(
          "user",
          JSON.stringify([
            {
              name: action.payload?.data?.userId?.name,
              token: action.payload?.data?.jwt,
              email: action.payload?.data?.email,
              company: action.payload?.data?.userId?.company,
              id: action.payload?.data?.userId?.id,
              userId: action.payload?.data?.userId,
            },
          ])
        );
        state.authSuccess = true;
        toast.success("Login Success Redirecting!");
      })
      .addCase(setupLoginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Forget Password
    builder
      .addCase(setupForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupForgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgetPasswordEmail = "";
        toast.success("Please check your email to change password");
      })
      .addCase(setupForgetPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      })
      .addCase(setupResetPassword.pending, (state) => {
        state.loading = true;
      });
    // Reset Password
    builder
      .addCase(setupResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
        toast.success("Password reset successfully please login");
      })
      .addCase(setupResetPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Internal Reset Password
    builder
      .addCase(setupInternalResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupInternalResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.internalResetPasswordSuccess = true;
        toast.success("Password reset successfully");
      })
      .addCase(setupInternalResetPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update User Name
    builder
      .addCase(setupUpdateUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateUserName.fulfilled, (state) => {
        state.loading = false;
        state.userNameUpdateSuccess = true;
        toast.success("User Name Updated successfully");
      })
      .addCase(setupUpdateUserName.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {
  changeAuthUser,
  changeAuthState,
  resetAuthValues,
  resetRegisterSuccess,
  resetResetPasswordSuccess,
  resetInternalResetPasswordSuccess,
  updateUserState,
  resetUpdateUserNameSuccess,
} = slice.actions;

export default slice.reducer;
