import React from "react";
import RichText from "../../../../../../common/feed-back-rich-text";
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
            <RichText
              editable="false"
              initialValue={
                currentAuditEngagement?.auditProgram?.feedback?.description ||
                ""
              }
            />
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
