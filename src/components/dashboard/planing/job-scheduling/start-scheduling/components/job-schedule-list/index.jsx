import React from "react";
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
                      <label className="form-label me-2">
                        {ind + 1}. Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select Date"
                        value={moment(list?.plannedJobStartDate).format(
                          "YYYY-MM-DD"
                        )}
                        readOnly
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
                        value={moment(list?.plannedJobEndDate).format(
                          "YYYY-MM-DD"
                        )}
                        readOnly
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
