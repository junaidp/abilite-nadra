import moment from "moment";

const ViewDetailedAuditReportFeedbackDialog = ({
  setViewFeedBackDialog,
  currentReportItem,
}) => {
  // --- Close dialog ---
  const handleClose = () => {
    setViewFeedBackDialog(false);
  };

  return (
    <div className="px-4 py-4">
      {/* Feedback description section */}
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Description:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <textarea
              id="feedback-description"
              className="form-control h-400"
              name="description"
              placeholder="No feedback provided"
              value={currentReportItem?.feedback?.description || ""}
              disabled
              readOnly
            ></textarea>
          </div>
        </div>
      </div>

      {/* Feedback date section */}
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Feedback Date:</div>
        <div className="col-lg-8">
          <p>
            {currentReportItem?.feedback?.feedBackTime
              ? moment(currentReportItem.feedback.feedBackTime).format(
                "DD-MM-YY HH:mm:ss"
              )
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Close button */}
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

export default ViewDetailedAuditReportFeedbackDialog;
