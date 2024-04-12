import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveAuditStepApproval } from "../../../../../../global-redux/reducers/audit-engagement/slice";

const ApproveAuditStepDialog = ({
  setShowApproveDialog,
  currentAuditEngagement,
}) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );

  function handleApproveAuditStep() {
    if (!loading) {
      dispatch(
        setupApproveAuditStepApproval({
          ...currentAuditEngagement?.auditStep,
          approved: true,
        })
      );
    }
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setShowApproveDialog(false);
    }
  }, [auditEngagementAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to approve the audit step?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-secondary float-start ${
              loading && "disabled"
            } `}
            onClick={handleApproveAuditStep}
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

export default ApproveAuditStepDialog;
