import React from "react";
import { useSelector } from "react-redux";

const SetMeetingTime = ({
  planingEngagementSingleObject,
  object,
  handleChange,
  allLocations,
  allSubLocations,
  loading,
  handleSaveMinuteMeetings,
}) => {
  const { user } = useSelector((state) => state?.auth);
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
          {planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.location_Id &&
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.subLocation_Id &&
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.meetingDateTimeFrom &&
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.meetingDateTimeTo ? (
            <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
          ) : (
            <p className="display-none">None</p>
          )}
          Set Meeting Time
        </button>
      </h2>
      <div
        id="flush-collapseFour"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="row mb-3">
            <div className="col-lg-6">
              <label>Select Location</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="location_Id"
                value={object?.location_Id}
                onChange={handleChange}
                disabled={
                  planingEngagementSingleObject?.locked === true ||
                  (planingEngagementSingleObject?.complete === true &&
                    planingEngagementSingleObject?.locked === false &&
                    user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                    ? true
                    : false
                }
              >
                <option>List of Locations</option>
                {allLocations?.map((item, ind) => {
                  return (
                    <option key={ind} value={item?.id}>
                      {item?.description}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-lg-6">
              <label>Select Sub Location</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="subLocation_Id"
                onChange={handleChange}
                value={object?.subLocation_Id}
                disabled={
                  planingEngagementSingleObject?.locked === true ||
                  (planingEngagementSingleObject?.complete === true &&
                    planingEngagementSingleObject?.locked === false &&
                    user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                    ? true
                    : false
                }
              >
                <option>List of Sub Locations</option>
                {allSubLocations?.map((item, index) => {
                  return (
                    <option value={item?.id} key={index}>
                      {item?.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label className="w-100">From</label>
              <input
                className="form-control w-100"
                placeholder="Select Date"
                type="date"
                name="meetingDateTimeFrom"
                value={object?.meetingDateTimeFrom}
                onChange={handleChange}
                disabled={
                  planingEngagementSingleObject?.locked === true ||
                  (planingEngagementSingleObject?.complete === true &&
                    planingEngagementSingleObject?.locked === false &&
                    user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                    ? true
                    : false
                }
              />
            </div>
            <div className="col-lg-6">
              <label className="w-100">To</label>
              <input
                className="form-control w-100"
                placeholder="Select Date"
                type="date"
                name="meetingDateTimeTo"
                value={object?.meetingDateTimeTo}
                onChange={handleChange}
                disabled={
                  planingEngagementSingleObject?.locked === true ||
                  (planingEngagementSingleObject?.complete === true &&
                    planingEngagementSingleObject?.locked === false &&
                    user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                    ? true
                    : false
                }
              />
            </div>
          </div>
          {(planingEngagementSingleObject?.complete === false ||
            (planingEngagementSingleObject?.complete === true &&
              planingEngagementSingleObject?.locked === false &&
              user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
            <button
              className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow ${
                loading && "disabled"
              }`}
              onClick={handleSaveMinuteMeetings}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle"></i>
              </span>
              {loading ? "loading..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetMeetingTime;
