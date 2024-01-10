import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  resetCompanyRegisterSuccess,
  setupRegisterCompany,
} from "../../../global-redux/reducers/company/slice";

const AddCompanyDialog = ({ setAddCompantDialog }) => {
  let dispatch = useDispatch();
  let { registerCompanySuccess, loading } = useSelector(
    (state) => state.company
  );
  const [initialState, setInitialState] = React.useState({
    companyName: "",
    fiscalYearFrom: "",
    fiscalYearTo: "",
    legalName: "",
    id: 1,
    clientId: {
      clientPackage: "Trial",
      managementAccounts: "",
      name: "",
      status: 1,
      id: 1,
      numberOfUsers: "",
      createdDate: new Date().toDateString(),
    },
  });
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company Name is required"),
      fiscalYearFrom: Yup.date().required("Fiscal Year From is required"),
      fiscalYearTo: Yup.date()
        .required("Fiscal Year To is required")
        .min(
          Yup.ref("fiscalYearFrom"),
          "Fiscal Year To must be after Fiscal Year From"
        ),
      legalName: Yup.string().required("Legal Name is required"),
      clientId: Yup.object().shape({
        clientPackage: Yup.string().required("Client Package is required"),
        managementAccounts: Yup.number().required(
          "Management Accounts is required"
        ),
        numberOfUsers: Yup.number().required("Number Of Users  is required"),
        name: Yup.string().required("Name is required"),
      }),
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
      fiscalYearFrom: "",
      fiscalYearTo: "",
      legalName: "",
      clientId: {
        clientPackage: "Trial",
        managementAccounts: "",
        name: "",
      },
    });
  }
  React.useEffect(() => {
    if (registerCompanySuccess) {
      setTimeout(() => {
        setInitialState({
          companyName: "",
          fiscalYearFrom: "",
          fiscalYearTo: "",
          legalName: "",
          clientId: {
            clientPackage: "Trial",
            managementAccounts: "",
            name: "",
          },
        });
        dispatch(resetCompanyRegisterSuccess());
        setAddCompantDialog(false);
      }, 500);
    }
  }, [registerCompanySuccess]);

  return (
    <div className="px-4 py-4">
      <header className="section-header mt-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="mx-2 m-2 heading">Add New Company</h2>
        </div>
      </header>
      <form onSubmit={formik.handleSubmit}>
        {/* Company Name */}
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

        <div className="row">
          {/* Fiscal Year From */}
          <div className="col-lg-6 mt-2">
            <label htmlFor="fiscalYearFrom">Fiscal Year From:</label>
            <input
              id="fiscalYearFrom"
              name="fiscalYearFrom"
              type="date"
              className="form-control w-100"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fiscalYearFrom}
            />
            {formik.touched.fiscalYearFrom && formik.errors.fiscalYearFrom ? (
              <div className="error">{formik.errors.fiscalYearFrom}</div>
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

        {/* Client ID */}
        {/* Client Package */}
        <div className="col-lg-12 mt-2">
          <label htmlFor="clientId.clientPackage">Client Package:</label>
          <select
            id="clientId.clientPackage"
            name="clientId.clientPackage"
            className="form-select w-100"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.clientId.clientPackage}
          >
            <option value="Trial">Trial</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
          {formik.touched.clientId?.clientPackage &&
          formik.errors.clientId?.clientPackage ? (
            <div className="error">{formik.errors.clientId.clientPackage}</div>
          ) : null}
        </div>

        {/* Management Accounts */}
        <div className="row mb-2">
          <div className="col-lg-6 mt-2">
            <label htmlFor="clientId.managementAccounts">
              Management Accounts:
            </label>
            <input
              id="clientId.managementAccounts"
              className="form-control w-100"
              name="clientId.managementAccounts"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientId.managementAccounts}
            />
            {formik.touched.clientId?.managementAccounts &&
            formik.errors.clientId?.managementAccounts ? (
              <div className="error">
                {formik.errors.clientId.managementAccounts}
              </div>
            ) : null}
          </div>

          {/* Name */}
          <div className="col-lg-6 mt-2">
            <label htmlFor="clientId.name">Name:</label>
            <input
              id="clientId.name"
              name="clientId.name"
              type="text"
              className="form-control w-100"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientId.name}
            />
            {formik.touched.clientId?.name && formik.errors.clientId?.name ? (
              <div className="error">{formik.errors.clientId.name}</div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-12 mb-2">
          <label htmlFor="clientId.numberOfUsers">Number Of Users:</label>
          <input
            id="clientId.numberOfUsers"
            className="form-control w-100"
            name="clientId.numberOfUsers"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.clientId.numberOfUsers}
          />
          {formik.touched.clientId?.numberOfUsers &&
          formik.errors.clientId?.numberOfUsers ? (
            <div className="error">{formik.errors.clientId.numberOfUsers}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"}`}
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
