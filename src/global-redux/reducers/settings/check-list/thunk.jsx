import axios from "axios";
import { baseUrl } from "../../../../constants/index";
export const AddCheckList = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/addNewChecklist`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllCheckLists = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${baseUrl}/configurations/checklist/getAllByUserEmail${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCheckListName = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/updateChecklistName${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCheckListRemarks = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/changeChecklistDefaultRemarks${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const addCheckListItem = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/checklistitems/addNewChecklistItems`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllCheckListItems = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${baseUrl}/configurations/checklist/checklistitems/getAllChecklistItems${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const editCheckListItem = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/checklistitems/updateChecklistItems`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
