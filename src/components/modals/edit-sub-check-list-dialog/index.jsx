import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupEditCheckListItem,
  resetAddCheckListSuccess,
} from "../../../global-redux/reducers/settings/check-list/slice";
import { useSelector, useDispatch } from "react-redux";
import RichTextEditor from "../../../components/common/rich-text/index";

const EditCheckListItemDialog = ({ setShowEditCheckListItemDialog }) => {
  const dispatch = useDispatch();
  const { checkListAddSuccess, editLoading, currentSubCheckListItem } =
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
      if (!editLoading) {
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

  function onContentChange(_, content) {
    formik.resetForm({ values: { ...formik.values, observation: content } });
  }

  React.useEffect(() => {
    if (checkListAddSuccess) {
      dispatch(resetAddCheckListSuccess());
      formik.resetForm({ values: initialState });
      setShowEditCheckListItemDialog(false);
    }
  }, [checkListAddSuccess]);
  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Edit CheckList Item</h2>
        </div>
      </header>
      <form onSubmit={formik.handleSubmit}>
        {/* Area input field */}
        <div className="row mb-2">
          <div className="col-lg-12">
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
          <div className="col-lg-12">
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
              className="form-control h-120"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.particulars}
              maxlength="500"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 500 characters
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
            <RichTextEditor
              onContentChange={onContentChange}
              initialValue={formik.values.observation}
              name="observation"
              editable={true}
            />

            {formik.touched.observation && formik.errors.observation && (
              <div className="error">{formik.errors.observation}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${editLoading && "disabled"} mt-4`}
        >
          {editLoading ? "Loading..." : "Edit"}
        </button>
      </form>

      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button className="btn btn-danger float-end" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCheckListItemDialog;
