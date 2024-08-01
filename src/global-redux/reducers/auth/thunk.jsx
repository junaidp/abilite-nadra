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
    let props = await axios.post(`${baseUrl}/account/user/login`, data?.data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const forgetPassword = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/account/user/forgotPassword?email=${data?.email}`,
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

export const resetPassword = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/account/user/resetPassword`,
      {
        newPassword: data?.newPassword,
        email: data?.email,
        token: data?.token,
      },
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

export const updateUserName = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/account/user/updateUserName${data}`,
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

export const internalResetPassword = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/account/user/internalPasswordReset`,
      {
        email: data?.email,
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
        confirmNewPassword: data?.confirmNewPassword,
      },
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

export const generateQRCode = async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/account/user/generate/${user[0]?.email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
        responseType: "arraybuffer",
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const verifyQRCode = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/account/user/validate/key`,
      {
        code: data?.code,
        username: user[0]?.email,
      },
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

export const updateUser = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(`${baseUrl}/account/user/updateUser`, data, {
      headers: {
        Authorization: `Bearer ${user[0]?.token}`,
      },
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const logoutUser = async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(`${baseUrl}/account/user/logout`, {
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

export const landingCall = async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(`${baseUrl}/account/user/landing`, {
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
