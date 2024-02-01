import { toast } from "react-toastify";
import { addUser, getAllUsers } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  addUserSuccess: false,
  allUsers: [],
};

export const setupAddUser = createAsyncThunk(
  "userManagement/addUser",
  async (data, thunkAPI) => {
    return addUser(data, thunkAPI);
  }
);
export const setupGetAllUsers = createAsyncThunk(
  "userManagement/getAllUsers",
  async (data, thunkAPI) => {
    return getAllUsers(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    resetAddUserSuccess: (state, action) => {
      state.addUserSuccess = false;
    },
  },
  extraReducers: {
    // Setup Add User
    [setupAddUser.pending]: (state) => {
      state.loading = true;
    },
    [setupAddUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.addUserSuccess = true;
      toast.success("User Added Successfully");
    },
    [setupAddUser.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Get All Users
    [setupGetAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload?.data || [];
    },
    [setupGetAllUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetAddUserSuccess } = slice.actions;

export default slice.reducer;
