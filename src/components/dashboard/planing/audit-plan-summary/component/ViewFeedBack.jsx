import React from "react";
import { useSelector } from "react-redux";
import RickText from "../../../../common/feed-back-rich-text/index";

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
            <RickText
              editable="false"
              initialValue={
                allAuditPlanSummary?.find(
                  (all) => Number(all?.id) === Number(currentPlanSummaryId)
                )?.feedback?.description || ""
              }
            />
          </div>
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
