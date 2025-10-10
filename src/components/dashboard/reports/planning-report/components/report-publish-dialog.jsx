import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupPublishReport } from "../../../../../global-redux/reducers/reports/planing-report/slice";

/**
 * Confirmation dialog for publishing a planning report.
 * Handles report publication and closes automatically on success.
 */
const PlanningReportPublishDialog = ({ setShowReportPublishDialog, selectedReportId }) => {
  const dispatch = useDispatch();
  const { loading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );

  /** Handle report publish action */
  const handleReportStatusUpdate = React.useCallback(() => {
    if (!loading && selectedReportId) {
      dispatch(setupPublishReport(Number(selectedReportId)));
    }
  }, [dispatch, loading, selectedReportId]);

  /** Close dialog after successful publish */
  React.useEffect(() => {
    if (reportAddSuccess) {
      setShowReportPublishDialog(false);
    }
  }, [reportAddSuccess, setShowReportPublishDialog]);

  return (
    <div className="p-4">
      <p>Are you sure you want to publish this report?</p>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-primary ${loading ? "disabled" : ""}`}
          onClick={handleReportStatusUpdate}
        >
          {loading ? "Loading..." : "Publish"}
        </button>

        <button
          className="btn btn-danger report-delete-close-btn"
          onClick={() => setShowReportPublishDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlanningReportPublishDialog;
