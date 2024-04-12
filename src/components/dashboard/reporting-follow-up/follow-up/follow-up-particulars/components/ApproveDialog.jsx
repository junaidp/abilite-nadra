import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveReporting } from "../../../../../../global-redux/reducers/reporting/slice";

const ApproveDialog = ({ setApproveDialog, currentApproveItem }) => {
  const dispatch = useDispatch();
  const { loading, reportingAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  function handleApproveFollowUp() {
    if (!loading) {
      dispatch(setupApproveReporting({ ...currentApproveItem, stepNo: 7 }));
    }
  }

  React.useEffect(() => {
    if (reportingAddSuccess) {
      setApproveDialog(false);
    }
  }, [reportingAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to approve the follow-up?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-secondary float-start ${
              loading && "disabled"
            } `}
            onClick={handleApproveFollowUp}
          >
            {loading ? "Loading..." : "Approve"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setApproveDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveDialog;
