import React from "react";

const Program = ({ program }) => {
  return (
    <div>
      <div className="card p-3 mb-3 w-100 shadow-sm border">
        <div className="d-flex mb-2">
          <div className="align-items-center w-100">
            <select
              className="form-select"
              aria-label="Default select example"
              value={program?.rating}
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
          value={program?.description || ""}
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default Program;
