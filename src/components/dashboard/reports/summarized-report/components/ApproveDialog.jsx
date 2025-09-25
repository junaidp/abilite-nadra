import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateSummarizedReport } from "../../../../../global-redux/reducers/reports/summarized-report/slice";

const ApproveSummarizedReportDialog = ({
    currentReportItem,
    setShowApproveDialog,
}) => {
    const dispatch = useDispatch();
    const { summarizedReportAddSuccess, addReportLoading } = useSelector(
        (state) => state?.summarizedReport
    );

    function handleApprove() {
        if (!addReportLoading) {
            dispatch(
                setupUpdateSummarizedReport({
                    ...currentReportItem,
                    approved: true,
                })
            );
        }
    }

    React.useEffect(() => {
        if (summarizedReportAddSuccess) {
            setShowApproveDialog(false);
        }
    }, [summarizedReportAddSuccess]);

    return (
        <div className="p-4">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <p>Are You Sure You Want To Approve Report?</p>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className={`btn btn-secondary ${addReportLoading && "disabled"}`}
                    onClick={handleApprove}
                >
                    {addReportLoading ? "Loading..." : "Approve"}
                </button>
                <button
                    className={`btn btn-danger  mx-2`}
                    onClick={() => setShowApproveDialog(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ApproveSummarizedReportDialog;
