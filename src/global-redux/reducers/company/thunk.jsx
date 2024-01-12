import axios from "axios";
import { baseUrl } from "../../../constants/index";
import { setupGetCompanies } from "./slice";
export const registerCompany = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${baseUrl}/Company/saveCompany`, data);
    thunkAPI.dispatch(setupGetCompanies());
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCompanies = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${baseUrl}/account/company/getAllCompanies`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
