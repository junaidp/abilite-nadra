import React from "react";
import moment from "moment";
import { toast } from "react-toastify";

const JobSchedule = ({ values, setValues }) => {
  function handleChangeDate(event) {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      toast.error(
        "The planned start date cannot be a past date. Please select today or a future date."
      );
      return;
    }

    if (
      !values?.timeAndDateAllocation?.estimatedWeeks ||
      values?.timeAndDateAllocation?.estimatedWeeks === 0
    ) {
      toast.error(
        "Please select the estimated number of weeks, then save the time and date allocation to change the planned start date."
      );
      return;
    }

    const weeksToAdd = values?.timeAndDateAllocation?.estimatedWeeks || 0;

    setValues((pre) => {
      return {
        ...pre,
        jobSchedule: {
          plannedJobStartDate: event.target.value,
          plannedJobEndDate: new Date(
            selectedDate.setDate(selectedDate.getDate() + weeksToAdd * 7)
          ),
        },
      };
    });
  }

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
          {values?.jobSchedule?.plannedJobStartDate &&
            values?.jobSchedule?.plannedJobEndDate && (
              <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
            )}
          Job Schedule List
        </button>
      </h2>
      <div
        id="flush-collapseFour"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div>
            <div className="row mb-4">
              <div className="col-lg-6">
                <div>
                  <label className="form-label me-2">Start Date</label>
                </div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                  value={
                    values?.jobSchedule?.plannedJobStartDate
                      ? moment
                          .utc(values?.jobSchedule?.plannedJobStartDate)
                          .format("YYYY-MM-DD")
                      : null
                  }
                  onChange={(event) => handleChangeDate(event)}
                />
              </div>
              <div className="col-lg-6">
                <label className="form-label me-2">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                  value={
                    values?.jobSchedule?.plannedJobEndDate
                      ? moment
                          .utc(values?.jobSchedule?.plannedJobEndDate)
                          .format("YYYY-MM-DD")
                      : null
                  }
                  readOnly
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSchedule;
