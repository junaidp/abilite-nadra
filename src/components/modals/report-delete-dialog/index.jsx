import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteSingleReport } from "../../../global-redux/reducers/reports/slice";

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
    <div class="p-4">
      <p>Are you sure you want to delete the report!</p>
      <div className="row">
        <button
          class="btn btn-outline-indigo col-lg-2"
          onClick={() => setShowReportDeleteDialog(false)}
        >
          Close
        </button>
        <button
          class={`btn btn-outline-indigo col-lg-2 mx-2 ${
            loading && "disabled"
          }`}
          onClick={handleReportDelete}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ReportDeleteDialog;
