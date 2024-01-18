import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupEditSingleEngagement,
  setupGetAllEngagements,
  resetAddEngagementSuccess,
} from "../../../global-redux/reducers/planing/engagement/slice";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";

const EditSingleEngagementDialog = ({ setShowEditSingleEngagementDialog }) => {
  const { engagementAddSuccess, loading, selectedSingleEngagementItem } =
    useSelector((state) => state.planingEngagements);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);

  const dispatch = useDispatch();
  const initialState = {
    engagementName: selectedSingleEngagementItem?.engagementName || "",
    natureThrough: selectedSingleEngagementItem?.natureThrough || "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      engagementName: Yup.string().required("Engagement Name is required"),
      natureThrough: Yup.string().required("Nature Through is required"),
    }),
    onSubmit: (values) => {
      if (!loading) {
        // dispatch(
        //   setupEditSingleEngagement(
        //     `?id=${selectedSingleEngagementItem?.id}&engagementName=${values?.engagementName}&natureThrough=${values?.natureThrough}&initiatedBy=${selectedSingleEngagementItem?.initiatedBy}&company=${selectedSingleEngagementItem?.company}`
        //   )
        // );
        dispatch(
          setupEditSingleEngagement({
            ...selectedSingleEngagementItem,
            engagementName: values?.engagementName,
            natureThrough: values?.natureThrough,
          })
        );
      }
    },
  });

  function handleClose() {
    setShowEditSingleEngagementDialog(false);
    formik.resetForm({ values: initialState });
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      setTimeout(() => {
        const companyId = user[0]?.company.find(
          (item) => item?.companyName === company
        )?.id;
        setShowEditSingleEngagementDialog(false);
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
          <h2 className=" heading">Edit New Enagement</h2>
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

export default EditSingleEngagementDialog;
