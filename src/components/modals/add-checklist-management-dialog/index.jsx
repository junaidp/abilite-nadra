import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setupAddCheckListItem,
  resetAddCheckListSuccess,
  resetCheckListId,
} from "../../../global-redux/reducers/settings/check-list/slice";
import { useSelector, useDispatch } from "react-redux";
import RichTextEditor from "../../../components/common/rich-text/index";
import { changeCommonRichTextFieldState } from "../../../global-redux/reducers/common/slice";

const AddCheckListManagementDialog = ({ setCheckListManagementDialog }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { resetRichTextFieldState } = useSelector((state) => state.common);
  const { checkListAddSuccess, editLoading, checkListId } = useSelector(
    (state) => state.setttingsCheckList
  );
  const initialState = {
    area: "",
    subject: "",
    particulars: "",
    observation: "",
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
          setupAddCheckListItem({
            ...values,
            userEmail: user[0]?.email,
            checklistId: checkListId,
          })
        );
      }
    },
  });

  function onContentChange(_, content) {
    formik.resetForm({ values: { ...formik.values, observation: content } });
  }

  function handleClose() {
    setCheckListManagementDialog(false);
    dispatch(resetCheckListId());
    formik.resetForm({ values: initialState });
  }

  React.useEffect(() => {
    if (checkListAddSuccess) {
      formik.resetForm({ values: initialState });
      dispatch(resetAddCheckListSuccess());
      dispatch(changeCommonRichTextFieldState(true));
    }
  }, [checkListAddSuccess]);

  React.useEffect(() => {
    if (resetRichTextFieldState === true) {
      setTimeout(() => {
        dispatch(changeCommonRichTextFieldState(false));
      }, 3000);
    }
  }, [resetRichTextFieldState]);
  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Add CheckList</h2>
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
            ></textarea>

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
              initialValue=""
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
          {editLoading ? "Loading..." : "Save And Submit"}
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

export default AddCheckListManagementDialog;
