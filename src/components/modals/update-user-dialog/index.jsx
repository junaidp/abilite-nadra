import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupUpdateUser,
  resetAddUserSuccess,
} from "../../../global-redux/reducers/settings/user-management/slice";
import { useSelector, useDispatch } from "react-redux";
import { setupGetAllCompanies } from "../../../global-redux/reducers/settings/company-management/slice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const UpdateUsertDialog = ({ setUpdateUserDialog, updateUserId }) => {
  const dispatch = useDispatch();
  const { addUserSuccess, loading, allUsers } = useSelector(
    (state) => state.setttingsUserManagement
  );
  const [extras, setExtras] = React.useState({
    email: "",
  });
  const [nullReportingTo, setNullReportingTo] = React.useState(false);
  const { user } = useSelector((state) => state?.auth);
  const { allCompanies } = useSelector(
    (state) => state?.settingsCompanyManagement
  );

  const initialState = {
    name: "",
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
      employeeName: Yup.string().required("Employee is required"),
      designation: Yup.string().required("Designation is required"),
      userHierarchy: Yup.string().required("User Hierarchy is required"),
      skillSet: Yup.string().required("Skill Set is required"),
      reportingTo: Yup.string().required("Reporting To is required"),
      company: Yup.string().required("Company  is required"),
    }),
    onSubmit: (values) => {
      if (!loading) {
        const reportingObj = allUsers?.find(
          (all) => all?.name === values?.reportingTo
        )?.employeeid;
        const currentUserObject = allUsers?.find(
          (all) => Number(all?.id) === Number(updateUserId)
        );
        dispatch(
          setupUpdateUser({
            ...currentUserObject,
            name: values?.name,
            employeeid: {
              ...currentUserObject?.employeeid,
              name: values?.employeeName,
              designation: values?.designation,
              userHierarchy: values?.userHierarchy,
              skillSet: values?.skillSet,
              reportingTo: reportingObj ? reportingObj : null,
            },
          })
        );
      }
    },
  });

  function handleClose() {
    setUpdateUserDialog(false);
    formik.resetForm({ values: initialState });
  }

  React.useEffect(() => {
    if (addUserSuccess) {
      setTimeout(() => {
        setUpdateUserDialog(false);
        formik.resetForm({ values: initialState });
        dispatch(resetAddUserSuccess());
      }, 500);
    }
  }, [addUserSuccess]);

  React.useEffect(() => {
    if (formik.values?.userHierarchy === "IAH") {
      setNullReportingTo(true);
    } else {
      setNullReportingTo(false);
    }
  }, [formik.values]);

  React.useEffect(() => {
    if (nullReportingTo) {
      formik.resetForm({ values: { ...formik.values, reportingTo: "null" } });
    } else {
      formik.resetForm({ values: { ...formik.values, reportingTo: "" } });
    }
  }, [nullReportingTo]);

  React.useEffect(() => {
    if (updateUserId) {
      const userObject = allUsers?.find(
        (user) => Number(user?.id) === Number(updateUserId)
      );
      setExtras({ email: userObject?.email });
      formik.resetForm({
        values: {
          name: userObject?.name,
          employeeName: userObject?.employeeid?.name,
          designation: userObject?.employeeid?.designation,
          userHierarchy: userObject?.employeeid?.userHierarchy,
          skillSet: userObject?.employeeid?.skillSet || "",
          reportingTo: allUsers?.find(
            (all) => all?.name === userObject?.employeeid?.reportingTo?.name
          )
            ? userObject?.employeeid?.reportingTo?.name
            : "",
          company: userObject?.company[0]?.companyName,
        },
      });
    }
  }, [updateUserId]);

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
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  className="form-control w-100"
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
                <TextField
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  value={extras?.email}
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-2">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="area">Designation:</label>
                <TextField
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
            <label htmlFor="userHierarchy" className="w-100">
              User Roles:
            </label>
            <Select
              id="userHierarchy"
              name="userHierarchy"
              className="form-control w-100 h-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userHierarchy}
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="IAH">IAH</MenuItem>
              <MenuItem value="Team_Lead">Team_Lead</MenuItem>
              <MenuItem value="Audit_Executive_2">Audit_Executive_2</MenuItem>
              <MenuItem value="Audit_Executive_1">Audit_Executive_1</MenuItem>
            </Select>
            {formik.touched.userHierarchy && formik.errors.userHierarchy && (
              <div className="error">{formik.errors.userHierarchy}</div>
            )}
          </div>
        </div>

        <div className="col-lg-12 mb-2">
          <label htmlFor="skillSet" className="w-100">
            Skill Set:
          </label>
          <Select
            id="skillSet"
            name="skillSet"
            className="form-control w-100 h-40"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.skillSet}
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Fraud">Fraud</MenuItem>
            <MenuItem value="Operations">Operations</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {formik.touched.skillSet && formik.errors.skillSet && (
            <div className="error">{formik.errors.skillSet}</div>
          )}
        </div>

        <div className="row">
          {!nullReportingTo && (
            <div className="col-lg-6">
              <label htmlFor="reportingTo" className="w-100">
                Reporting To:
              </label>
              <Select
                id="reportingTo"
                name="reportingTo"
                className="form-control w-100 h-40"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.reportingTo}
              >
                <MenuItem value="">Select User</MenuItem>
                {allUsers?.map((userVal, ind) => {
                  return (
                    <MenuItem value={userVal?.name} key={ind} className="h-80">
                      {userVal?.name}(
                      {userVal?.employeeid?.userHierarchy || "null"})
                    </MenuItem>
                  );
                })}
              </Select>
              {formik.touched.reportingTo && formik.errors.reportingTo && (
                <div className="error">{formik.errors.reportingTo}</div>
              )}
            </div>
          )}

          {nullReportingTo && (
            <div className="col-lg-6">
              <label htmlFor="area">Reporting To:</label>
              <TextField
                id="designation"
                name="designation"
                type="text"
                className="form-control"
                defaultValue="null"
                readOnly
                disabled
              />
            </div>
          )}

          {/* Default Remarks select field */}
          <div className="col-lg-6">
            <label htmlFor="company" className="w-100">
              Company:
            </label>
            <Select
              id="company"
              name="company"
              className="form-control w-100 h-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
            >
              <MenuItem value="">Select Company</MenuItem>
              {allCompanies?.map((userVal, ind) => {
                return (
                  <MenuItem
                    value={userVal?.companyName}
                    key={ind}
                    className="h-80"
                  >
                    {userVal?.companyName}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.touched.company && formik.errors.company && (
              <div className="error">{formik.errors.company}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${loading && "disabled"} mt-4`}
        >
          {loading ? "Loading" : "Update User"}
        </button>
      </form>

      <div className="row py-3 ">
        <div className="col-lg-12 text-end" onClick={handleClose}>
          <button className="btn btn-danger float-end">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsertDialog;
