import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteReport } from "../../../../../global-redux/reducers/reports/planing-report/slice";

const PlanningReportDeleteDialog = ({
  setShowReportDeleteDialog,
  selectedReportId,
}) => {
  const dispatch = useDispatch();
  const { loading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );

  function handleReportDelete() {
    if (!loading) {
      dispatch(setupDeleteReport(Number(selectedReportId)));
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      setShowReportDeleteDialog(false);
    }
  }, [reportAddSuccess]);
  return (
    <div class="p-4">
      <p>Are You Sure You Want To Delete Report.</p>
      <div className="d-flex justify-content-between">
        <button
          class={`btn btn-danger ${loading && "disabled"}`}
          onClick={handleReportDelete}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          class="btn btn-primary"
          onClick={() => setShowReportDeleteDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlanningReportDeleteDialog;
