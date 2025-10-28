import axios from "axios";
import { baseUrl } from "../../../../config/constants";
import { setupGetAllCheckListItemsAfterSave, setupGetAllCheckListsAfterSave } from "./slice"

export const AddCheckList = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/addNewChecklist`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllCheckLists = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/configurations/checklist/getAllByUserEmail${data}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllCheckListsAfterSave = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/configurations/checklist/getAllByUserEmail?userEmailId=${data.userEmailId
      }&companyId=${data.companyId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCheckListName = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/updateChecklistName${data}`,
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    thunkAPI.dispatch(setupGetAllCheckListsAfterSave({
      userEmailId: user[0]?.email, companyId: user[0]?.company[0].id
    }));
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCheckListRemarks = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/changeChecklistDefaultRemarks${data}`,
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );

    thunkAPI.dispatch(setupGetAllCheckListsAfterSave({
      userEmailId: user[0]?.email, companyId: user[0]?.company[0].id
    }));
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const addCheckListItem = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const { checkListId } = thunkAPI.getState().settingsCheckList;
    const email = user[0]?.email;
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/checklistitems/addNewChecklistItems`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    thunkAPI.dispatch(setupGetAllCheckListItemsAfterSave({ userEmailId: email, checklistId: checkListId }));
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllCheckListItems = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/configurations/checklist/checklistitems/getAllChecklistItems${data}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllCheckListItemsAfterSave = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/configurations/checklist/checklistitems/getAllChecklistItems?userEmailId=${user[0]?.email
      }&checklistId=${data.checklistId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const editCheckListItem = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const { checkListId } = thunkAPI.getState().settingsCheckList;
    const email = user[0]?.email;
    let props = await axios.post(
      `${baseUrl}/configurations/checklist/checklistitems/updateChecklistItems`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    thunkAPI.dispatch(setupGetAllCheckListItemsAfterSave({ userEmailId: email, checklistId: checkListId }));
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteCheckList = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.delete(
      `${baseUrl}/configurations/checklist/deleteChecklist/${data}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const deleteSubCheckList = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const { checkListId } = thunkAPI.getState().settingsCheckList;
    const email = user[0]?.email;
    let props = await axios.delete(
      `${baseUrl}/configurations/checklist/checklistitems/deleteChecklistItem/${data}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    thunkAPI.dispatch(setupGetAllCheckListItemsAfterSave({ userEmailId: email, checklistId: checkListId }));
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
