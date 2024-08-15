import axios from "axios";
import { baseUrl } from "../../../../constants/index";

export const getAllAuditExceptions = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditExceptionReports/reports/getAll?companyId=${data?.companyId}&natureThrough=${data?.natureThrough}&location=${data?.location}&subLocation=${data?.subLocation}&stepNo=${data?.stepNo}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllLocations = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditExceptionReports/reports/getJobsLocations?companyId=${data?.companyId}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllTimeAllocation = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/jobResourceTimeAllocation/reports/getAll?companyId=${data?.companyId}&natureThrough=${data?.natureThrough}&location=${data?.location}&subLocation=${data?.subLocation}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
