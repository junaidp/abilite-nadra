import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const ViewFeedBackDialog = ({
  setViewFeedBackDialog,
  currentPlanSummaryId,
}) => {
  const { allAuditPlanSummary } = useSelector(
    (state) => state?.planingAuditPlanSummary
  );

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
                allAuditPlanSummary?.find(
                  (all) => Number(all?.id) === Number(currentPlanSummaryId)
                )?.feedback?.description || ""
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
              allAuditPlanSummary?.find(
                (all) => Number(all?.id) === Number(currentPlanSummaryId)
              )?.feedback?.feedBackTime
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
