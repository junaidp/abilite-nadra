import {
  getAllAuditableUnits,
  addAuditableUnit,
  EditAuditableUnit,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allAuditableUnits: [],
  auditableUnitAddSuccess: false,
};

export const setupGetAllAuditableUnits = createAsyncThunk(
  "auditableUnits/getAllAuditableUnits",
  async (data, thunkAPI) => {
    return getAllAuditableUnits(data, thunkAPI);
  }
);
export const setupAddAuditableUnit = createAsyncThunk(
  "auditableUnits/addAuditableUnit",
  async (data, thunkAPI) => {
    return addAuditableUnit(data, thunkAPI);
  }
);

export const setupEditAuditableUnit = createAsyncThunk(
  "auditableUnits/EditAuditableUnit",
  async (data, thunkAPI) => {
    return EditAuditableUnit(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auditableUnits",
  initialState,
  reducers: {
    resetAuditableUnitSuccess: (state) => {
      state.auditableUnitAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Get all auditable units
    builder
      .addCase(setupGetAllAuditableUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditableUnits.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allAuditableUnits = payload?.data || [];
      })
      .addCase(setupGetAllAuditableUnits.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Add Auditable Unit
    builder
      .addCase(setupAddAuditableUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddAuditableUnit.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = true;
        toast.success("Unit Added Successfully");
      })
      .addCase(setupAddAuditableUnit.rejected, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Edit Auditable Unit
    builder
      .addCase(setupEditAuditableUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupEditAuditableUnit.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = true;
        toast.success("Unit Edited Successfully");
      })
      .addCase(setupEditAuditableUnit.rejected, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetAuditableUnitSuccess } = slice.actions;

export default slice.reducer;
