import { toast } from "react-toastify";
import {
  addDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  createSubDepartment,
  getAllSubDepartments,
  updateSubDepartment,
  deleteSubDepartment,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subLoading:false,
  departmentAddSuccess: false,
  subDepartmentAddSuccess: false,
  allDepartments: [],
  allSubDepartments: [],
};

export const setupAddDepartment = createAsyncThunk(
  "department/addDepartment",
  async (data, thunkAPI) => {
    return addDepartment(data, thunkAPI);
  }
);

export const setupGetAllDepartments = createAsyncThunk(
  "department/getAllDepartments",
  async (data, thunkAPI) => {
    return getAllDepartments(data, thunkAPI);
  }
);

export const setupUpdateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async (data, thunkAPI) => {
    return updateDepartment(data, thunkAPI);
  }
);

export const setupDeleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (data, thunkAPI) => {
    return deleteDepartment(data, thunkAPI);
  }
);

export const setupCreateSubDepartment = createAsyncThunk(
  "department/createSubDepartment",
  async (data, thunkAPI) => {
    return createSubDepartment(data, thunkAPI);
  }
);

export const setupGetAllSubDepartments = createAsyncThunk(
  "department/getAllSubDepartments",
  async (data, thunkAPI) => {
    return getAllSubDepartments(data, thunkAPI);
  }
);

export const setupUpdateSubDepartment = createAsyncThunk(
  "department/updateSubDepartment",
  async (data, thunkAPI) => {
    return updateSubDepartment(data, thunkAPI);
  }
);

export const setupDeleteSubDepartment = createAsyncThunk(
  "department/deleteSubDepartment",
  async (data, thunkAPI) => {
    return deleteSubDepartment(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "department",
  initialState,
  reducers: {
    resetDepartmentAddSuccess: (state) => {
      state.departmentAddSuccess = false;
    },
    resetSubDepartmentAddSuccess: (state) => {
      state.subDepartmentAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add department
    builder
      .addCase(setupAddDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddDepartment.fulfilled, (state) => {
        state.loading = false;
        state.departmentAddSuccess = true;
        toast.success("Department Added Successfully");
      })
      .addCase(setupAddDepartment.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get All departments
    builder
      .addCase(setupGetAllDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllDepartments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allDepartments = payload?.data || [];
      })
      .addCase(setupGetAllDepartments.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update department
    builder
      .addCase(setupUpdateDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateDepartment.fulfilled, (state) => {
        state.loading = false;
        state.departmentAddSuccess = true;
        toast.success("Department Updated Successfully");
      })
      .addCase(setupUpdateDepartment.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Save Sub department
    builder
      .addCase(setupCreateSubDepartment.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupCreateSubDepartment.fulfilled, (state) => {
        state.subLoading = false;
        state.subDepartmentAddSuccess = true;
        toast.success("Sub Department Added Successfully");
      })
      .addCase(setupCreateSubDepartment.rejected, (state, { payload }) => {
        state.subLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get All Sub department
    builder
      .addCase(setupGetAllSubDepartments.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupGetAllSubDepartments.fulfilled, (state, { payload }) => {
        state.subLoading = false;
        state.allSubDepartments = payload?.data || [];
      })
      .addCase(setupGetAllSubDepartments.rejected, (state, { payload }) => {
        state.subLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Sub department
    builder
      .addCase(setupUpdateSubDepartment.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupUpdateSubDepartment.fulfilled, (state) => {
        state.subLoading = false;
        state.subDepartmentAddSuccess = true;
        toast.success("Sub Department Updated Successfully");
      })
      .addCase(setupUpdateSubDepartment.rejected, (state, { payload }) => {
        state.subLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Delete Sub department
    builder
      .addCase(setupDeleteSubDepartment.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupDeleteSubDepartment.fulfilled, (state) => {
        state.subLoading = false;
        state.subDepartmentAddSuccess = true;
        toast.success("Sub Department Deleted Successfully");
      })
      .addCase(setupDeleteSubDepartment.rejected, (state, { payload }) => {
        state.subLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete  department
    builder
      .addCase(setupDeleteDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteDepartment.fulfilled, (state) => {
        state.loading = false;
        state.departmentAddSuccess = true;
        toast.success("Department Deleted Successfully");
      })
      .addCase(setupDeleteDepartment.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetDepartmentAddSuccess, resetSubDepartmentAddSuccess } =
  slice.actions;

export default slice.reducer;
