import { toast } from "react-toastify";
import {
  createRiskFactor,
  getAllRiskFactors,
  updateRiskFactor,
  deleteRiskFactor,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  riskFactorAddSuccess: false,
  allRiskFactors: [],
};

export const setupCreateRiskFactor = createAsyncThunk(
  "riskFactor/createRiskFactor",
  async (data, thunkAPI) => {
    return createRiskFactor(data, thunkAPI);
  }
);

export const setupGetAllRiskFactors = createAsyncThunk(
  "riskFactor/getAllRiskFactors",
  async (data, thunkAPI) => {
    return getAllRiskFactors(data, thunkAPI);
  }
);
export const setupUpdateRiskFactor = createAsyncThunk(
  "riskFactor/updateRiskFactor",
  async (data, thunkAPI) => {
    return updateRiskFactor(data, thunkAPI);
  }
);
export const setupDeleteRiskFactor = createAsyncThunk(
  "riskFactor/deleteRiskFactor",
  async (data, thunkAPI) => {
    return deleteRiskFactor(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "riskFactor",
  initialState,
  reducers: {
    resetRiskFactorAddSuccess: (state) => {
      state.riskFactorAddSuccess = false;
    },
  },
  // Add Risk Factor
  extraReducers: (builder) => {
    builder
      .addCase(setupCreateRiskFactor.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupCreateRiskFactor.fulfilled, (state) => {
        state.loading = false;
        state.riskFactorAddSuccess = true;
        toast.success("Risk Factor Added Successfully");
      })
      .addCase(setupCreateRiskFactor.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Risk Factors
    builder
      .addCase(setupGetAllRiskFactors.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllRiskFactors.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allRiskFactors = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllRiskFactors.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Risk Factors
    builder
      .addCase(setupUpdateRiskFactor.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateRiskFactor.fulfilled, (state) => {
        state.loading = false;
        state.riskFactorAddSuccess = true;
        toast.success("Risk Factor Updated Successfully");
      })
      .addCase(setupUpdateRiskFactor.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Risk Factors
    builder
      .addCase(setupDeleteRiskFactor.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteRiskFactor.fulfilled, (state) => {
        state.loading = false;
        state.riskFactorAddSuccess = true;
        toast.success("Risk Factor Deleted Successfully");
      })
      .addCase(setupDeleteRiskFactor.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetRiskFactorAddSuccess } = slice.actions;

export default slice.reducer;
