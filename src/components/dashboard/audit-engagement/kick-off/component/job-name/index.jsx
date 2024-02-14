import React from "react";
import moment from "moment";
const JobName = ({ currentAuditEngagement }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-body">
        <div className="container">
          <div className="row mb-3 f-13">
            <div className="col-lg-6 px-3 d-flex justify-content-between">
              <div className="fw-bold">Planned Start Date:</div>
              <div className="">
                {moment(currentAuditEngagement?.plannedStartDate).format(
                  "DD-MM-YYYY"
                ) || "null"}
              </div>
            </div>
            <div className="col-lg-6 px-3 d-flex justify-content-between">
              <div className="fw-bold">Process</div>
              <div className="">
                {" "}
                {moment(currentAuditEngagement?.plannedEndDate).format(
                  "DD-MM-YYYY"
                ) || "null"}
              </div>
            </div>
          </div>

          <div className="row mb-3 f-13">
            <div className="col-lg-6 px-3 d-flex justify-content-between">
              <div className="fw-bold">Planned End Date:</div>
              <div className="">
                {moment(currentAuditEngagement?.plannedEndDate).format(
                  "DD-MM-YYYY"
                ) || "null"}
              </div>
            </div>
            <div className="col-lg-6 px-3 d-flex justify-content-between">
              <div className="fw-bold">Sub Process</div>
              <div className="">28-09-2024</div>
            </div>
          </div>

          <div className="row mb-3 f-13">
            <div className="col-lg-6 px-3 d-flex justify-content-between">
              <div className="fw-bold">Job Type:</div>
              <div className="">
                {currentAuditEngagement?.jobType || "null"}
              </div>
            </div>
          </div>

          <div className="row mb-3 f-13">
            <div className="col-lg-6 px-3 d-flex justify-content-between">
              <div className="fw-bold">Location:</div>
              <div className="">Germany</div>
            </div>
          </div>

          <div className="row mb-3 f-13">
            <div className="col-lg-6 px-3 d-flex justify-content-between">
              <div className="fw-bold">Sub-Location:</div>
              <div className="">Hamburg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobName;
