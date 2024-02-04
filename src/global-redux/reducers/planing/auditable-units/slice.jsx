import { getAllAuditableUnits, addAuditableUnit,EditAuditableUnit } from "./thunk";
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
  extraReducers: {
    // Get all auditable units
    [setupGetAllAuditableUnits.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllAuditableUnits.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allAuditableUnits = payload?.data || [];
    },
    [setupGetAllAuditableUnits.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Add Auditable Unit
    [setupAddAuditableUnit.pending]: (state) => {
      state.loading = true;
    },
    [setupAddAuditableUnit.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.auditableUnitAddSuccess = true;
      toast.success("Unit Added Successfully");
    },
    [setupAddAuditableUnit.rejected]: (state, { payload }) => {
      state.loading = false;
      state.auditableUnitAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Edit Auditable Unit
    [setupEditAuditableUnit.pending]: (state) => {
      state.loading = true;
    },
    [setupEditAuditableUnit.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.auditableUnitAddSuccess = true;
      toast.success("Unit Edited Successfully");
    },
    [setupEditAuditableUnit.rejected]: (state, { payload }) => {
      state.loading = false;
      state.auditableUnitAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetAuditableUnitSuccess } = slice.actions;

export default slice.reducer;
