import axios from "axios";
import { baseUrl } from "../../../constants/index";

export const addTask = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(`${baseUrl}/IRTMC/saveOrUpdate`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user[0]?.token}`,
      },
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateTask = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(`${baseUrl}/IRTMC/saveOrUpdate`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user[0]?.token}`,
      },
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getSingleTask = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/IRTMC/get?informationRequestAndTaskManagementId=${data?.id}`,
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

export const getAllTasks = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/IRTMC/getAllInformationRequestOrTasks?companyId=${data?.companyId}&pageNo=${data?.page}&noOfRecords=${data?.itemsPerPage}&isTask=${data?.isTask}`,
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

export const getAllUsers = async (data, thunkAPI) => {
  const { user } = thunkAPI.getState().auth;
  let { company } = thunkAPI.getState().common;
  try {
    let props = await axios.post(
      `${baseUrl}/account/user/getAllUsers`,
      {
        user: {
          email: user[0]?.email,
        },
        company: user[0]?.company.find((item) => item?.companyName === company),
      },
      {
        headers: {
          shareWith: true,
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

export const getAllAuditEngagement = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditEngagement/getAllWithoutPagination?companyId=${data?.companyId}`,
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

export const taskFileUpload = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/IRTMC/file/upload?planningReportId=${data?.planningReportId}`,
      data?.formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const taskFileDelete = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.delete(
      `${baseUrl}/IRTMC/file/delete?fileId=${data?.fileId}&informationRequestAndTaskManagementId=${data?.informationRequestAndTaskManagementId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
