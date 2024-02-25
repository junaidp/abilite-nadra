import {
  AddCheckList,
  getAllCheckLists,
  updateCheckListName,
  updateCheckListRemarks,
  addCheckListItem,
  getAllCheckListItems,
  editCheckListItem,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  checkListAddSuccess: false,
  loading: false,
  subCheckListAddSuccess: false,
  checkList: [],
  checkListItems: [],
  checkListId: "",
  currentSubCheckListItem: {},
};

export const setupAddCheckList = createAsyncThunk(
  "settingsCheckList/AddCheckList",
  async (data, thunkAPI) => {
    return AddCheckList(data, thunkAPI);
  }
);
export const setupGetAllCheckLists = createAsyncThunk(
  "settingsCheckList/getAllCheckLists",
  async (data, thunkAPI) => {
    return getAllCheckLists(data, thunkAPI);
  }
);

export const setupUpdateCheckListName = createAsyncThunk(
  "settingsCheckList/updateCheckListName",
  async (data, thunkAPI) => {
    return updateCheckListName(data, thunkAPI);
  }
);

export const setupUpdateCheckListRemarks = createAsyncThunk(
  "settingsCheckList/updateCheckListRemarks",
  async (data, thunkAPI) => {
    return updateCheckListRemarks(data, thunkAPI);
  }
);

export const setupAddCheckListItem = createAsyncThunk(
  "settingsCheckList/addCheckListItem",
  async (data, thunkAPI) => {
    return addCheckListItem(data, thunkAPI);
  }
);

export const setupGetAllCheckListItems = createAsyncThunk(
  "settingsCheckList/getAllCheckListItems",
  async (data, thunkAPI) => {
    return getAllCheckListItems(data, thunkAPI);
  }
);
export const setupEditCheckListItem = createAsyncThunk(
  "settingsCheckList/editCheckListItem",
  async (data, thunkAPI) => {
    return editCheckListItem(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "settingsCheckList",
  initialState,
  reducers: {
    resetAddCheckListSuccess: (state, action) => {
      state.checkListAddSuccess = false;
    },
    resetAddSubCheckListSuccess: (state, action) => {
      state.subCheckListAddSuccess = false;
    },
    addCheckListId: (state, action) => {
      state.checkListId = action.payload;
    },
    changeCurrentSubListItem: (state, action) => {
      state.currentSubCheckListItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add Check List
    builder
      .addCase(setupAddCheckList.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddCheckList.fulfilled, (state) => {
        state.loading = false;
        state.checkListAddSuccess = true;
        toast.success("Check List Added Successfully");
      })
      .addCase(setupAddCheckList.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get All CheckList
    builder
      .addCase(setupGetAllCheckLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllCheckLists.fulfilled, (state, { payload }) => {
        state.checkList = payload.data || [];
        state.loading = false;
      })
      .addCase(setupGetAllCheckLists.rejected, (state, { payload }) => {
        state.loading = false;
      });

    // Update CheckList Name
    builder
      .addCase(setupUpdateCheckListName.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateCheckListName.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.checkListAddSuccess = true;
        toast.success("Check List Name Edited Successfully");
      })
      .addCase(setupUpdateCheckListName.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update CheckList Remarks
    builder
      .addCase(setupUpdateCheckListRemarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateCheckListRemarks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.checkListAddSuccess = true;
        toast.success("Check List Remarks Edited Successfully");
      })
      .addCase(setupUpdateCheckListRemarks.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Add CheckList Item
    builder
      .addCase(setupAddCheckListItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddCheckListItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.subCheckListAddSuccess = true;
        toast.success("Check List Item Added Successfully");
      })
      .addCase(setupAddCheckListItem.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get all CheckList Items
    builder
      .addCase(setupGetAllCheckListItems.pending, (state) => {
        // state.loading = true;
      })
      .addCase(setupGetAllCheckListItems.fulfilled, (state, { payload }) => {
        // state.loading = false;
        state.checkListItems = payload?.data;
      })
      .addCase(setupGetAllCheckListItems.rejected, (state, { payload }) => {
        // state.loading = false;
      });

    // Edit CheckList Item
    builder
      .addCase(setupEditCheckListItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupEditCheckListItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.subCheckListAddSuccess = true;
        toast.success("Check List Item edited Successfully");
      })
      .addCase(setupEditCheckListItem.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {
  resetAddCheckListSuccess,
  resetAddSubCheckListSuccess,
  addCheckListId,
  changeCurrentSubListItem,
} = slice.actions;

export default slice.reducer;
