import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteSummarizedReport } from "../../../../../global-redux/reducers/reports/summarized-report/slice";

const DeleteSummarizedReportDialog = ({
    deleteSummarizedReportId,
    setShowDeleteSummarizedReportDialog,
}) => {
    const dispatch = useDispatch();
    const { loading, summarizedReportAddSuccess } = useSelector(
        (state) => state?.summarizedReport
    );

    function handleDelete() {
        if (!loading) {
            dispatch(
                setupDeleteSummarizedReport(Number(deleteSummarizedReportId))
            );
        }
    }

    React.useEffect(() => {
        if (summarizedReportAddSuccess) {
            setShowDeleteSummarizedReportDialog(false);
        }
    }, [summarizedReportAddSuccess]);
    return (
        <div className="p-4">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <p>Are You Sure You Want To Delete Internal Audit Report?</p>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className={`btn btn-danger ${loading && "disabled"}`}
                    onClick={handleDelete}
                >
                    {loading ? "Loading..." : "Delete"}
                </button>
                <button
                    className={`btn btn-primary ${loading && "disabled"} mx-2`}
                    onClick={() => setShowDeleteSummarizedReportDialog(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DeleteSummarizedReportDialog;
