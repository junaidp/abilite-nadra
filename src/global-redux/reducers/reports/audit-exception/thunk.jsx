import axios from "axios";
import { baseUrl } from "../../../../constants/index";

export const getJobsBasedOnNatureThrough = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditExceptionReports/reports/getJobNamesBasedOnNatureThrough?companyId=${data?.companyId}&natureThrough=${data?.natureThrough}`,
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
