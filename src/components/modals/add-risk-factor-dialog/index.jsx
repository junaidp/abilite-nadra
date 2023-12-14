import React from "react";

const index = ({ setShowAddRiskFactorDialog }) => {
  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between">
        <div className="heading fs-5 px-1" id="staticBackdropLabel">
          Risk Factor
        </div>
        <button
          type="button"
          className="btn-close"
          mat-dialog-close
          onClick={() => setShowAddRiskFactorDialog(false)}
        ></button>
      </div>

      <div className="my-3 px-2">
        <label for="labeltext" className="form-label label-text">
          Add New Risk Factor
        </label>
        <div className="d-flex">
          <input
            type="email"
            className="form-control"
            id="labeltext"
            placeholder="Enter Risk Factor"
          />
          <button
            className="btn btn-primary ms-2"
            mat-dialog-close
            onClick={() => setShowAddRiskFactorDialog(false)}
          >
            Save
          </button>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="d-flex px-2 align-items-center mb-4 justify-content-between">
            <div className="form-label  mb-0 label-text">
              Risk Loram will be added here
            </div>
            <button
              className="btn btn-primary"
              mat-dialog-close
              onClick={() => setShowAddRiskFactorDialog(false)}
            >
              Select
            </button>
          </div>
          <div className="d-flex px-2 align-items-center justify-content-between">
            <div className="form-label mb-0 label-text">
              Risk Loram will be added here
            </div>
            <button
              className="btn btn-primary"
              mat-dialog-close
              onClick={() => setShowAddRiskFactorDialog(false)}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
