import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitSummarizedReport } from "../../../../../global-redux/reducers/reports/summarized-report/slice";

const SubmitSummarizedReportDialog = ({
    currentReportItem,
    setShowSubmitDialog,
}) => {
    const dispatch = useDispatch();
    const { summarizedReportAddSuccess, loading } = useSelector(
        (state) => state?.summarizedReport
    );

    function handleSubmit() {
        if (!loading) {
            dispatch(
                setupSubmitSummarizedReport({
                    submitted: true,
                    approved: false,
                    summarizedReportId: currentReportItem?.id,
                })
            );
        }
    }

    React.useEffect(() => {
        if (summarizedReportAddSuccess) {
            setShowSubmitDialog(false);
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
                    className={`btn btn-secondary  ${loading && "disabled"}`}
                    onClick={handleSubmit}
                >
                    {loading ? "Loading..." : "Submit"}
                </button>
                <button
                    className={`btn btn-danger ${loading && "disabled"} mx-2`}
                    onClick={() => setShowSubmitDialog(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SubmitSummarizedReportDialog;
