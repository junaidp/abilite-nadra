import React from "react";
import Chip from "@mui/material/Chip";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const JobScheduleList = ({
  currentJobSchedulingObject,
  setCurrentJobScheduling,
  handleSaveMainJobScheduling,
}) => {
  const { singleJobSchedulingObject, loading } = useSelector(
    (state) => state?.planningJobScheduling
  );
  const { user, userCompany } = useSelector((state) => state?.auth);

  function handleChangeDate(event, id) {
    const selectedDate = new Date(event.target.value);
    // const currentDate = new Date();

    // currentDate.setHours(0, 0, 0, 0);

    // if (selectedDate < currentDate) {
    //   toast.error(
    //     "The planned start date cannot be a past date. Please select today or a future date."
    //   );
    //   return;
    // }

    if (
      !singleJobSchedulingObject?.timeAndDateAllocation?.estimatedWeeks ||
      singleJobSchedulingObject?.timeAndDateAllocation?.estimatedWeeks === 0
    ) {
      toast.error(
        "Please select the estimated number of weeks, then save the time and date allocation to change the planned start date."
      );
      return;
    }

    const weeksToAdd =
      singleJobSchedulingObject?.timeAndDateAllocation?.estimatedWeeks || 0;

    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        jobScheduleList: pre?.jobScheduleList?.map((listItem) =>
          listItem?.id === id
            ? {
              ...listItem,
              plannedJobStartDate: event.target.value,
              plannedJobEndDate: selectedDate.setDate(
                selectedDate.getDate() + weeksToAdd * 7
              ),
            }
            : listItem
        ),
      };
    });
  }

  function handleSave() {
    handleSaveMainJobScheduling();
  }

  function handleCheckJobScheduling(list) {
    if (list) {
      let isTrue = true;
      list?.forEach((listItem) => {
        if (!listItem?.plannedJobStartDate || !listItem?.plannedJobEndDate) {
          isTrue = false;
        }
      });
      return isTrue;
    }
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
          {handleCheckJobScheduling(
            singleJobSchedulingObject?.jobScheduleList
          ) && <i className="fa fa-check-circle fs-3 text-success pe-3"></i>}
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
                        disabled={
                          singleJobSchedulingObject?.locked === true ||
                            (singleJobSchedulingObject?.complete === true &&
                              singleJobSchedulingObject?.locked === false &&
                              user[0]?.userId?.employeeid?.userHierarchy !==
                              "IAH")
                            ? true
                            : false
                        }
                        onChange={(event) => handleChangeDate(event, list?.id)}
                        min={moment(userCompany.fiscalYearForm).format("YYYY-MM-DD")}
                        max={moment(userCompany.fiscalYearTo).format("YYYY-MM-DD")}

                      />
                      {list?.plannedJobStartDate === null && (
                        <p className="error mt-1">date is required</p>
                      )}
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
          {(singleJobSchedulingObject?.complete === false ||
            (singleJobSchedulingObject?.complete === true &&
              singleJobSchedulingObject?.locked === false &&
              user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
              <div className="row mt-3">
                <div className="col-lg-12 justify-content-end text-end">
                  <div
                    className={`btn btn-labeled btn-primary px-3 shadow ${loading && "disabled"
                      }`}
                    onClick={handleSave}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    {loading ? "Loading..." : "Save"}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default JobScheduleList;
