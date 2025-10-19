import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveInternalAuditReport } from "../../../../../global-redux/reducers/reports/consolidation-report/slice";

const ApproveDetailedAuditReportDialog = ({ currentReportItem, setShowApproveDialog }) => {
  const dispatch = useDispatch();

  // Extracting required state from Redux store
  const { internalAuditReportAddSuccess, addReportLoading } = useSelector(
    (state) => state?.consolidationReport
  );

  // Handle report approval
  const handleApprove = () => {
    if (!addReportLoading) {
      dispatch(
        setupApproveInternalAuditReport({
          submitted: true,
          approved: true,
          internalAuditReportId: currentReportItem?.id,
        })
      );
    }
  };

  // Close dialog automatically after successful approval
  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      setShowApproveDialog(false);
    }
  }, [internalAuditReportAddSuccess, setShowApproveDialog]);

  return (
    <div className="p-4">
      {/* Confirmation message */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are you sure you want to approve this report?</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary ${addReportLoading ? "disabled" : ""}`}
          onClick={handleApprove}
          disabled={addReportLoading}
        >
          {addReportLoading ? "Loading..." : "Approve"}
        </button>

        <button
          className="btn btn-danger"
          onClick={() => setShowApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveDetailedAuditReportDialog;
