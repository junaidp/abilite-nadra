import { toast } from "react-toastify";
import { updateNotifications, getNotifications } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  notifications: {},
  notificationAddSuccess: false,
};

export const setupUpdateNotifications = createAsyncThunk(
  "notification/updateNotifications",
  async (data, thunkAPI) => {
    return updateNotifications(data, thunkAPI);
  }
);

export const setupGetNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (data, thunkAPI) => {
    return getNotifications(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotificationAddSuccess: (state) => {
      state.notificationAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Update Notification
    builder
      .addCase(setupUpdateNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateNotifications.fulfilled, (state) => {
        state.loading = false;
        state.notificationAddSuccess = true;
      })
      .addCase(setupUpdateNotifications.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    //    Get Notification
    builder
      .addCase(setupGetNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetNotifications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.notifications = payload?.data || {};
      })
      .addCase(setupGetNotifications.rejected, (state, { payload }) => {
        state.loading = false;
        state.cpListAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetNotificationAddSuccess } = slice.actions;

export default slice.reducer;
