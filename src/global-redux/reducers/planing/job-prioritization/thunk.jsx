import axios from "axios";
import { baseUrl } from "../../../../constants/index";

export const getAllJobPrioritization = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditPlanningAndScheduling/jobPrioritization/getAllByCompanyId?companyId=${data?.companyId}&pageNo=${data?.page}&noOfRecords=${data?.itemsPerPage}`,
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

export const getInitialAllJobPrioritization = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditPlanningAndScheduling/jobPrioritization/getAllByCompanyId?companyId=${data?.companyId}&pageNo=${data?.page}&noOfRecords=${data?.itemsPerPage}`,
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

export const updateJobPrioritization = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/auditPlanningAndScheduling/jobPrioritization/update`,
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
