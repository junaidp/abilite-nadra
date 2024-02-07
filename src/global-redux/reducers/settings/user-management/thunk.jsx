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
  if (!data?.shareWith) {
    try {
      let props = await axios.post(
        `${baseUrl}/account/user/getAllUsers`,
        {
          user: {
            email: user[0]?.email,
          },
          company: {
            id: 1,
            companyName: "Nadra",
            legalName: "National Database and Registration Authority",
            fiscalYearForm: "2024-01-09T00:00:00.000+00:00",
            fiscalYearTo: "2025-01-09T00:00:00.000+00:00",
            logoPath: null,
            headerImage: null,
            clientId: {
              id: 1,
              name: "Admin User",
              numberOfUsers: 0,
              managementAccounts: 0,
              status: 1,
              clientpackage: "Silver",
              createdDate: "2024-02-07T10:50:11.441+00:00",
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
  }
  if (data?.shareWith) {
    try {
      let props = await axios.post(
        `${baseUrl}/account/user/getAllUsers`,
        {
          user: {
            email: user[0]?.email,
          },
          company: {
            id: 1,
            companyName: "Nadra",
            legalName: "National Database and Registration Authority",
            fiscalYearForm: "2024-01-09T00:00:00.000+00:00",
            fiscalYearTo: "2025-01-09T00:00:00.000+00:00",
            logoPath: null,
            headerImage: null,
            clientId: {
              id: 1,
              name: "Admin User",
              numberOfUsers: 0,
              managementAccounts: 0,
              status: 1,
              clientpackage: "Silver",
              createdDate: "2024-02-07T10:50:11.441+00:00",
            },
          },
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
