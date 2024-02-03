import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupAddUser,
  resetAddUserSuccess,
} from "../../../global-redux/reducers/settings/user-management/slice";
import { useSelector, useDispatch } from "react-redux";
import { setupGetAllCompanies } from "../../../global-redux/reducers/settings/company-management/slice";

const UserManagementDialog = ({ setUserManagementDialog }) => {
  const dispatch = useDispatch();
  const { addUserSuccess, loading, allUsers } = useSelector(
    (state) => state.setttingsUserManagement
  );
  const { user } = useSelector((state) => state?.auth);
  const { allCompanies } = useSelector(
    (state) => state?.settingsCompanyManagement
  );
  const initialState = {
    name: "",
    email: "",
    password: "",
    employeeName: "",
    designation: "",
    userHierarchy: "",
    skillSet: "",
    reportingTo: "",
    company: "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      employeeName: Yup.string().required("Employee is required"),
      designation: Yup.string().required("Designation is required"),
      userHierarchy: Yup.string().required("User Hierarchy is required"),
      skillSet: Yup.string().required("Skill Set is required"),
      reportingTo: Yup.string().required("Reporting To is required"),
      company: Yup.string().required("Company To is required"),
    }),
    onSubmit: (values) => {
      if (!loading) {
        const selectedCompany = allCompanies?.find(
          (all) => Number(all?.id) === Number(values?.company)
        );
        const reportingObj = allUsers?.find(
          (all) => all?.name === values?.reportingTo
        )?.employeeid;
        dispatch(
          setupAddUser({
            name: values?.name,
            email: values?.email,
            password: values?.password,
            employeeid: {
              name: values?.employeeName,
              designation: values?.designation,
              userHierarchy: values?.userHierarchy,
              skillSet: values?.skillSet,
              reportingTo: reportingObj,
            },
            client: selectedCompany?.clientId,
            resetToken: "string",
            createdBy: user[0]?.user?.userId,
            company: [
              {
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
            ],
          })
        );
      }
    },
  });

  function handleClose() {
    setUserManagementDialog(false);
    formik.resetForm({ values: initialState });
  }

  React.useEffect(() => {
    if (addUserSuccess) {
      setTimeout(() => {
        setUserManagementDialog(false);
        formik.resetForm({ values: initialState });
        dispatch(resetAddUserSuccess());
      }, 500);
    }
  }, [addUserSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllCompanies());
  }, []);

  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Add New User</h2>
        </div>
      </header>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6 mb-2">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="area">Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </div>
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>

          <div className="col-lg-6 mb-2">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="area">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-2">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="area">Password:</label>
                <input
                  id="password"
                  name="password"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-2 col-lg-6">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="area">Employee Name:</label>
                <input
                  id="employeeName"
                  name="employeeName"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employeeName}
                />
              </div>
            </div>
            {formik.touched.employeeName && formik.errors.employeeName && (
              <div className="error">{formik.errors.employeeName}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-2">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="area">Designation:</label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.designation}
                />
              </div>
            </div>
            {formik.touched.designation && formik.errors.designation && (
              <div className="error">{formik.errors.designation}</div>
            )}
          </div>

          <div className="col-lg-6">
            <label htmlFor="defaultRemarks" className="w-100">
              User Hierarchy:
            </label>
            <select
              id="userHierarchy"
              name="userHierarchy"
              className="form-control w-100 h-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userHierarchy}
            >
              <option value="">Select</option>
              <option value="IAH">IAH</option>
              <option value="Team_Lead">Team_Lead</option>
              <option value="Audit_Executive_2">Audit_Executive_2</option>
              <option value="Audit_Executive_1">Audit_Executive_1</option>
            </select>
            {/* Add more options as needed */}
            {formik.touched.userHierarchy && formik.errors.userHierarchy && (
              <div className="error">{formik.errors.userHierarchy}</div>
            )}
          </div>
        </div>

        <div className="col-lg-12 mb-2">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="area">Skill Set:</label>
              <input
                id="skillSet"
                name="skillSet"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.skillSet}
              />
            </div>
          </div>
          {formik.touched.skillSet && formik.errors.skillSet && (
            <div className="error">{formik.errors.skillSet}</div>
          )}
        </div>

        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="defaultRemarks" className="w-100">
              Reporting To:
            </label>
            <select
              id="reportingTo"
              name="reportingTo"
              className="form-control w-100 h-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reportingTo}
            >
              <option value="">Select User</option>
              {allUsers?.map((userVal, ind) => {
                return (
                  <option value={userVal?.name} key={ind}>
                    {userVal?.name}
                  </option>
                );
              })}
            </select>
            {/* Add more options as needed */}
            {formik.touched.reportingTo && formik.errors.reportingTo && (
              <div className="error">{formik.errors.reportingTo}</div>
            )}
          </div>

          {/* Default Remarks select field */}
          <div className="col-lg-6">
            <label htmlFor="defaultRemarks" className="w-100">
              Company:
            </label>
            <select
              id="company"
              name="company"
              className="form-control w-100 h-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
            >
              <option value="">Select One</option>
              {allCompanies?.map((item, ind) => {
                return (
                  <option value={item?.id} key={ind}>
                    {item?.companyName}
                  </option>
                );
              })}
            </select>
            {/* Add more options as needed */}
            {formik.touched.company && formik.errors.company && (
              <div className="error">{formik.errors.company}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${loading && "disabled"} mt-2`}
        >
          {loading ? "Loading" : "Add User"}
        </button>
      </form>

      <div className="row py-3">
        <div className="col-lg-12 text-end" onClick={handleClose}>
          <button className="btn btn-primary float-end">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDialog;
