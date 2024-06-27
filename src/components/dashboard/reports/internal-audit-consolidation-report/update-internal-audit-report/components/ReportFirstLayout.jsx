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
                value={reportObject?.plannedHours}
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
              <label className="me-3">Risk Rating:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Risk Rating"
                type="text"
                disabled
                value={reportObject?.riskRating || "No Rating"}
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
                      ]?.map((locationItem,index) => {
                        return (
                          <Chip label={locationItem} className="mx-2 mb-2" key={index} />
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
                reportObject?.subLocationList?.map((item,index) => {
                  return (
                    <Chip label={item?.description} className="mx-2 mb-2" key={index} />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFirstLayout;
