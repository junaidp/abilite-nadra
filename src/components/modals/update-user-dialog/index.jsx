import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupUpdateUser,
  resetAddUserSuccess,
} from "../../../global-redux/reducers/settings/user-management/slice";
import { useSelector, useDispatch } from "react-redux";
import Form from "./components/Form";

const UpdateUsertDialog = ({ setUpdateUserDialog, updateUserObject }) => {
  const dispatch = useDispatch();
  const { addUserSuccess, loading, allUsers } = useSelector(
    (state) => state.setttingsUserManagement
  );
  const { user } = useSelector((state) => state?.auth);
  const [nullReportingTo, setNullReportingTo] = React.useState(false);
  const [nullSkillSet, setNullSkillSet] = React.useState(false);
  const initialState = {
    name: updateUserObject?.name,
    employeeName: updateUserObject?.employeeid?.name,
    designation: updateUserObject?.employeeid?.designation,
    userHierarchy: updateUserObject?.employeeid?.userHierarchy,
    skillSet: updateUserObject?.employeeid?.skillSet
      ? updateUserObject?.employeeid?.skillSet
      : "null",
    reportingTo: updateUserObject?.employeeid?.reportingTo?.name
      ? updateUserObject?.employeeid?.reportingTo?.name
      : "null",
    company: updateUserObject?.company[0]?.companyName,
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
          (all) => all?.employeeid?.name === values?.reportingTo
        )?.employeeid;
        const currentUserObject = allUsers?.find(
          (all) => Number(all?.id) === Number(updateUserObject?.id)
        );
        if (!loading) {
          dispatch(
            setupUpdateUser({
              ...currentUserObject,
              userDto: {
                userName: values?.name,
                companyId: currentUserObject?.company[0]?.id,
              },
              employeeid: {
                ...currentUserObject?.employeeid,
                name: values?.employeeName,
                designation: values?.designation,
                userHierarchy: values?.userHierarchy,
                skillSet: values?.skillSet === "null" ? null : values?.skillSet,
                reportingTo: reportingObj ? reportingObj : null,
              },
            })
          );
        }
      }
    },
  });

  function handleClose() {
    setUpdateUserDialog(false);
    formik.resetForm({ values: initialState });
    setNullReportingTo(false);
    setNullSkillSet(false);
  }

  React.useEffect(() => {
    if (addUserSuccess) {
      setTimeout(() => {
        setUpdateUserDialog(false);
        formik.resetForm({ values: initialState });
        dispatch(resetAddUserSuccess());
        setNullReportingTo(false);
        setNullSkillSet(false);
      }, 500);
    }
  }, [addUserSuccess]);

  React.useEffect(() => {
    if (formik.values?.userHierarchy === "IAH" || allUsers?.length === 1) {
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
    if (updateUserObject?.employeeid?.reportingTo === null) {
      setNullReportingTo(true);
    }
    if (updateUserObject?.employeeid?.skillSet === null) {
      setNullSkillSet(true);
    }
    formik.resetForm({
      values: {
        ...formik.values,
        reportingTo: updateUserObject?.employeeid?.reportingTo?.name
          ? updateUserObject?.employeeid?.reportingTo?.name
          : "null",
        skillSet: updateUserObject?.employeeid?.skillSet
          ? updateUserObject?.employeeid?.skillSet
          : "null",
      },
    });
  }, [updateUserObject]);

  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Update User</h2>
        </div>
      </header>
      <Form
        formik={formik}
        nullReportingTo={nullReportingTo}
        allUsers={allUsers?.filter(
          (all) => Number(all?.id) !== Number(updateUserObject?.id)
        )}
        loading={loading}
        nullSkillSet={nullSkillSet}
        user={user}
        email={updateUserObject?.email}
      />

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

export default UpdateUsertDialog;
