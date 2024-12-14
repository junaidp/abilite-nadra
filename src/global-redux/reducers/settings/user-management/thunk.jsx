import axios from "axios";
import { baseUrl } from "../../../../config/constants";

export const addUser = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/user/account/register/ByAdmin`,
      data,
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

export const getAllUsers = async (data, thunkAPI) => {
  const { user } = thunkAPI.getState().auth;
  let { company } = thunkAPI.getState().common;
  if (!data?.shareWith) {
    try {
      let props = await axios.post(
        `${baseUrl}/account/user/getAllUsers`,
        {
          user: {
            email: user[0]?.email,
          },
          company: user[0]?.company.find(
            (item) => item?.companyName === company
          ),
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
  }
  if (data?.shareWith) {
    try {
      let props = await axios.post(
        `${baseUrl}/account/user/getAllUsers`,
        {
          user: {
            email: user[0]?.email,
          },
          company: user[0]?.company.find(
            (item) => item?.companyName === company
          ),
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
  }
};

export const deleteUser = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.delete(`${baseUrl}/account/user/delete/${data}`, {
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
