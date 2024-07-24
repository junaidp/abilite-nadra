import React from "react";
import Chip from "@mui/material/Chip";
import moment from "moment";

const JobScheduleList = ({ currentJobSchedulingObject }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFour"
          aria-expanded="false"
          aria-controls="flush-collapseFour"
        >
          <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
          Job Schedule List
        </button>
      </h2>
      <div
        id="flush-collapseFour"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {currentJobSchedulingObject?.jobScheduleList?.length === 0 ? (
            <p>No job schedule list to show!</p>
          ) : (
            <div>
              {currentJobSchedulingObject?.jobScheduleList?.map((list, ind) => {
                return (
                  <div className="row mb-4" key={ind}>
                    <div className="col-lg-6">
                      <div>
                        <label className="form-label me-2">
                          {ind + 1}. Start Date
                        </label>
                        {list?.subLocation?.description &&
                          list?.subLocation?.description !== "" && (
                            <Chip
                              label={list?.subLocation?.description}
                              className="float-end mb-2"
                            />
                          )}
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select Date"
                        value={
                          list?.plannedJobStartDate
                            ? moment
                                .utc(list?.plannedJobStartDate)
                                .format("YYYY-MM-DD")
                            : null
                        }
                        onChange={(event) => handleChangeDate(event, list?.id)}
                        disabled
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label me-2">
                        {ind + 1}. End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select Date"
                        value={
                          list?.plannedJobEndDate
                            ? moment
                                .utc(list?.plannedJobEndDate)
                                .format("YYYY-MM-DD")
                            : null
                        }
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobScheduleList;
