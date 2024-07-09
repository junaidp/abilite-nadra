import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupPublishReport } from "../../../global-redux/reducers/reports/planing-report/slice";

const ReportStatusChangeDialog = ({
  setShowReportStatusChangeDialog,
  selectedReportId,
}) => {
  const dispatch = useDispatch();
  const { loading, reportAddSuccess } = useSelector((state) => state?.reports);

  function handleReportStatusUpdate() {
    if (!loading) {
      dispatch(setupPublishReport(Number(selectedReportId)));
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      setShowReportStatusChangeDialog(false);
    }
  }, [reportAddSuccess]);
  return (
    <div class="p-4 h-200">
      <p>Are you sure you want to pusblish the report!</p>
      <div className="row">
        <div className="col-lg-6">
          <button
            class={`btn btn-primary   ${loading && "disabled"}`}
            onClick={handleReportStatusUpdate}
          >
            {loading ? "Loading..." : "Publish"}
          </button>
        </div>
      </div>
      <div>
        <button
          class="btn btn-danger report-delete-close-btn"
          onClick={() => setShowReportStatusChangeDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportStatusChangeDialog;
