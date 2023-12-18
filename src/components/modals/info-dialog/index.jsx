import React from "react";

const InfoDialog = () => {
  return (
    <div className="p-3">
      <p>Information About Page</p>

      <label className="label-text">
        Lorem ipsum is typically a corrupted version of De finibus bonorum et
        malorum, a 1st-century BC text by the Roman statesman and philosopher
        Cicero, with words altered, added, and removed to make it nonsensical
        and improper Latin. The first two words themselves are a truncation of
        dolorem ipsum ("pain itself").
      </label>

      <button mat-dialog-close className="btn btn-danger mt-3">
        Close
      </button>
    </div>
  );
};

export default InfoDialog;
