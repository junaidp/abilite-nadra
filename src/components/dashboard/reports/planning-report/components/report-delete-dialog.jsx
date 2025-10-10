import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteReport } from "../../../../../global-redux/reducers/reports/planing-report/slice";

/**
 * Confirmation dialog for deleting a planning report.
 * Dispatches delete action and closes automatically on success.
 */
const PlanningReportDeleteDialog = ({ setShowReportDeleteDialog, selectedReportId }) => {
  const dispatch = useDispatch();
  const { loading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );

  /** Handle report deletion */
  const handleReportDelete = React.useCallback(() => {
    if (!loading && selectedReportId) {
      dispatch(setupDeleteReport(Number(selectedReportId)));
    }
  }, [dispatch, loading, selectedReportId]);

  /** Close dialog after successful deletion */
  React.useEffect(() => {
    if (reportAddSuccess) {
      setShowReportDeleteDialog(false);
    }
  }, [reportAddSuccess, setShowReportDeleteDialog]);

  return (
    <div className="p-4">
      <p>Are you sure you want to delete this report?</p>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-danger ${loading ? "disabled" : ""}`}
          onClick={handleReportDelete}
        >
          {loading ? "Loading..." : "Delete"}
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowReportDeleteDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlanningReportDeleteDialog;
