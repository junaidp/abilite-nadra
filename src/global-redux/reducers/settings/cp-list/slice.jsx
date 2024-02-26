import { toast } from "react-toastify";
import { getAllCPList, addCPList, updateCPList } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allCPList: [],
  loading: false,
  cpListAddSuccess: false,
};

export const setupGetAllCPList = createAsyncThunk(
  "cpList/getAllCPList",
  async (data, thunkAPI) => {
    return getAllCPList(data, thunkAPI);
  }
);

export const setupAddCPList = createAsyncThunk(
  "cpList/addCPList",
  async (data, thunkAPI) => {
    return addCPList(data, thunkAPI);
  }
);

export const setupUpdateCPList = createAsyncThunk(
  "cpList/updateCPList",
  async (data, thunkAPI) => {
    return updateCPList(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "cpList",
  initialState,
  reducers: {
    resetCpListAddSuccess: (state, action) => {
      state.cpListAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Get All CP List
    builder
      .addCase(setupGetAllCPList.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllCPList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allCPList = payload?.data || [];
      })
      .addCase(setupGetAllCPList.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Add CP List
    builder
      .addCase(setupAddCPList.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddCPList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cpListAddSuccess = true;
        toast.success("Cp List Added Successfully");
      })
      .addCase(setupAddCPList.rejected, (state, { payload }) => {
        state.loading = false;
        state.cpListAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update CP List
    builder
      .addCase(setupUpdateCPList.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateCPList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cpListAddSuccess = true;
        toast.success("CP List Updated Successfully");
      })
      .addCase(setupUpdateCPList.rejected, (state, { payload }) => {
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

export const { resetCpListAddSuccess } = slice.actions;

export default slice.reducer;
