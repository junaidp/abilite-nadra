import React from "react";
import { useSelector } from "react-redux";

const CompanyUpdates = ({
  planingEngagementSingleObject,
  object,
  handleChange,
  handleUpdateBusinessObjective,
  loading,
}) => {
  const { user } = useSelector((state) => state?.auth);
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
        <div className="accordion-body pb-55">
          <div className="d-flex justify-content-between">
            <label className="mb-2">Company Update</label>
          </div>
          <textarea
            className="form-control w-100 min-height-100"
            placeholder="Enter update"
            type="textarea"
            name="companyUpdate"
            value={object?.companyUpdate}
            onChange={handleChange}
            disabled={
              planingEngagementSingleObject?.locked === true ||
              (planingEngagementSingleObject?.complete === true &&
                planingEngagementSingleObject?.locked === false &&
                user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                ? true
                : false
            }
            maxlength="500"
          ></textarea>
          <p className="word-limit-info label-text mb-2">
            Maximum 500 characters
          </p>
          {(planingEngagementSingleObject?.complete === false ||
            (planingEngagementSingleObject?.complete === true &&
              planingEngagementSingleObject?.locked === false &&
              user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
            <button
              className={`btn btn-labeled btn-primary px-3 mb-2  shadow float-end ${
                loading && "disabled"
              }`}
              onClick={handleUpdateBusinessObjective}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle"></i>
              </span>
              {loading ? "loading..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyUpdates;
