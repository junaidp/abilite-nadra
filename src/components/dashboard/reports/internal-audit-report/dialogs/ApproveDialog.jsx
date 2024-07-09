import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveInternalAuditReport } from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";

const ApproveInternalAuditReportDialog = ({
  currentReportItem,
  setShowApproveDialog,
}) => {
  const dispatch = useDispatch();
  const { internalAuditReportAddSuccess, loading } = useSelector(
    (state) => state?.internalAuditReports
  );

  function handleApprove() {
    if (!loading) {
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
          <p>Are You Sure You Want To Approve The Report?</p>
        </div>
      </div>

      <div className="pb-4">
        <button
          className={`btn btn-secondary   float-end ${loading && "disabled"}`}
          onClick={handleApprove}
        >
          {loading ? "Loading..." : "Approve"}
        </button>
        <button
          className={`btn btn-primary   float-end mx-2`}
          onClick={() => setShowApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveInternalAuditReportDialog;
