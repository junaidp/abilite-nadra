import React, { useMemo } from "react";

/**
 * ActionButtons
 * Renders Save/Submit/Approve/Feedback/View Feedback actions.
 *
 * Props are intentionally verbose to preserve original logic & interactions.
 */
const ActionButtons = ({
    item,
    user,
    singleReport,
    loading,
    handleSave,
    handleSaveToStep7,
    handleSaveToStep5,
    setCurrentReportingAndFollowUpId,
    setFeedBackDialog,
    setShowCurrentSubmittedItem,
    setShowSubmitDialog,
    setViewFeedBackItem,
    setViewThirdFeedBackDialog,
}) => {
    // small helpers to avoid repeating the long conditions
    const isAuditee = useMemo(
        () => Number(user?.[0]?.userId?.id) === Number(item?.auditee?.id),
        [user, item]
    );

    const isStep6Approver = useMemo(() => {
        const userId = Number(user?.[0]?.userId?.id);
        const hierarchy = user?.[0]?.userId?.employeeid?.userHierarchy;
        const allResources = singleReport?.resourceAllocation;
        return (
            hierarchy === "IAH" ||
            userId === Number(allResources?.backupHeadOfInternalAudit?.id) ||
            userId === Number(allResources?.proposedJobApprover?.id) ||
            allResources?.resourcesList?.some((r) => Number(r?.id) === userId)
        );
    }, [user, singleReport]);

    const disabledClass = loading ? "disabled" : "";

    return (
        <div className="row">
            <div className="col-lg-12 text-end">
                <div className="d-flex align-items-center place-end">
                    {/* Step 5: Auditee Save / Submit */}
                    {item?.stepNo === 5 && isAuditee && (
                        <>
                            <button
                                className={`btn btn-labeled btn-primary mx-4 mt-3 shadow ${disabledClass}`}
                                onClick={() => handleSave(item)}
                            >
                                {loading ? "Loading..." : "Save"}
                            </button>

                            <button
                                className={`btn btn-labeled btn-primary mx-4  mt-3 shadow ${disabledClass}`}
                                onClick={() => {
                                    setShowCurrentSubmittedItem(item);
                                    setShowSubmitDialog(true);
                                }}
                            >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </>
                    )}

                    {/* Step 6: Approve + Feedback for approvers/resources */}
                    {item?.stepNo === 6 && isStep6Approver && (
                        <>
                            {
                                item.followUp.recommendationsImplemented ?
                                    <button
                                        className={`btn btn-labeled btn-primary mx-4 mt-3 shadow ${disabledClass}`}
                                        onClick={() => handleSaveToStep7(item)}
                                    >
                                        {loading ? "Loading..." : "Approve"}
                                    </button> :
                                    <button
                                        className={`btn btn-labeled btn-primary mx-4 mt-3 shadow ${disabledClass}`}
                                        onClick={() => handleSaveToStep5(item)}
                                    >
                                        {loading ? "Loading..." : "Approve"}
                                    </button>
                            }

                            <button
                                className={`btn btn-labeled btn-primary  mx-4 mt-3 shadow ${disabledClass}`}
                                onClick={() => {
                                    setCurrentReportingAndFollowUpId(item?.id);
                                    setFeedBackDialog(true);
                                }}
                            >
                                FeedBack
                            </button>
                        </>
                    )}

                    {/* View Third Feedback */}
                    {item?.thirdFeedback?.description && (
                        <button
                            className={`btn btn-labeled btn-primary px-3 mx-2 mt-3 shadow ${disabledClass}`}
                            onClick={() => {
                                setViewFeedBackItem(item);
                                setViewThirdFeedBackDialog(true);
                            }}
                        >
                            View FeedBack
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ActionButtons);
