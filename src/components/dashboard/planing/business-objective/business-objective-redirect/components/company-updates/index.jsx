import React from "react";

const CompanyUpdates = ({
  planingEngagementSingleObject,
  object,
  handleChange,
  handleUpdateBusinessObjective,
  loading,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          {planingEngagementSingleObject?.companyUpdate && (
            <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
          )}
          Company Updates
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="d-flex justify-content-between">
            <label>Company Update</label>
            <a href="#" className="link-underline-muted decoration-none">
              AI Generate
            </a>
          </div>
          <textarea
            className="form-control w-100"
            placeholder="Enter update"
            type="textarea"
            name="companyUpdate"
            value={object?.companyUpdate}
            onChange={handleChange}
          ></textarea>
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
          <button
            className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow ${
              loading && "disabled"
            }`}
            onClick={handleUpdateBusinessObjective}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle"></i>
            </span>
            {loading ? "loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyUpdates;
