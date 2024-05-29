import React from "react";

const Buttons = ({
  pdfLoading,
  editable,
  loading,
  handleSaveReport,
  handleEditReport,
}) => {
  return (
    <div className="row mb-3">
      <div className="col-lg-12 d-flex justify-content-between">
        <div
          className={`btn btn-labeled btn-primary px-3 shadow fitContent ${
            pdfLoading && "disabled"
          }`}
        >
          <span className="btn-label me-2">
            <i className="fa fa-file-pdf f-18"></i>
          </span>
          {pdfLoading ? "Loading" : "Download PDF"}
        </div>
        {editable === "notApplicable" && (
          <div
            className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${
              loading && "disabled"
            }`}
            onClick={handleSaveReport}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {loading ? "Loading..." : "Save"}
          </div>
        )}
        {editable === "true" && (
          <div
            className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${
              loading && "disabled"
            }`}
            onClick={handleEditReport}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {loading ? "Loading..." : "Edit"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Buttons;
