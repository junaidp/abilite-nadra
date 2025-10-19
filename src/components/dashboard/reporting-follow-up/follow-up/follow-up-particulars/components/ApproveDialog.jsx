import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveReporting, setupUpdateFollowUp } from "../../../../../../global-redux/reducers/reporting/slice";

const ApproveDialog = ({ setApproveDialog, currentApproveItem }) => {
  const dispatch = useDispatch();
  const { loading, approveAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  const handleApproveFollowUp = async () => {
    if (loading) return;

    try {
      await dispatch(
        setupUpdateFollowUp({
          ...currentApproveItem?.followUp,
          testInNextYear:
            currentApproveItem?.followUp?.testInNextYear.toString() === "true",
        })
      ).unwrap();

      await dispatch(
        setupApproveReporting({
          ...currentApproveItem,
          stepNo: 7,
        })
      ).unwrap();

    } catch (error) {
      console.error("Error approving follow-up:", error);
    }
  };


  React.useEffect(() => {
    if (approveAddSuccess) {
      setApproveDialog(false);
    }
  }, [approveAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Approve Follow-Up?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-secondary ${loading && "disabled"} `}
          onClick={handleApproveFollowUp}
        >
          {loading ? "Loading..." : "Approve"}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveDialog;
