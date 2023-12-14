import axios from "axios";
import { baseUrl } from "../../../constants/index";
export const registerCompany = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${baseUrl}/Company/saveCompany`, {
      ...data,
      logopath: "path",
      usersAllowed: Number(data?.usersAllowed),
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCompanies = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${baseUrl}/Company/getAllCompanies`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
