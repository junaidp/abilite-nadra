import { toast } from "react-toastify";
import {
  registerCompany,
  getAllCompanies,
  updateCompany,
  updateApprovalManagement,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allCompanies: [],
  loading: false,
  companyAddSuccess: false,
};

export const setupRegisterCompany = createAsyncThunk(
  "company/registerCompany",
  async (data, thunkAPI) => {
    return registerCompany(data, thunkAPI);
  }
);

export const setupGetAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async (data, thunkAPI) => {
    return getAllCompanies(data, thunkAPI);
  }
);

export const setupUpdateCompany = createAsyncThunk(
  "company/updateCompany",
  async (data, thunkAPI) => {
    return updateCompany(data, thunkAPI);
  }
);
export const setupUpdateApprovalManagement = createAsyncThunk(
  "company/updateApprovalManagement",
  async (data, thunkAPI) => {
    return updateApprovalManagement(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetCompanyRegisterSuccess: (state, action) => {
      state.companyAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Register Company
    builder
      .addCase(setupRegisterCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupRegisterCompany.fulfilled, (state) => {
        state.loading = false;
        state.companyAddSuccess = true;
        toast.success("Company registered successfully");
      })
      .addCase(setupRegisterCompany.rejected, (state, { payload }) => {
        state.loading = false;
        state.companyAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get All Companies
    builder
      .addCase(setupGetAllCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllCompanies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allCompanies = payload || [];
      })
      .addCase(setupGetAllCompanies.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Company
    builder
      .addCase(setupUpdateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companyAddSuccess = true;
        toast.success("Company updated successfully");
      })
      .addCase(setupUpdateCompany.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Approval Management Update
    builder
      .addCase(setupUpdateApprovalManagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupUpdateApprovalManagement.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.companyAddSuccess = true;
          toast.success("Approval Management Updated Successfully");
        }
      )
      .addCase(setupUpdateApprovalManagement.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetCompanyRegisterSuccess } = slice.actions;

export default slice.reducer;
