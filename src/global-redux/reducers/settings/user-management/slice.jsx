import { toast } from "react-toastify";
import {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  resetUserPassword,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  addUserSuccess: false,
  resetPasswordSuccess: false,
  allUsers: [],
};

export const setupAddUser = createAsyncThunk(
  "userManagement/addUser",
  async (data, thunkAPI) => {
    return addUser(data, thunkAPI);
  }
);
export const setupUpdateUser = createAsyncThunk(
  "userManagement/updateUser",
  async (data, thunkAPI) => {
    return updateUser(data, thunkAPI);
  }
);
export const setupDeleteUser = createAsyncThunk(
  "userManagement/deleteUser",
  async (data, thunkAPI) => {
    return deleteUser(data, thunkAPI);
  }
);
export const setupGetAllUsers = createAsyncThunk(
  "userManagement/getAllUsers",
  async (data, thunkAPI) => {
    return getAllUsers(data, thunkAPI);
  }
);
export const setupResetUserPassword = createAsyncThunk(
  "userManagement/resetUserPassword",
  async (data, thunkAPI) => {
    return resetUserPassword(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    resetAddUserSuccess: (state) => {
      state.addUserSuccess = false;
    },
    resetResetPasswordSuccess: (state) => {
      state.resetPasswordSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add User
    builder
      .addCase(setupAddUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddUser.fulfilled, (state) => {
        state.loading = false;
        state.addUserSuccess = true;
        toast.success("User Added Successfully");
      })
      .addCase(setupAddUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.data) {
          let errorsArray = Object.values(action.payload?.response?.data?.data);
          if (errorsArray?.length !== 0) {
            errorsArray?.forEach((err) => {
              toast.error(err);
            });
          } else {
            toast.error(action.payload?.response?.data?.message);
          }
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
        state.addUserSuccess = true;
        toast.success("User Updated Successfully");
      })
      .addCase(setupUpdateUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete User
    builder
      .addCase(setupDeleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteUser.fulfilled, (state) => {
        state.loading = false;
        state.addUserSuccess = true;
        toast.success("User Deleted Successfully");
      })
      .addCase(setupDeleteUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Users
    builder
      .addCase(setupGetAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allUsers = sortedArray || [];
      })
      .addCase(setupGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Reset User Password
    builder
      .addCase(setupResetUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupResetUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
        toast.success("User Password Updated Successfully");
      })
      .addCase(setupResetUserPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetAddUserSuccess, resetResetPasswordSuccess } = slice.actions;

export default slice.reducer;
