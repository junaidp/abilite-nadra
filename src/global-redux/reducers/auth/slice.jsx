import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  internalResetPassword,
  updateUserName,
  generateQRCode,
  verifyQRCode,
  updateUser,
  logoutUser,
  landingCall,
  getSystemNotifications,
  saveCompany,
  getCurrentUser,
  saveCompanyLogo,
  saveUserLogo
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
  // Code Scanner
  qrCode: "",
  codeLoading: false,
  verifyCodeSuccess: false,
  disableTfaSuccess: false,
  // system notifications
  notificationLoading: false,
  notifications: [],
  userCompany: JSON.parse(localStorage.getItem("userCompany")) || {}
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

export const setupGetCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (data, thunkAPI) => {
    return getCurrentUser(data, thunkAPI);
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
export const setupGenerateQRCode = createAsyncThunk(
  "auth/generateQRCode",
  async (data, thunkAPI) => {
    return generateQRCode(data, thunkAPI);
  }
);
export const setupVerifyQRCode = createAsyncThunk(
  "auth/verifyQRCode",
  async (data, thunkAPI) => {
    return verifyQRCode(data, thunkAPI);
  }
);
export const setupUpdateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, thunkAPI) => {
    return updateUser(data, thunkAPI);
  }
);
export const setupLogoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (data, thunkAPI) => {
    return logoutUser(data, thunkAPI);
  }
);
export const setupLandingCall = createAsyncThunk(
  "auth/landingCall",
  async (data, thunkAPI) => {
    return landingCall(data, thunkAPI);
  }
);

export const setupGetSystemNotifications = createAsyncThunk(
  "auth/getSystemNotifications",
  async (data, thunkAPI) => {
    return getSystemNotifications(data, thunkAPI);
  }
);

export const setupSaveCompany = createAsyncThunk(
  "auth/saveCompany",
  async (data, thunkAPI) => {
    return saveCompany(data, thunkAPI);
  }
);

export const setupSaveCompanyLogo = createAsyncThunk(
  "auth/saveCompanyLogo",
  async (data, thunkAPI) => {
    return saveCompanyLogo(data, thunkAPI);
  }
);

export const setupSaveUserLogo = createAsyncThunk(
  "auth/saveUserLogo",
  async (data, thunkAPI) => {
    return saveUserLogo(data, thunkAPI);
  }
);


export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthUser: (state, action) => {
      state.user = action.payload;
    },
    handleChangeUserCompany: (state, action) => {
      state.userCompany = {
        ...state.userCompany,
        [action.payload.target.name]: action.payload.target.value
      }
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
      localStorage.setItem(
        "user",
        JSON.stringify([
          {
            ...state?.user[0],
            name: action.payload,
          },
        ])
      );
    },
    updateUserTfa: (state, action) => {
      state.user = [{ ...state?.user[0], tfa: action.payload }];
      localStorage.setItem(
        "user",
        JSON.stringify([
          {
            ...state?.user[0],
            tfa: action.payload,
          },
        ])
      );
    },
    resetVerifyCode: (state) => {
      state.verifyCodeSuccess = false;
    },
    resetTfaDisableAddSucess: (state) => {
      state.disableTfaSuccess = false;
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
        if (
          action.payload.message ===
          "Account Is Deactivated, Kindly Contact Administration."
        ) {
          toast.error("Account Is Deactivated, Kindly Contact Administration.");
          state.loading = false;
          return;
        }
        if (
          action.payload.data.userId.company[0].companyName ===
          "Beaconhouse Trial"
        ) {
          toast.error(
            "Your account has been deactivated, please contact support team."
          );
          state.loading = false;
          return;
        }
        state.loading = false;
        state.loginEmail = "";
        state.loginPassword = "";
        state.userCompany = action.payload?.data?.userId?.company[0] || {}
        localStorage.setItem("userCompany", JSON.stringify(action.payload?.data?.userId?.company[0]))
        state.user = [
          {
            tfa: action?.payload?.data?.userId?.tfa,
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
              tfa: action?.payload?.data?.userId?.tfa,
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
      })
      .addCase(setupLoginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Current User
    builder
      .addCase(setupGetCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userCompany = action.payload?.data?.userId?.company[0] || {}
        localStorage.setItem("userCompany", JSON.stringify(action.payload?.data?.userId?.company[0]))
        state.user = [
          {
            tfa: action?.payload?.data?.userId?.tfa,
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
              tfa: action?.payload?.data?.userId?.tfa,
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
      })
      .addCase(setupGetCurrentUser.rejected, (state, action) => {
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
    // QR Code Generator
    builder
      .addCase(setupGenerateQRCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGenerateQRCode.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.qrCode = payload;
      })
      .addCase(setupGenerateQRCode.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Verify Code
    builder
      .addCase(setupVerifyQRCode.pending, (state) => {
        state.codeLoading = true;
      })
      .addCase(setupVerifyQRCode.fulfilled, (state, { payload }) => {
        state.codeLoading = false;
        if (payload?.valid === true) {
          state.verifyCodeSuccess = true;
          toast.success("Two Factor Authentication Passed Successfully!");
        } else {
          toast.error("Code Not Valid");
        }
      })
      .addCase(setupVerifyQRCode.rejected, (state, action) => {
        state.codeLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update User
    builder
      .addCase(setupUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateUser.fulfilled, (state) => {
        state.loading = false;
        state.disableTfaSuccess = true;
        toast.success("Two Factor Authentication Disabled Successfully");
      })
      .addCase(setupUpdateUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Logout User
    builder
      .addCase(setupLogoutUser.fulfilled, (state) => {
        // toast.success("User Logged Out Successfully");
      })
      .addCase(setupLogoutUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Logout User
    builder
      .addCase(setupLandingCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupLandingCall.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setupLandingCall.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupGetSystemNotifications.pending, (state) => {
        state.notificationLoading = true;
      })
      .addCase(setupGetSystemNotifications.fulfilled, (state, { payload }) => {
        state.notificationLoading = false;
        state.notifications = payload?.data || [];
      })
      .addCase(setupGetSystemNotifications.rejected, (state, action) => {
        state.notificationLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupSaveCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userCompany = payload?.data
        localStorage.setItem("userCompany", JSON.stringify(payload?.data))

      })
      .addCase(setupSaveCompany.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupSaveCompanyLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveCompanyLogo.fulfilled, (state) => {
        state.loading = false;
        toast.success("Company Logo Updated Successfully")
      })
      .addCase(setupSaveCompanyLogo.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupSaveUserLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveUserLogo.fulfilled, (state) => {
        state.loading = false;
        toast.success("User Logo Updated Successfully")
      })
      .addCase(setupSaveUserLogo.rejected, (state, action) => {
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
  resetVerifyCode,
  resetTfaDisableAddSucess,
  updateUserTfa,
  handleChangeUserCompany
} = slice.actions;

export default slice.reducer;
