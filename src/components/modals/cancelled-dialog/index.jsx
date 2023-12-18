import React from "react";

const CancelledDialog = ({ setShowCancelModal }) => {
  return (
    <div className="container px-4 pb-2 pt-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <div className="heading">Cancelled Reason</div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6">
          <label className="label-text">Planned Start Date</label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControl"
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="col-lg-6">
          <label className="label-text">Planned End Date</label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="DD/MM/YYYY"
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-12">
          <label className="label-text">Reason for Delay*:</label>
          <textarea
            className="form-control w-100"
            placeholder="Enter Reason"
            type="textarea"
          ></textarea>
          <p className="word-limit-info label-text mb-0">Maximum 1500 words</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-10">
          <p>
            Request initiated by:<span className="fw-bolder">ABCDEF</span>{" "}
          </p>
        </div>
        <div className="col-lg-2 text-end">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setShowCancelModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelledDialog;
