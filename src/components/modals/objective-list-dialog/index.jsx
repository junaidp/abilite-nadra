import React from "react";

const ObjectiveListDialog = ({ setShowObjectiveListDialog }) => {
  return (
    <div className="p-3">
      <label className="label-text">
        Click to add a new business objective or select from the Objective List,
        which includes open observation points for next year's testing.
      </label>
      <div>
        <button
          className="btn btn-primary mt-3 float-right"
          onClick={() => setShowObjectiveListDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ObjectiveListDialog;
