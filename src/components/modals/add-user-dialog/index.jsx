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
  const { user } = useSelector((state) => state?.auth);

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
              skillSet: values?.skillSet,
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
    if (
      formik.values?.userHierarchy === "IAH" ||
      formik.values?.userHierarchy === "Management_Auditee" ||
      allUsers[0]?.error === "Not Found"
    ) {
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
