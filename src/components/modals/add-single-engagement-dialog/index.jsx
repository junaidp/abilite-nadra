import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupAddNewEngagement,
  setupGetAllEngagements,
  resetAddEngagementSuccess,
} from "../../../global-redux/reducers/planing/engagement/slice";
import { useDispatch, useSelector } from "react-redux";

const AddSingleEngagementDialog = ({ setShowAddSingleEngagement }) => {
  const { engagementAddSuccess, loading,allEngagements } = useSelector(
    (state) => state.planingEngagements
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);

  const dispatch = useDispatch();
  const initialState = {
    engagementName: "",
    natureThrough: "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      engagementName: Yup.string().required("Engagement Name is required"),
      natureThrough: Yup.string().required("Nature Through is required"),
    }),
    onSubmit: (values) => {
      if (!loading) {
        const companyId = user[0]?.company.find(
          (item) => item?.companyName === company
        )?.id;
        const userId = user[0]?.id;
        dispatch(
          setupAddNewEngagement({
            ...values,
            initiatedBy: userId,
            company: companyId,
          })
        );
      }
    },
  });

  function handleClose() {
    setShowAddSingleEngagement(false);
    formik.resetForm({ values: initialState });
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      setTimeout(() => {
        const companyId = user[0]?.company.find(
          (item) => item?.companyName === company
        )?.id;
        setShowAddSingleEngagement(false);
        formik.resetForm({ values: initialState });
        dispatch(setupGetAllEngagements(companyId));
        dispatch(resetAddEngagementSuccess());
      }, 500);
    }
  }, [engagementAddSuccess]);

  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Add New Enagement</h2>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit}>
        {/* Engagement Name input field */}
        <div className="col-lg-2 label-text">Engagement Name:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="engagementName"
              name="engagementName"
              className="form-control"
              placeholder="Enter"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.engagementName}
            />
            {formik.touched.engagementName && formik.errors.engagementName && (
              <div className="error">{formik.errors.engagementName}</div>
            )}
          </div>
        </div>

        {/* Nature Through input field */}
        <div className="col-lg-2 label-text mt-2">Nature Through:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="natureThrough"
              name="natureThrough"
              className="form-control"
              placeholder="Enter"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.natureThrough}
            />
            {formik.touched.natureThrough && formik.errors.natureThrough && (
              <div className="error">{formik.errors.natureThrough}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary mt-2 ${loading && "disabled"}`}
        >
          {loading ? "Loading.." : "Submit"}
        </button>
      </form>

      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button className="btn btn-primary float-end" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSingleEngagementDialog;
