import React from "react";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
const JobScheduleList = ({
  currentJobSchedulingObject,
  setCurrentJobScheduling,
  handleSaveMainJobScheduling,
}) => {
  const { loading, singleJobSchedulingObject } = useSelector(
    (state) => state?.planingJobScheduling
  );
  const { user } = useSelector((state) => state?.auth);

  function handleSaveJobScheduling() {
    if (!loading) {
      handleSaveMainJobScheduling();
    }
  }

  function handleChangeDate(event, id) {
    const currentValue = event?.target?.value;
    const totalWeeks = Number(
      singleJobSchedulingObject?.timeAndDateAllocation?.estimatedWeeks
    );
    const newDate = currentValue ? new Date(currentValue) : null;
    const endDate = new Date(newDate);
    endDate.setDate(endDate.getDate() + totalWeeks * 5);
    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        jobScheduleList: pre?.jobScheduleList?.map((singleItem) =>
          Number(singleItem?.id) === Number(id)
            ? {
                ...singleItem,
                plannedJobStartDate: event?.target?.value,
                plannedJobEndDate: endDate || singleItem?.plannedJobEndDate,
              }
            : singleItem
        ),
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
                          new Date(list?.plannedJobStartDate)
                            .toISOString()
                            .split("T")[0]
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
                          new Date(list?.plannedJobEndDate)
                            .toISOString()
                            .split("T")[0]
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
                  className={`btn btn-labeled btn-primary px-3 shadow ${
                    loading && "disabled"
                  }`}
                  onClick={handleSaveJobScheduling}
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
