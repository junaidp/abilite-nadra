import React from "react";

const Objective = ({ singleRCM }) => {
  return (
    <div>
      <div className="card p-3 w-100 shadow-sm border">
        <div className="d-flex mb-2 justify-content-between align-items-center">
          <span className="fw-bold">Objective</span>
          <div className="d-flex align-items-center">
            <select
              className="form-select "
              aria-label="Default select example"
              value={singleRCM?.rating}
              disabled
            >
              <option value="">Select One</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
        </div>
        <textarea
          className="form-control"
          placeholder="Enter Reason"
          id="exampleFormControlTextarea1"
          disabled
          value={singleRCM?.description || ""}
        ></textarea>
      </div>
    </div>
  );
};

export default Objective;
