import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateSummarizedReport } from "../../../../../global-redux/reducers/reports/summarized-report/slice";

const SubmitSummarizedReportDialog = ({
    currentReportItem,
    setShowSubmitReportDialog,
}) => {
    const dispatch = useDispatch();
    const { summarizedReportAddSuccess, addReportLoading } = useSelector(
        (state) => state?.internalAuditReport
    );

    function handleSubmit() {
        if (!addReportLoading) {
            dispatch(
                setupUpdateSummarizedReport({
                    ...currentReportItem,
                    submitted: true,
                })
            );
        }
    }

    React.useEffect(() => {
        if (summarizedReportAddSuccess) {
            setShowSubmitReportDialog(false);
        }
    }, [summarizedReportAddSuccess]);

    return (
        <div className="p-4">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <p>Are You Sure You Want To Submit Report?</p>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className={`btn btn-secondary  ${addReportLoading && "disabled"}`}
                    onClick={handleSubmit}
                >
                    {addReportLoading ? "Loading..." : "Submit"}
                </button>
                <button
                    className={`btn btn-danger ${addReportLoading && "disabled"} mx-2`}
                    onClick={() => setShowSubmitReportDialog(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SubmitSummarizedReportDialog;
