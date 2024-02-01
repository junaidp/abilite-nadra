import axios from "axios";
import { baseUrl } from "../../../constants/index";

export const getAllCompanies = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${baseUrl}/account/company/getAllCompanies`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
