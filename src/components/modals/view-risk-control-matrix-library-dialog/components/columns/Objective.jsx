import React from "react";

const Objective = ({ objective }) => {
  return (
    <td>
      <div>
        <div className="col-lg-12 mb-2">
          <select
            className="form-select "
            aria-label="Default select example"
            value={objective?.rating}
            disabled
            name="rating"
            readOnly
          >
            <option value="">Select One</option>
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>
        <textarea
          className="form-control mb-4"
          value={objective?.description}
          id="exampleFormCon"
          rows="3"
          disabled
          readOnly
          name="description"
        ></textarea>
      </div>
    </td>
  );
};

export default Objective;
