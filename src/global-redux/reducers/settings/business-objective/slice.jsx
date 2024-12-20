import { toast } from "react-toastify";
import {
  addFinancialQuantifiableYes,
  updateFinancialQuantifiableYes,
  deleteFinancialQuantifiableYes,
  getFinancialQuantifiableYesForCompany,
  getFinancialQuantifiableYesForEngagement,
  addFinancialQuantifiableNo,
  updateFinancialQuantifiableNo,
  deleteFinancialQuantifiableNo,
  getFinancialQuantifiableNoForCompany,
  getFinancialQuantifiableNoForEngagement,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  yesLoading: false,
  noLoading: false,
  yesAddSuccess: false,
  noAddSuccess: false,
  yesAll: [],
  noAll: [],
};

export const setupAddFinancialQuantifiableYes = createAsyncThunk(
  "businessObjective/addFinancialQuantifiableYes",
  async (data, thunkAPI) => {
    return addFinancialQuantifiableYes(data, thunkAPI);
  }
);

export const setupUpdateFinancialQuantifiableYes = createAsyncThunk(
  "businessObjective/updateFinancialQuantifiableYes",
  async (data, thunkAPI) => {
    return updateFinancialQuantifiableYes(data, thunkAPI);
  }
);

export const setupDeleteFinancialQuantifiableYes = createAsyncThunk(
  "businessObjective/deleteFinancialQuantifiableYes",
  async (data, thunkAPI) => {
    return deleteFinancialQuantifiableYes(data, thunkAPI);
  }
);

export const setupGetFinancialQuantifiableYesForCompany = createAsyncThunk(
  "businessObjective/getFinancialQuantifiableYesForCompany",
  async (data, thunkAPI) => {
    return getFinancialQuantifiableYesForCompany(data, thunkAPI);
  }
);

export const setupGetFinancialQuantifiableYesForEngagement = createAsyncThunk(
  "businessObjective/getFinancialQuantifiableYesForEngagement",
  async (data, thunkAPI) => {
    return getFinancialQuantifiableYesForEngagement(data, thunkAPI);
  }
);

export const setupAddFinancialQuantifiableNo = createAsyncThunk(
  "businessObjective/addFinancialQuantifiableNo",
  async (data, thunkAPI) => {
    return addFinancialQuantifiableNo(data, thunkAPI);
  }
);

export const setupUpdateFinancialQuantifiableNo = createAsyncThunk(
  "businessObjective/updateFinancialQuantifiableNo",
  async (data, thunkAPI) => {
    return updateFinancialQuantifiableNo(data, thunkAPI);
  }
);

export const setupDeleteFinancialQuantifiableNo = createAsyncThunk(
  "businessObjective/deleteFinancialQuantifiableNo",
  async (data, thunkAPI) => {
    return deleteFinancialQuantifiableNo(data, thunkAPI);
  }
);

export const setupGetFinancialQuantifiableNoForCompany = createAsyncThunk(
  "businessObjective/getFinancialQuantifiableNoForCompany",
  async (data, thunkAPI) => {
    return getFinancialQuantifiableNoForCompany(data, thunkAPI);
  }
);

