import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveReporting } from "../../../../../../global-redux/reducers/reporting/slice";

const ApproveDialog = ({ setApproveDialog, currentApproveItem }) => {
  const dispatch = useDispatch();
  const { loading, approveAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  function handleApproveFollowUp() {
    if (!loading) {
      dispatch(setupApproveReporting({ ...currentApproveItem, stepNo: 7 }));
    }
  }

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
