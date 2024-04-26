import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitInternalAuditReport } from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";

const SubmitInternalAuditConsolidationReportDialog = ({
  currentReportItem,
  setShowSubmitReportDialog,
}) => {
  const dispatch = useDispatch();
  const { internalAuditReportAddSuccess, loading } = useSelector(
    (state) => state?.internalAuditReports
  );

  function handleSubmit() {
    if (!loading) {
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
          <p>Are You Sure You Want To Submit The Report?</p>
        </div>
      </div>

      <div className="pb-4">
        <button
          className={`btn btn-secondary   float-end ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-primary   float-end ${
            loading && "disabled"
          } mx-2`}
          onClick={() => setShowSubmitReportDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitInternalAuditConsolidationReportDialog;
