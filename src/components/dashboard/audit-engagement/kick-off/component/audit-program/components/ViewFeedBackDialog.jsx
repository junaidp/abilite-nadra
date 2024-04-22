import React from "react";
import moment from "moment";

const ViewFeedBackDialog = ({
  setViewFeedBackDialog,
  currentAuditEngagement,
}) => {
  function handleClose() {
    setViewFeedBackDialog(false);
  }

  return (
    <div className="px-4 py-4">
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Description:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <textarea
              type="text"
              id="fname"
              className="form-control h-400"
              name="fname"
              placeholder="Add feed-back here"
              required="required"
              value={
                currentAuditEngagement?.auditProgram?.feedback?.description ||
                ""
              }
              disabled={true}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">FeedBack Date:</div>
        <div className="col-lg-8">
          <p>
            {moment(
              currentAuditEngagement?.auditProgram?.feedback?.feedBackTime
            ).format("DD-MM-YY HH:mm:ss")}
          </p>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-6 text-end">
          <button className="btn btn-danger float-end" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedBackDialog;
