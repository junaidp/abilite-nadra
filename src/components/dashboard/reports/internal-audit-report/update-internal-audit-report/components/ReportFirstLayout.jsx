import React from "react";
import moment from "moment";
import Chip from "@mui/material/Chip";

const ReportFirstLayout = ({ reportObject, handleChangeReportObject }) => {
  return (
    <div>
      <div className="row  ">
        <div className="col-md-12">
          <div className="sub-heading ps-2  fw-bold">
            {reportObject?.jobName}
          </div>
          <hr />
        </div>
      </div>
      <div className="border px-3 py-2 rounded">
        <div className="row mb-3">
          <div className="col-lg-6">
            <div>
              <label className="me-3">Report Name:</label>
              <input
                className="form-control w-100"
                name="reportName"
                value={reportObject?.reportName || ""}
                onChange={(event) => handleChangeReportObject(event)}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="me-3">Report Date:</label>
              <input
                className="form-control w-100"
                placeholder="Select Date"
                type="date"
                name="reportDate"
                value={moment
                  .utc(reportObject?.reportDate)
                  .format("YYYY-MM-DD")}
                onChange={(event) => handleChangeReportObject(event)}

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
                value={moment
                  .utc(reportObject?.plannedStartDate)
                  .format("YYYY-MM-DD")}
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
                value={moment
                  .utc(reportObject?.plannedEndDate)
                  .format("YYYY-MM-DD")}
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
                value={
                  reportObject?.riskApproach || "No Risk Approach Provided"
                }
                disabled
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="me-3">Planned Hours:</label>
              <input
                className="form-control w-100"
                placeholder="Enter planned Hours"
                type="text"
                disabled
                value={reportObject?.plannedHours}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <div>
              <div className="row mb-3 f-13">
                <div className="col-lg-6 px-3 d-flex justify-content-between">
                  <label className="mt-2">Location:</label>
                  <div>
                    {!reportObject?.subLocationList ||
                      reportObject?.subLocationList?.length === 0 ? (
                      <p className="mt-2">No Location To Show</p>
                    ) : (
                      [
                        ...new Set(
                          reportObject?.subLocationList?.map(
                            (item) => item?.locationid?.description
                          )
                        ),
                      ]?.map((locationItem, index) => {
                        return (
                          <Chip
                            label={locationItem}
                            key={index}
                            className="mx-2 mb-2"
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 px-3 d-flex justify-content-between">
            <label className="mt-2">Sub-Location:</label>
            <div className="">
              {!reportObject?.subLocationList ||
                reportObject?.subLocationList?.length == 0 ? (
                <p className="mt-2">No Sub Location To Show</p>
              ) : (
                reportObject?.subLocationList?.map((item, index) => {
                  return (
                    <Chip
                      label={item?.description}
                      key={index}
                      className="mx-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6">
            <div>
              <div className="row mb-3 f-13">
                <div className="col-lg-6 px-3 d-flex justify-content-between">
                  <label className="mt-2">Department:</label>
                  <div>
                    {!reportObject?.subDepartmentList ||
                      reportObject?.subDepartmentList?.length === 0 ? (
                      <p className="mt-2">No Department To Show</p>
                    ) : (
                      [
                        ...new Set(
                          reportObject?.subDepartmentList?.map(
                            (item) => item?.department?.description
                          )
                        ),
                      ]?.map((departmentItem, index) => {
                        return (
                          <Chip
                            label={departmentItem}
                            key={index}
                            className="mx-2 mb-2"
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 px-3 d-flex justify-content-between">
            <label className="mt-2">Sub-Department:</label>
            <div className="">
              {!reportObject?.subDepartmentList ||
                reportObject?.subDepartmentList?.length === 0 ? (
                <p className="mt-2">No Sub Department To Show</p>
              ) : (
                reportObject?.subDepartmentList?.map(
                  (item, index) => {
                    return (
                      <Chip
                        label={item?.description}
                        className="mx-2 mb-2"
                        key={index}
                      />
                    );
                  }
                )
              )}
            </div>
          </div>

          {/* Resources */}
          <div className="row mb-3 f-13">
            <div className="col-lg-4 px-3 d-flex justify-content-between">
              <div className="fw-bold">Head Of Internal Audit:</div>
              <div className="">
                {reportObject?.resourceAllocations?.headOfInternalAudit
                  ?.name || "No Head Of Internal Audit"}
              </div>
            </div>
            <div className="col-lg-4 px-3 d-flex justify-content-between">
              <div className="fw-bold">Backup Head Of InternalAudit:</div>
              <div className="">
                {reportObject?.resourceAllocations
                  ?.backupHeadOfInternalAudit?.name ||
                  "No Backup Head Of InternalAudit Assigned "}
              </div>
            </div>
            <div className="col-lg-4 px-3 d-flex justify-content-between">
              <div className="fw-bold">Proposed Job Approver:</div>
              <div className="">
                {reportObject?.resourceAllocations?.proposedJobApprover
                  ?.name || "No Proposed Job Approver Assigned "}
              </div>
            </div>
          </div>
          <div className="row mb-3 mt-3 f-13">
            <div className="col-lg-4 px-3 d-flex gap-4 flex-wrap w-100">
              <div className="fw-bold">Resource List:</div>

              {reportObject?.resourceAllocations?.resourcesList &&
                reportObject?.resourceAllocations?.resourcesList
                  .length ? (
                <div className="d-flex gap-4 flex-wrap">
                  {reportObject?.resourceAllocations?.resourcesList?.map(
                    (user) => {
                      return <div>{user?.name}</div>;
                    }
                  )}
                </div>
              ) : (
                <p>Resource List Not Found</p>
              )}
            </div>
          </div>
          {/* Resources */}
        </div>
      </div>
    </div>
  );
};

export default ReportFirstLayout;
