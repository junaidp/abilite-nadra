import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveReporting } from "../../../../../../../global-redux/reducers/reporting/slice";

const FirstApproveReportingDialog = ({
  setFirstApproveDialog,
  currentApproveItem,
}) => {
  const dispatch = useDispatch();
  const { loading, approveAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  function handleFirstApproveReportingDialog() {
    if (!loading) {
      dispatch(
        setupApproveReporting({
          ...currentApproveItem,
          stepNo: 2,
        })
      );
    }
  }

  React.useEffect(() => {
    if (approveAddSuccess) {
      setFirstApproveDialog(false);
    }
  }, [approveAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Approve Reporting?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-secondary float-start ${loading && "disabled"} `}
          onClick={handleFirstApproveReportingDialog}
        >
          {loading ? "Loading..." : "Approve"}
        </button>
        <button
          type="button"
          className="btn btn-danger float-end"
          onClick={() => setFirstApproveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FirstApproveReportingDialog;
