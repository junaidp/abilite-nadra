import React from "react";
import moment from "moment";

const ReportFirstLayout = ({ singleInternalAuditReport }) => {
  return (
    <div>
      <div className="row  ">
        <div className="col-md-12">
          <div className="sub-heading ps-2  fw-bold">
            {singleInternalAuditReport?.jobName || "No name provided"}
          </div>
          <hr />
        </div>
      </div>
      <div className="border px-3 py-2 rounded">
        <div className="row mb-3">
          <div className="col-lg-6">
            <div>
              <label className="me-3">Report Date:</label>
              <input
                className="form-control w-100"
                placeholder="Select Date"
                type="date"
                name="reportDate"
                value={moment(singleInternalAuditReport?.reportDate).format(
                  "YYYY-MM-DD"
                )}
                disabled
                readOnly
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="me-3">Report Name:</label>
              <input
                className="form-control w-100"
                placeholder="Job Name"
                name="reportName"
                value={singleInternalAuditReport?.reportName || ""}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <div>
              <label className="me-3">Planned Start Date:</label>
              <input
                className="form-control w-100"
                placeholder="Select Date"
                type="date"
                disabled
                value={moment(
                  singleInternalAuditReport?.plannedStartDate
                ).format("YYYY-MM-DD")}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="me-3">Planned End Date:</label>
              <input
                className="form-control w-100"
                placeholder="Select Date"
                type="date"
                disabled
                value={moment(singleInternalAuditReport?.plannedEndDate).format(
                  "YYYY-MM-DD"
                )}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <div></div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <div>
              <label className="me-3">Planned Hours:</label>
              <input
                className="form-control w-100"
                placeholder="Enter planned Hours"
                type="text"
                disabled
                value={singleInternalAuditReport?.plannedHours}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <div>
              <label className="me-3   ">Risk Approach:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Risk Approach"
                type="text"
                disabled
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="me-3   ">Risk Rating:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Risk Rating"
                type="text"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <div>
              <label className="me-3   ">Department/Division/ Location:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Department/Division/ Location"
                type="text"
                disabled
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="me-3   ">
                Sub-Department/Sub-Division/Sub-Location:
              </label>
              <input
                className="form-control w-100"
                placeholder="Enter Sub-Department/Sub-Division/Sub-Location"
                type="text"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFirstLayout;
