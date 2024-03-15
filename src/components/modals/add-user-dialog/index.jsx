import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupAddUser,
  resetAddUserSuccess,
} from "../../../global-redux/reducers/settings/user-management/slice";
import { useSelector, useDispatch } from "react-redux";
import Form from "./component/Form";

const UserManagementDialog = ({ setUserManagementDialog }) => {
  const dispatch = useDispatch();
  const { addUserSuccess, loading, allUsers } = useSelector(
    (state) => state.setttingsUserManagement
  );
  const [nullReportingTo, setNullReportingTo] = React.useState(false);
  const [nullSkillSet, setNullSkillSet] = React.useState(false);
  const { user } = useSelector((state) => state?.auth);

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, one special character, and must be at least 8 characters long"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
        const currentCompany = user[0]?.userId?.company?.find(
          (item) => item?.companyName === values?.company
        );
        dispatch(
          setupAddUser({
            name: values?.name,
            email: values?.email,
            password: values?.password,
            employeeid: {
              name: values?.employeeName,
              designation: values?.designation,
              userHierarchy: values?.userHierarchy,
              skillSet: values?.skillSet === "null" ? null : values?.skillSet,
              reportingTo: reportingObj ? reportingObj : null,
            },
            client: currentCompany?.clientId,
            resetToken: "string",
            createdBy: user[0]?.user?.userId,
            company: [currentCompany],
          })
        );
      }
    },
  });

  function handleClose() {
    setUserManagementDialog(false);
    formik.resetForm({ values: initialState });
    setNullReportingTo(false);
    setNullSkillSet(false);
  }

  React.useEffect(() => {
    if (addUserSuccess) {
      setTimeout(() => {
        setUserManagementDialog(false);
        formik.resetForm({ values: initialState });
        dispatch(resetAddUserSuccess());
        setNullReportingTo(false);
        setNullSkillSet(false);
      }, 500);
    }
  }, [addUserSuccess]);

  React.useEffect(() => {
    if (
      formik.values?.userHierarchy === "IAH" ||
      allUsers[0]?.error === "Not Found"
    ) {
      setNullReportingTo(true);
      setNullSkillSet(false);
      formik.resetForm({
        values: { ...formik.values, reportingTo: "null", skillSet: "" },
      });
    }
  }, [formik.values.userHierarchy]);

  React.useEffect(() => {
    if (formik.values?.userHierarchy === "Management_Auditee") {
      formik.resetForm({
        values: { ...formik.values, reportingTo: "null", skillSet: "null" },
      });
      setNullReportingTo(true);
      setNullSkillSet(true);
    }
  }, [formik.values.userHierarchy]);

  React.useEffect(() => {
    if (
      formik.values?.userHierarchy === "Team_Lead" ||
      formik.values?.userHierarchy === "Audit_Executive_2" ||
      formik.values?.userHierarchy === "Audit_Executive_1"
    ) {
      setNullReportingTo(false);
      setNullSkillSet(false);
      formik.resetForm({
        values: { ...formik.values, reportingTo: "", skillSet: "" },
      });
    }
  }, [formik.values.userHierarchy]);

  React.useEffect(() => {
    if (user[0]?.token) {
      if (user[0]?.userId?.company[0]) {
        formik.resetForm({
          values: {
            ...formik.values,
            company: user[0]?.userId?.company[0]?.companyName,
          },
        });
      }
    }
  }, [user]);

  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Add New User</h2>
        </div>
      </header>
      {user[0]?.userId && (
        <Form
          formik={formik}
          user={user}
          allUsers={allUsers}
          nullReportingTo={nullReportingTo}
          loading={loading}
          nullSkillSet={nullSkillSet}
        />
      )}

      <div className="row py-3 ">
        <div className="col-lg-12 text-end">
          <button className="btn btn-danger float-end" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDialog;
