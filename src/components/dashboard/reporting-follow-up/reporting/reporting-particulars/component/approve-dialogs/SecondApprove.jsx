import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveReporting } from "../../../../../../../global-redux/reducers/reporting/slice";

const SecondApproveReportingDialog = ({
  setSecondApproveDialog,
  currentApproveItem,
}) => {
  const dispatch = useDispatch();
  const { loading, reportingAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  function handleSecondApproveReportingDialog() {
    if (!loading) {
      dispatch(
        setupApproveReporting({
          ...currentApproveItem,
          stepNo: 4,
        })
      );
    }
  }

  React.useEffect(() => {
    if (reportingAddSuccess) {
      setSecondApproveDialog(false);
    }
  }, [reportingAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to approve the reporting?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-secondary float-start ${
              loading && "disabled"
            } `}
            onClick={handleSecondApproveReportingDialog}
          >
            {loading ? "Loading..." : "Approve"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setSecondApproveDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondApproveReportingDialog;
