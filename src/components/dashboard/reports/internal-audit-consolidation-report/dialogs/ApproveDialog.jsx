import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveInternalAuditReport } from "../../../../../global-redux/reducers/reports/consolidation-report/slice";

const ApproveInternalAuditConsolidationReportDialog = ({
  currentReportItem,
  setShowApproveDialog,
}) => {
  const dispatch = useDispatch();
  const { internalAuditReportAddSuccess, addReportLoading } = useSelector(
    (state) => state?.consolidationReport
  );

  function handleApprove() {
    if (!addReportLoading) {
      dispatch(
        setupApproveInternalAuditReport({
          ...currentReportItem,
          approved: true,
        })
      );
    }
  }

  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      setShowApproveDialog(false);
    }
  }, [internalAuditReportAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Approve Report?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary ${addReportLoading && "disabled"}`}
          onClick={handleApprove}
        >
          {addReportLoading ? "Loading..." : "Approve"}
        </button>
        <button
          className={`btn btn-danger`}
          onClick={() => setShowApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveInternalAuditConsolidationReportDialog;
