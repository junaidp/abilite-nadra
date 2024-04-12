import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveAuditPlanSummary } from "../../../../../global-redux/reducers/planing/audit-plan-summary/slice";

const ApproveAuditPlanSummaryDialog = ({
  setShowApproveDialog,
  currentApproveItem,
}) => {
  const dispatch = useDispatch();
  const { loading, auditPlanSummaryAddSuccess } = useSelector(
    (state) => state?.planingAuditPlanSummary
  );

  function handleApproveAuditPlanSummary() {
    if (!loading) {
      dispatch(
        setupApproveAuditPlanSummary({
          ...currentApproveItem,
          approved: true,
          locked: true,
        })
      );
    }
  }

  React.useEffect(() => {
    if (auditPlanSummaryAddSuccess) {
      setShowApproveDialog(false);
    }
  }, [auditPlanSummaryAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to approve the plan summary?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-secondary float-start ${
              loading && "disabled"
            } `}
            onClick={handleApproveAuditPlanSummary}
          >
            {loading ? "Loading..." : "Approve"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowApproveDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveAuditPlanSummaryDialog;
