import React from "react";
import moment from "moment";

const JobScheduleList = () => {
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
          <div className="row mb-4">
            <div className="col-lg-6">
              <label className="form-label me-2">Start Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select Date"
                readOnly
                disabled
                value={moment().format("YYYY-MM-DD")}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label me-2"> End Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select Date"
                readOnly
                disabled
                value={moment().format("YYYY-MM-DD")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobScheduleList;
