import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveComplianceCheckList } from "../../../../../../../global-redux/reducers/audit-engagement/slice";

const ApproveComplianceCheckListDialog = ({
  setShowApproveDialog,
  currentApproveItem,
}) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );

  function handleApproveAuditCheckList() {
    if (!loading) {
      dispatch(
        setupApproveComplianceCheckList({
          ...currentApproveItem,
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
        <p>Are You Sure You Want To Approve Compliance CheckList?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-secondary ${loading && "disabled"} `}
          onClick={handleApproveAuditCheckList}
        >
          {loading ? "Loading..." : "Approve"}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setShowApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveComplianceCheckListDialog;
