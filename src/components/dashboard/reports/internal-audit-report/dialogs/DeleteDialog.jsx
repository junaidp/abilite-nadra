import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteInternalAuditReport } from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";

const DeleteInternalAuditReportDialog = ({
  deleteInternalAuditReportId,
  setShowDeleteInternalAuditReportDialog,
}) => {
  const dispatch = useDispatch();
  const { loading, internalAuditReportAddSuccess } = useSelector(
    (state) => state?.internalAuditReport
  );

  function handleDelete() {
    if (!loading) {
      dispatch(
        setupDeleteInternalAuditReport(Number(deleteInternalAuditReportId))
      );
    }
  }

  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      setShowDeleteInternalAuditReportDialog(false);
    }
  }, [internalAuditReportAddSuccess]);
  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Delete Internal Audit Report.</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-danger ${loading && "disabled"}`}
          onClick={handleDelete}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          className={`btn btn-primary ${loading && "disabled"} mx-2`}
          onClick={() => setShowDeleteInternalAuditReportDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteInternalAuditReportDialog;
