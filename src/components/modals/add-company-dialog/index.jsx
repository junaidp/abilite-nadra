import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  setupRegisterCompany,
} from "../../../global-redux/reducers/settings/company-management/slice";

const AddCompanyDialog = ({ setAddCompantDialog }) => {
  let dispatch = useDispatch();
  let { companyAddSuccess, loading } = useSelector(
    (state) => state.settingsCompanyManagement
  );
  const [initialState, setInitialState] = React.useState({
    companyName: "",
    fiscalYearForm: "",
    fiscalYearTo: "",
    legalName: "",
    userEmail: "",
  });
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company Name is required"),
      fiscalYearForm: Yup.date().required("Fiscal Year From is required"),
      fiscalYearTo: Yup.date()
        .required("Fiscal Year To is required")
        .min(
          Yup.ref("fiscalYearForm"),
          "Fiscal Year To must be after Fiscal Year From"
        ),
      legalName: Yup.string().required("Legal Name is required"),
      userEmail: Yup.string().required("User Email is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      if (!loading) {
        dispatch(setupRegisterCompany(values));
      }
    },
  });

  function handleClose() {
    setAddCompantDialog(false);
    setInitialState({
      companyName: "",
      fiscalYearForm: "",
      fiscalYearTo: "",
      legalName: "",
      userEmail: "",
    });
  }
  React.useEffect(() => {
    if (companyAddSuccess) {
      setTimeout(() => {
        setInitialState({
          companyName: "",
          fiscalYearForm: "",
          fiscalYearTo: "",
          legalName: "",
          userEmail: "",
        });
        setAddCompantDialog(false);
      }, 500);
    }
  }, [companyAddSuccess]);

  return (
    <div className="px-4 py-4">
      <header className="section-header mt-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="mx-2 m-2 heading">Add New Company</h2>
        </div>
      </header>
      <form onSubmit={formik.handleSubmit}>
        <div className="col-lg-12 mt-2">
          <label htmlFor="companyName">Company Name:</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            className="form-control w-100"
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <div className="error">{formik.errors.companyName}</div>
          ) : null}
        </div>

        <div className="col-lg-12 mt-2">
          <label htmlFor="companyName">User Email:</label>
          <input
            id="userEmail"
            name="userEmail"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userEmail}
            className="form-control w-100"
          />
          {formik.touched.userEmail && formik.errors.userEmail ? (
            <div className="error">{formik.errors.userEmail}</div>
          ) : null}
        </div>

        <div className="row">
          {/* Fiscal Year From */}
          <div className="col-lg-6 mt-2">
            <label htmlFor="fiscalYearForm">Fiscal Year From:</label>
            <input
              id="fiscalYearForm"
              name="fiscalYearForm"
              type="date"
              className="form-control w-100"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fiscalYearForm}
            />
            {formik.touched.fiscalYearForm && formik.errors.fiscalYearForm ? (
              <div className="error">{formik.errors.fiscalYearForm}</div>
            ) : null}
          </div>

          {/* Fiscal Year To */}
          <div className="col-lg-6 mt-2">
            <label htmlFor="fiscalYearTo">Fiscal Year To:</label>
            <input
              id="fiscalYearTo"
              name="fiscalYearTo"
              type="date"
              className="form-control w-100"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fiscalYearTo}
            />
            {formik.touched.fiscalYearTo && formik.errors.fiscalYearTo ? (
              <div className="error">{formik.errors.fiscalYearTo}</div>
            ) : null}
          </div>
        </div>

        {/* Legal Name */}
        <div className="col-lg-12 mt-2">
          <label htmlFor="legalName">Legal Name:</label>
          <input
            id="legalName"
            name="legalName"
            type="text"
            className="form-control w-100"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.legalName}
          />
          {formik.touched.legalName && formik.errors.legalName ? (
            <div className="error">{formik.errors.legalName}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${loading && "disabled"} mt-4`}
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </form>

      <div className="row py-4 px-4">
        <div className="col-lg-12 text-end">
          <button className="btn btn-danger float-end" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyDialog;
