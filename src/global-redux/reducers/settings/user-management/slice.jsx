import { toast } from "react-toastify";
import { addUser, getAllUsers, updateUser } from "./thunk";
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
export const setupUpdateUser = createAsyncThunk(
  "userManagement/updateUser",
  async (data, thunkAPI) => {
    return updateUser(data, thunkAPI);
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
      .addCase(setupUpdateUser.fulfilled, (state, action) => {
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
  },
});

export const { resetAddUserSuccess } = slice.actions;

export default slice.reducer;
