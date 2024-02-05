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
  extraReducers: (builder) => {
    // Add User
    builder
      .addCase(setupAddUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddUser.fulfilled, (state, action) => {
        state.loading = false;
        state.addUserSuccess = !action.error;
        if (!action.error) {
          toast.success("User Added Successfully");
        }
      })
      .addCase(setupAddUser.rejected, (state, action) => {
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
      .addCase(setupGetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload?.data || [];
      })
      .addCase(setupGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetAddUserSuccess } = slice.actions;

export default slice.reducer;
