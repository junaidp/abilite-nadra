import React from "react";

const Rating = ({ risk }) => {
  return (
    <div className="card p-3 mb-3 w-100 shadow-sm border">
      <div className="d-flex mb-2 justify-content-between align-items-center">
        <span className="fw-bold">Risk</span>
        <div className="d-flex align-items-center">
          <select
            className="form-select"
            aria-label="Default select example"
            value={risk?.rating}
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
        id="exampleFormControlTextarea222"
        value={risk?.description || ""}
        disabled
      ></textarea>
    </div>
  );
};

export default Rating;
