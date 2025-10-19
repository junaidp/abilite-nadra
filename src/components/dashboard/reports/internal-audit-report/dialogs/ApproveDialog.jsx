import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveInternalAuditReport } from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";

const ApproveInternalAuditReportDialog = ({
  currentReportItem,
  setShowApproveDialog,
}) => {
  const dispatch = useDispatch();
  const { internalAuditReportAddSuccess, loading } = useSelector(
    (state) => state?.internalAuditReport
  );

  function handleApprove() {
    if (!loading) {
      dispatch(
        setupApproveInternalAuditReport({
          submitted: true,
          approved: true,
          internalAuditReportId: currentReportItem?.id,
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
          className={`btn btn-secondary ${loading && "disabled"}`}
          onClick={handleApprove}
        >
          {loading ? "Loading..." : "Approve"}
        </button>
        <button
          className={`btn btn-danger  mx-2`}
          onClick={() => setShowApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveInternalAuditReportDialog;
