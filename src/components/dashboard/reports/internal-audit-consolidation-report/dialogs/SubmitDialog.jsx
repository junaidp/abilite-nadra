import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitInternalAuditReport } from "../../../../../global-redux/reducers/reports/consolidation-report/slice";

const SubmitInternalAuditConsolidationReportDialog = ({
  currentReportItem,
  setShowSubmitReportDialog,
}) => {
  const dispatch = useDispatch();
  const { internalAuditReportAddSuccess, addReportLoading } = useSelector(
    (state) => state?.consolidationReport
  );

  function handleSubmit() {
    if (!addReportLoading) {
      dispatch(
        setupSubmitInternalAuditReport({
          ...currentReportItem,
          submitted: true,
        })
      );
    }
  }

  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      setShowSubmitReportDialog(false);
    }
  }, [internalAuditReportAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Report?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary ${addReportLoading && "disabled"}`}
          onClick={handleSubmit}
        >
          {addReportLoading ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-danger`}
          onClick={() => setShowSubmitReportDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitInternalAuditConsolidationReportDialog;
