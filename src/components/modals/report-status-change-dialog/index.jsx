import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupPublishReport } from "../../../global-redux/reducers/reports/slice";

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
    <div class="p-4">
      <p>Are you sure you want to pusblish the report!</p>
      <div className="row">
        <button
          class="btn btn-outline-indigo col-lg-2"
          onClick={() => setShowReportStatusChangeDialog(false)}
        >
          Close
        </button>
        <button
          class={`btn btn-outline-indigo col-lg-2 mx-2 ${
            loading && "disabled"
          }`}
          onClick={handleReportStatusUpdate}
        >
          {loading ? "Loading..." : "Publish"}
        </button>
      </div>
    </div>
  );
};

export default ReportStatusChangeDialog;
