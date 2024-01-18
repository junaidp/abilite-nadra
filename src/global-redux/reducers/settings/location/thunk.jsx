import axios from "axios";
import { baseUrl } from "../../../../constants/index";

export const addLocation = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.post(
      `${baseUrl}/abiliteconfig/location/save`,
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

export const getAllLocations = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${baseUrl}/abiliteconfig/location/getall`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
