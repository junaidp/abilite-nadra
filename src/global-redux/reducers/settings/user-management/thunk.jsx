import axios from "axios";
import { baseUrl } from "../../../../constants/index";

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

export const getAllUsers = async (data, thunkAPI) => {
  const { user } = thunkAPI.getState().auth;
  try {
    let props = await axios.get(
      `${baseUrl}/account/user/getAllUsers`,
      {
        user: {
          email: "abiliteadmin@nadra.gov.pk",
        },
        company: {
          id: 22,
          companyName: "Testing",
          legalName: "Testing123",
          fiscalYearForm: "2024-01-11T15:44:18.671+00:00",
          fiscalYearTo: "2024-01-11T15:44:18.671+00:00",
          logoPath: "string",
          headerImage: "string",
          clientId: {
            id: 1,
            name: "Nadra",
            numberOfUsers: 40,
            managementAccounts: 40,
            status: 1,
            clientpackage: "Platinum",
            createdDate: "2024-01-09T12:04:29.588+00:00",
          },
        },
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
