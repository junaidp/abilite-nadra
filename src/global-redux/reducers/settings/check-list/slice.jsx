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
  extraReducers: {
    // Add Check List
    [setupAddCheckList.pending]: (state) => {
      state.loading = true;
    },
    [setupAddCheckList.fulfilled]: (state) => {
      state.loading = false;
      state.checkListAddSuccess = true;
      toast.success("Check List Added Successfully");
    },
    [setupAddCheckList.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Get CheckList
    [setupGetAllCheckLists.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllCheckLists.fulfilled]: (state, { payload }) => {
      state.checkList = payload.data;
      state.loading = false;
    },
    [setupGetAllCheckLists.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    // Update CheckList Name
    [setupUpdateCheckListName.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateCheckListName.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checkListAddSuccess = true;
      toast.success("Check List Name Edited Successfully");
    },
    [setupUpdateCheckListName.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update CheckList Remarks
    [setupUpdateCheckListRemarks.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateCheckListRemarks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checkListAddSuccess = true;
      toast.success("Check List Remarks Edited Successfully");
    },
    [setupUpdateCheckListRemarks.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Add  CheckList Item
    [setupAddCheckListItem.pending]: (state) => {
      state.loading = true;
    },
    [setupAddCheckListItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subCheckListAddSuccess = true;
      toast.success("Check List Item Added Successfully");
    },
    [setupAddCheckListItem.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Gett all  CheckList Item
    [setupGetAllCheckListItems.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllCheckListItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checkListItems = payload?.data;
    },
    [setupGetAllCheckListItems.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    // Edit  CheckList Item
    [setupEditCheckListItem.pending]: (state) => {
      state.loading = true;
    },
    [setupEditCheckListItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subCheckListAddSuccess = true;
      toast.success("Check List Item edited Successfully");
    },
    [setupEditCheckListItem.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const {
  resetAddCheckListSuccess,
  resetAddSubCheckListSuccess,
  addCheckListId,
  changeCurrentSubListItem,
} = slice.actions;

export default slice.reducer;
