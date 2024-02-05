import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setupEditCheckListItem } from "../../../global-redux/reducers/settings/check-list/slice";
import { useSelector, useDispatch } from "react-redux";

const EditCheckListItemDialog = ({ setShowEditCheckListItemDialog }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { subCheckListAddSuccess, loading, currentSubCheckListItem } =
    useSelector((state) => state.setttingsCheckList);
  const initialState = {
    area: currentSubCheckListItem?.area,
    subject: currentSubCheckListItem?.subject,
    particulars: currentSubCheckListItem?.particulars,
    observation: currentSubCheckListItem?.observation,
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      area: Yup.string().required("Area is required"),
      subject: Yup.string().required("Subject is required"),
      particulars: Yup.string().required("Particulars is required"),
      observation: Yup.string().required("Observation is required"),
    }),
    onSubmit: (values) => {
      if (!loading) {
        dispatch(
          setupEditCheckListItem({
            ...currentSubCheckListItem,
            area: values?.area,
            subject: values?.subject,
            particulars: values?.particulars,
            observation: values?.observation,
          })
        );
      }
    },
  });

  function handleClose() {
    setShowEditCheckListItemDialog(false);
    formik.resetForm({ values: initialState });
  }

  React.useEffect(() => {
    if (subCheckListAddSuccess) {
      setTimeout(() => {
        setShowEditCheckListItemDialog(false);
        formik.resetForm({ values: initialState });
      }, 500);
    }
  }, [subCheckListAddSuccess]);
  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Edit Check List Item</h2>
        </div>
      </header>
      <form onSubmit={formik.handleSubmit}>
        {/* Area input field */}
        <div className="row mb-2">
          <div className="col-lg-11">
            <div className="form-group">
              <label htmlFor="area">Area:</label>
              <input
                id="area"
                name="area"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.area}
              />
            </div>
          </div>
          {formik.touched.area && formik.errors.area && (
            <div className="error">{formik.errors.area}</div>
          )}
        </div>

        {/* Subject input field */}
        <div className="row mb-2">
          <div className="col-lg-11">
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject && (
                <div className="error">{formik.errors.subject}</div>
              )}
            </div>
          </div>
        </div>

        {/* Particulars input field */}
        <div className="row mb-2">
          <div className="col-lg-12">
            <label htmlFor="particulars">Particulars:</label>
            <textarea
              id="particulars"
              name="particulars"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.particulars}
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 1500 words
            </label>
            {formik.touched.particulars && formik.errors.particulars && (
              <div className="error">{formik.errors.particulars}</div>
            )}
          </div>
        </div>

        {/* Observation input field */}
        <div className="row mb-2">
          <div className="col-lg-12">
            <label htmlFor="observation">Observation:</label>
            <textarea
              id="observation"
              name="observation"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.observation}
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 1500 words
            </label>
            {formik.touched.observation && formik.errors.observation && (
              <div className="error">{formik.errors.observation}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${loading && "disabled"}`}
        >
          {loading ? "Loading" : "Edit"}
        </button>
      </form>

      <div className="row py-3">
        <div className="col-lg-12 text-end" onClick={handleClose}>
          <button className="btn btn-danger float-end">Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditCheckListItemDialog;
