import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitInternalAuditReport } from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";

const SubmitInternalAuditReportDialog = ({
  currentReportItem,
  setShowSubmitReportDialog,
}) => {
  const dispatch = useDispatch();
  const { internalAuditReportAddSuccess, loading } = useSelector(
    (state) => state?.internalAuditReport
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
          <p>Are You Sure You Want To Submit Report?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-danger ${loading && "disabled"} mx-2`}
          onClick={() => setShowSubmitReportDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitInternalAuditReportDialog;
