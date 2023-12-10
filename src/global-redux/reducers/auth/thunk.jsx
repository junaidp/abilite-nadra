import axios from "axios";
import { baseUrl } from "../../../constants/index";
export const registerUser = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${baseUrl}/account/registerUser`, data?.data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const loginUser = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${baseUrl}/account/loginUser`, data?.data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const forgetPassword = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${baseUrl}/account/forgotPassword?email=${data?.email}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const resetPassword = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${baseUrl}/account/resetPassword`, {
      newPassword: data?.newPassword,
      email: data?.email,
      token: data?.token,
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
