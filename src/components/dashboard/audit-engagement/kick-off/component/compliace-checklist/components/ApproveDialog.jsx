import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupUpdateAuditStepChecklistStatus } from "../../../../../../../global-redux/reducers/audit-engagement/slice";

const ApproveComplianceCheckListDialog = ({
  setShowApproveDialog,
  currentApproveItem,
  onChecklistStatusUpdated,
}) => {
  const dispatch = useDispatch();
  const [approving, setApproving] = React.useState(false);

  async function handleApproveAuditCheckList() {
    if (approving) return;

    try {
      setApproving(true);
      await dispatch(
        setupUpdateAuditStepChecklistStatus({
          id: currentApproveItem?.id,
          approved: true,
        })
      ).unwrap();
      onChecklistStatusUpdated?.(currentApproveItem?.id, { approved: true });
      setShowApproveDialog(false);
      toast.success("Compliance checklist approved successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An Error has occurred"
      );
    } finally {
      setApproving(false);
    }
  }

  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Approve Compliance CheckList?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-secondary ${approving && "disabled"} `}
          onClick={handleApproveAuditCheckList}
        >
          {approving ? "Loading..." : "Approve"}
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
