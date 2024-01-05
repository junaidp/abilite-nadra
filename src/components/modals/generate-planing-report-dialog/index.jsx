import React from "react";

const GeneratePlaningReportDialog = ({ setGeneratePlaningReportDialog }) => {
  return (
    <div className="px-4 py-4">
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Heading</div>
        <div className="col-lg-8">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Details</div>
        <div className="col-lg-8">
          <div className="form-group">
            <textarea
              type="text"
              id="fname"
              className="form-control h-400"
              name="fname"
              placeholder="Add detail here"
              required="required"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-primary float-end"
            onClick={() => setGeneratePlaningReportDialog(false)}
          >
            Add
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default GeneratePlaningReportDialog;
