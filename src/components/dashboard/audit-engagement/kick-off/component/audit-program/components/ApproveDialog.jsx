import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveAuditProgramApproval } from "../../../../../../../global-redux/reducers/audit-engagement/slice";

const ApproveAuditProgramDialog = ({
  setShowApproveDialog,
  currentAuditEngagement,
  auditEngagementId,
}) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );

  function handleApproveAuditProgram() {
    if (!loading) {
      dispatch(
        setupApproveAuditProgramApproval({
          auditProgram: {
            ...currentAuditEngagement?.auditProgram,
            approved: true,
          },
          engagement_id: Number(auditEngagementId),
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
        <p>Are You Sure You Want To Approve Audit Program?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-secondary float-start ${loading && "disabled"} `}
          onClick={handleApproveAuditProgram}
        >
          {loading ? "Loading..." : "Approve"}
        </button>
        <button
          type="button"
          className="btn btn-danger float-end"
          onClick={() => setShowApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveAuditProgramDialog;
