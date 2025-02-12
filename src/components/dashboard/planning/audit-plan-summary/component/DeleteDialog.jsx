import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeletePlanSummary } from "../../../../../global-redux/reducers/planing/audit-plan-summary/slice";

const DeleteAuditPlanSummarytDialog = ({
  setDeletePlanSummaryDialog,
  currentPlanSummaryId,
}) => {
  const dispatch = useDispatch();
  const { loading, auditPlanSummaryAddSuccess } = useSelector(
    (state) => state?.planningAuditPlanSummary
  );

  function handleDeleteAuditPlanSummary() {
    if (!loading) {
      dispatch(setupDeletePlanSummary(currentPlanSummaryId));
    }
  }

  React.useEffect(() => {
    if (auditPlanSummaryAddSuccess) {
      setDeletePlanSummaryDialog(false);
    }
  }, [auditPlanSummaryAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Delete Audit Plan Summary?</p>
      </div>
      <div className="d-flex mb-2 justify-content-between items-center">
        <button
          type="submit"
          className={`btn btn-danger float-start ${loading && "disabled"} `}
          onClick={handleDeleteAuditPlanSummary}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary float-end"
          onClick={() => setDeletePlanSummaryDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteAuditPlanSummarytDialog;
