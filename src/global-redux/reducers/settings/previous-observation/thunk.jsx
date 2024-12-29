import axios from "axios";
import { baseUrl } from "../../../../config/constants";

export const getAllUsers = async (_, thunkAPI) => {
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

export const uploadFile = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/configurations/previousObservations?companyId=${data?.companyId}`,
      data?.formData,
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
