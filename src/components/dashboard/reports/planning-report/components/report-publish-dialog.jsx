import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupPublishReport } from "../../../../../global-redux/reducers/reports/planing-report/slice";

const PlanningReportPublishDialog = ({
  setShowReportPublishDialog,
  selectedReportId,
}) => {
  const dispatch = useDispatch();
  const { loading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );

  function handleReportStatusUpdate() {
    if (!loading) {
      dispatch(setupPublishReport(Number(selectedReportId)));
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      setShowReportPublishDialog(false);
    }
  }, [reportAddSuccess]);

  return (
    <div class="p-4">
      <p>Are You Sure You Want To Publish Report.</p>
      <div className="d-flex justify-content-between">
        <button
          class={`btn btn-primary  ${loading && "disabled"}`}
          onClick={handleReportStatusUpdate}
        >
          {loading ? "Loading..." : "Publish"}
        </button>
        <button
          class="btn btn-danger report-delete-close-btn"
          onClick={() => setShowReportPublishDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlanningReportPublishDialog;
