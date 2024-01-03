import React from "react";

const AddCheckListManagementDialog = ({ setCheckListManagementDialog }) => {
  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Check List Management</h2>
        </div>
      </header>
      <div className="row mb-2">
        <div className="col-lg-11">
          <div className="form-group">
            <label>Area</label>
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="Enter Details here"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-11">
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter Details here"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-12">
          <label>Particulars:</label>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Enter Particulars"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 1500 words
            </label>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-12">
          <label>Observation:</label>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Enter Particulars"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 1500 words
            </label>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div
          className="col-lg-12 text-end"
          onClick={() => setCheckListManagementDialog(false)}
        >
          <button mat-dialog-close className="btn btn-primary float-end">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCheckListManagementDialog;