export const setupGetFinancialQuantifiableNoForEngagement = createAsyncThunk(
  "businessObjective/getFinancialQuantifiableNoForEngagement",
  async (data, thunkAPI) => {
    return getFinancialQuantifiableNoForEngagement(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "businessObjective",
  initialState,
  reducers: {
    resetYesAddSuccess: (state) => {
      state.yesAddSuccess = false;
    },
    resetNoAddSuccess: (state) => {
      state.noAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    //  yes add
    builder
      .addCase(setupAddFinancialQuantifiableYes.pending, (state) => {
        state.yesLoading = true;
      })
      .addCase(setupAddFinancialQuantifiableYes.fulfilled, (state) => {
        state.yesLoading = false;
        state.yesAddSuccess = true;
        toast.success("Business Objective Added Successfully");
      })
      .addCase(setupAddFinancialQuantifiableYes.rejected, (state, action) => {
        state.yesLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   yes update
    builder
      .addCase(setupUpdateFinancialQuantifiableYes.pending, (state) => {
        state.yesLoading = true;
      })
      .addCase(setupUpdateFinancialQuantifiableYes.fulfilled, (state) => {
        state.yesLoading = false;
        state.yesAddSuccess = true;
        toast.success("Business Objective Saved Successfully");
      })
      .addCase(
        setupUpdateFinancialQuantifiableYes.rejected,
        (state, action) => {
          state.yesLoading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    //   yes delete
    builder
      .addCase(setupDeleteFinancialQuantifiableYes.pending, (state) => {
        state.yesLoading = true;
      })
      .addCase(setupDeleteFinancialQuantifiableYes.fulfilled, (state) => {
        state.yesLoading = false;
        state.yesAddSuccess = true;
        toast.success("Business Objective Deleted Successfully");
      })
      .addCase(
        setupDeleteFinancialQuantifiableYes.rejected,
        (state, action) => {
          state.yesLoading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    //   yes for company
    builder
      .addCase(setupGetFinancialQuantifiableYesForCompany.pending, (state) => {
        state.yesLoading = true;
      })
      .addCase(
        setupGetFinancialQuantifiableYesForCompany.fulfilled,
        (state, { payload }) => {
          state.yesLoading = false;
          state.yesAll = payload || [];
        }
      )
      .addCase(setupGetFinancialQuantifiableYesForCompany.rejected, (state) => {
        state.yesLoading = false;
        state.yesAll = [];
      });
    //   yes for engagement
    builder
      .addCase(
        setupGetFinancialQuantifiableYesForEngagement.pending,
        (state) => {
          state.yesLoading = true;
        }
      )
      .addCase(
        setupGetFinancialQuantifiableYesForEngagement.fulfilled,
        (state, { payload }) => {
          state.yesLoading = false;
          state.yesAll = payload || [];
        }
      )
      .addCase(
        setupGetFinancialQuantifiableYesForEngagement.rejected,
        (state) => {
          state.yesLoading = false;
        }
      );
    //   no add
    builder
      .addCase(setupAddFinancialQuantifiableNo.pending, (state) => {
        state.noLoading = true;
      })
      .addCase(setupAddFinancialQuantifiableNo.fulfilled, (state) => {
        state.noLoading = false;
        state.noAddSuccess = true;
        toast.success("Business Objective Added Successfully");
      })
      .addCase(setupAddFinancialQuantifiableNo.rejected, (state) => {
        state.noLoading = false;
      });
    //   no update
    builder
      .addCase(setupUpdateFinancialQuantifiableNo.pending, (state) => {
        state.noLoading = true;
      })
      .addCase(setupUpdateFinancialQuantifiableNo.fulfilled, (state) => {
        state.noLoading = false;
        state.noAddSuccess = true;
        toast.success("Business Objective Saved Successfully");
      })
      .addCase(setupUpdateFinancialQuantifiableNo.rejected, (state, action) => {
        state.noLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   no delete
    builder
      .addCase(setupDeleteFinancialQuantifiableNo.pending, (state) => {
        state.noLoading = true;
      })
      .addCase(setupDeleteFinancialQuantifiableNo.fulfilled, (state) => {
        state.noLoading = false;
        state.noAddSuccess = true;
        toast.success("Business Objective Deleted Successfully");
      })
      .addCase(setupDeleteFinancialQuantifiableNo.rejected, (state, action) => {
        state.noLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   no for company
    builder
      .addCase(setupGetFinancialQuantifiableNoForCompany.pending, (state) => {
        state.noLoading = true;
      })
      .addCase(
        setupGetFinancialQuantifiableNoForCompany.fulfilled,
        (state, { payload }) => {
          state.noLoading = false;
          state.noAll = payload || [];
        }
      )
      .addCase(setupGetFinancialQuantifiableNoForCompany.rejected, (state) => {
        state.noLoading = false;
        state.noAll = [];
      });
    //   no for engagement
    builder
      .addCase(
        setupGetFinancialQuantifiableNoForEngagement.pending,
        (state) => {
          state.noLoading = true;
        }
      )
      .addCase(
        setupGetFinancialQuantifiableNoForEngagement.fulfilled,
        (state, { payload }) => {
          state.noLoading = false;
          state.noAll = payload || [];
        }
      )
      .addCase(
        setupGetFinancialQuantifiableNoForEngagement.rejected,
        (state) => {
          state.noLoading = false;
        }
      );
  },
});

export const { resetYesAddSuccess, resetNoAddSuccess } = slice.actions;

export default slice.reducer;
