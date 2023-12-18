import React from "react";

const ObjectiveListDialog = ({ setShowObjectiveListDialog }) => {
  return (
    <div className="p-3">
      <p>objective-list-dialog works!</p>

      <label className="label-text">
        Lorem ipsum is typically a corrupted version of De finibus bonorum et
        malorum, a 1st-century BC text by the Roman statesman and philosopher
        Cicero, with words altered, added, and removed to make it nonsensical
        and improper Latin. The first two words themselves are a truncation of
        dolorem ipsum ("pain itself").
      </label>

      <button
        className="btn btn-primary mt-3"
        onClick={() => setShowObjectiveListDialog(false)}
      >
        Close
      </button>
    </div>
  );
};

export default ObjectiveListDialog;
