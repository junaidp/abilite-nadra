import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteSingleReport } from "../../../global-redux/reducers/reports/slice";
import "./index.css";

const ReportDeleteDialog = ({
  setShowReportDeleteDialog,
  selectedReportId,
}) => {
  const dispatch = useDispatch();
  const { loading, reportAddSuccess } = useSelector((state) => state?.reports);

  function handleReportDelete() {
    if (!loading) {
      dispatch(setupDeleteSingleReport(Number(selectedReportId)));
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      setShowReportDeleteDialog(false);
    }
  }, [reportAddSuccess]);
  return (
    <div class="p-4 h-200">
      <p>Are you sure you want to delete the report!</p>
      <div className="row mt-80">
        <div className="float-start col-lg-6">
          <button
            class={`btn btn-primary  float-start mx-2 ${loading && "disabled"}`}
            onClick={handleReportDelete}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
      <div className="col-lg-6 report-delete-close-btn">
        <button
          class="btn btn-danger"
          onClick={() => setShowReportDeleteDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportDeleteDialog;
