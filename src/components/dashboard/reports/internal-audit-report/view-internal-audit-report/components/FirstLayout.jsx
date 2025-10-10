import React, { useMemo } from "react";
import moment from "moment";
import Chip from "@mui/material/Chip";

/**
 * Displays the summary information for a single internal audit report.
 * Includes job details, planning dates, department info, and assigned resources.
 */
const ReportFirstLayout = ({ singleInternalAuditReport }) => {
  const report = singleInternalAuditReport || {};

  // ✅ Memoized values for cleaner formatting
  const formattedReportDate = useMemo(
    () => moment.utc(report?.reportDate).format("YYYY-MM-DD"),
    [report?.reportDate]
  );

  const formattedStartDate = useMemo(
    () => moment.utc(report?.plannedStartDate).format("YYYY-MM-DD"),
    [report?.plannedStartDate]
  );

  const formattedEndDate = useMemo(
    () => moment.utc(report?.plannedEndDate).format("YYYY-MM-DD"),
    [report?.plannedEndDate]
  );

  // ✅ Helper to render chip groups or empty message
  const renderChipGroup = (list, extractFn, emptyMessage) => {
    if (!list?.length) return <p className="mt-2">{emptyMessage}</p>;
    const uniqueLabels = [...new Set(list.map(extractFn))];
    return uniqueLabels.map((label, idx) => (
      <Chip key={idx} label={label} className="mx-2 mb-2" />
    ));
  };

  return (
    <div>
      {/* Report Title */}
      <div className="row">
        <div className="col-md-12">
          <div className="sub-heading ps-2 fw-bold">
            {report?.jobName || "No name provided"}
          </div>
          <hr />
        </div>
      </div>

      <div className="border px-3 py-2 rounded">
        {/* Report Name and Date */}
        <div className="row mb-3">
          <div className="col-lg-6">
            <label>Report Name:</label>
            <input
              className="form-control w-100"
              placeholder="Job Name"
              value={report?.reportName || ""}
              disabled
              readOnly
            />
          </div>

          <div className="col-lg-6">
            <label>Report Date:</label>
            <input
              type="date"
              className="form-control w-100"
              value={formattedReportDate}
              disabled
              readOnly
            />
          </div>
        </div>

        {/* Planned Dates */}
        <div className="row mb-3">
          <div className="col-lg-6">
            <label>Planned Start Date:</label>
            <input
              type="date"
              className="form-control w-100"
              value={formattedStartDate}
              disabled
              readOnly
            />
          </div>

          <div className="col-lg-6">
            <label>Planned End Date:</label>
            <input
              type="date"
              className="form-control w-100"
              value={formattedEndDate}
              disabled
              readOnly
            />
          </div>
        </div>

        {/* Risk Approach and Planned Hours */}
        <div className="row mb-3">
          <div className="col-lg-6">
            <label>Risk Approach:</label>
            <input
              type="text"
              className="form-control w-100"
              value={report?.riskApproach || "No Risk Approach Provided"}
              disabled
              readOnly
            />
          </div>

          <div className="col-lg-6">
            <label>Planned Hours:</label>
            <input
              type="text"
              className="form-control w-100"
              value={report?.plannedHours || ""}
              disabled
              readOnly
            />
          </div>
        </div>

        {/* Location and Sub-location */}
        <div className="row mb-3">
          <div className="col-lg-6 px-3 d-flex justify-content-between">
            <label className="mt-2">Location:</label>
            <div>
              {renderChipGroup(
                report?.subLocationList,
                (item) => item?.locationid?.description,
                "No Location To Show"
              )}
            </div>
          </div>

          <div className="col-lg-6 px-3 d-flex justify-content-between">
            <label className="mt-2">Sub-Location:</label>
            <div>
              {!report?.subLocationList?.length ? (
                <p className="mt-2">No Sub Location To Show</p>
              ) : (
                report?.subLocationList.map((item, idx) => (
                  <Chip
                    key={idx}
                    label={item?.description}
                    className="mx-2 mb-2"
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Department and Sub-Department */}
        <div className="row mb-3">
          <div className="col-lg-6 px-3 d-flex justify-content-between">
            <label className="mt-2">Department:</label>
            <div>
              {renderChipGroup(
                report?.subDepartmentList,
                (item) => item?.department?.description,
                "No Department To Show"
              )}
            </div>
          </div>

          <div className="col-lg-6 px-3 d-flex justify-content-between">
            <label className="mt-2">Sub-Department:</label>
            <div>
              {!report?.subDepartmentList?.length ? (
                <p className="mt-2">No Sub Department To Show</p>
              ) : (
                report?.subDepartmentList.map((item, idx) => (
                  <Chip
                    key={idx}
                    label={item?.description}
                    className="mx-2 mb-2"
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Resource Information */}
        <div className="row mb-3 f-13">
          <div className="col-lg-4 px-3 d-flex justify-content-between">
            <div className="fw-bold">Head Of Internal Audit:</div>
            <div>
              {report?.resourceAllocations?.headOfInternalAudit?.name ||
                "No Head Of Internal Audit"}
            </div>
          </div>

          <div className="col-lg-4 px-3 d-flex justify-content-between">
            <div className="fw-bold">Backup Head Of Internal Audit:</div>
            <div>
              {report?.resourceAllocations?.backupHeadOfInternalAudit?.name ||
                "No Backup Head Assigned"}
            </div>
          </div>

          <div className="col-lg-4 px-3 d-flex justify-content-between">
            <div className="fw-bold">Proposed Job Approver:</div>
            <div>
              {report?.resourceAllocations?.proposedJobApprover?.name ||
                "No Proposed Job Approver Assigned"}
            </div>
          </div>
        </div>

        {/* Resource List */}
        <div className="row mb-3 mt-3 f-13">
          <div className="col-lg-12 px-3 d-flex gap-4 flex-wrap w-100">
            <div className="fw-bold">Resource List:</div>
            {report?.resourceAllocations?.resourcesList?.length ? (
              <div className="d-flex gap-4 flex-wrap">
                {report?.resourceAllocations?.resourcesList.map((user, idx) => (
                  <div key={idx}>{user?.name}</div>
                ))}
              </div>
            ) : (
              <p>Resource List Not Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFirstLayout;
