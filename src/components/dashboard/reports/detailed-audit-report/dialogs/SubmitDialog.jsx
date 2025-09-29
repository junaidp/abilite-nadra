import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitInternalAuditReport } from "../../../../../global-redux/reducers/reports/consolidation-report/slice";

const DetailedAuditReportSubmitDialog = ({
  currentReportItem,
  setShowSubmitReportDialog,
}) => {
  const dispatch = useDispatch();
  const { internalAuditReportAddSuccess, addReportLoading } = useSelector(
    (state) => state?.consolidationReport
  );

  // --- Handle submit action ---
  const handleSubmit = React.useCallback(() => {
    if (addReportLoading) return; // prevent double submission
    dispatch(
      setupSubmitInternalAuditReport({
        ...currentReportItem,
        submitted: true,
      })
    );
  }, [dispatch, currentReportItem, addReportLoading]);

  // --- Close dialog automatically on success ---
  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      setShowSubmitReportDialog(false);
    }
  }, [internalAuditReportAddSuccess, setShowSubmitReportDialog]);

  return (
    <div className="p-4">
      {/* Confirmation message */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are you sure you want to submit this report?</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary ${addReportLoading ? "disabled" : ""}`}
          onClick={handleSubmit}
        >
          {addReportLoading ? "Loading..." : "Submit"}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => setShowSubmitReportDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailedAuditReportSubmitDialog;
