import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupApproveReporting } from "../../../../../../global-redux/reducers/reporting/slice";
import { buildReportingTransition } from "../../../reportingUpdatePayload";

const NewDateApproveDialog = ({ setNewDateApproveDialog, currentApproveItem }) => {
    const dispatch = useDispatch();
    const { loading, approveAddSuccess } = useSelector(
        (state) => state?.reporting
    );

    const handleApproveFollowUp = async () => {
        if (loading) return;

        try {
            dispatch(
                setupApproveReporting(buildReportingTransition(currentApproveItem, 5))
            )
        } catch (error) {
            console.error("Error approving follow-up:", error);
        }
    };


    React.useEffect(() => {
        if (approveAddSuccess) {
            setNewDateApproveDialog(false);
        }
    }, [approveAddSuccess]);
    return (
        <div className="px-4 py-4">
            <div>
                <p>Are You Sure You Want To Approve The Next Implementation Date?</p>
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
                    onClick={() => setNewDateApproveDialog(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NewDateApproveDialog;
