import axios from "axios";
import { baseUrl } from "../../../../constants/index";

export const getAllCPList = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/configurations/CriteriaForRiskManagementCP/getAll?companyId=${data}`,
      null,
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

export const addCPList = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/configurations/CriteriaForRiskManagementCP/create${data}`,
      null,
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

export const updateCPList = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/configurations/CriteriaForRiskManagementCP/update`,
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
