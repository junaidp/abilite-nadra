import React from "react";

const ActionButtons = ({
    item,
    user,
    loading,
    singleReport,
    currentItem,
    handleSaveStep1,
    handleSaveToStep1,
    handleSaveStep2,
    handleSaveToStep2,
    handleSaveToStep4,
    handleAllowEditSection1,
    setCurrentReportingAndFollowUpId,
    setFeedBackDialog,
    setShowCurrentSubmittedItem,
    setShowSubmitDialog,
    setViewFeedBackItem,
    setViewFirstFeedBackDialog,
    setViewSecondFeedBackDialog,
}) => {
    return (
        <div className="d-flex flex-end w-100 gap-4">
            {/* Step 0: Save + Submit */}
            {item?.stepNo === 0 && (
                <>
                    <button
                        className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                            }`}
                        onClick={() => handleSaveStep1(item)}
                    >
                        {loading ? "Loading..." : "Save"}
                    </button>

                    <button
                        className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                            }`}
                        onClick={() => handleSaveToStep1(item)}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </>
            )}

            {/* Step 1: Edit allowed → Save */}
            {handleAllowEditSection1(item) === true && item?.stepNo === 1 && (
                <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                        }`}
                    onClick={() => handleSaveStep2(item)}
                >
                    {loading ? "Loading..." : "Save"}
                </button>
            )}

            {/* Step 1: Approve + Feedback (IAH or approvers only) */}
            {item?.stepNo === 1 &&
                (user?.userId?.employeeid?.userHierarchy === "IAH" ||
                    Number(user?.userId?.id) ===
                    Number(
                        singleReport?.resourceAllocation?.backupHeadOfInternalAudit?.id
                    ) ||
                    Number(user?.userId?.id) ===
                    Number(singleReport?.resourceAllocation?.proposedJobApprover?.id)) && (
                    <>
                        <button
                            className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                                }`}
                            onClick={() => handleSaveToStep2(item)}
                        >
                            {loading ? "Loading..." : "Approve"}
                        </button>

                        <button
                            className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                                }`}
                            onClick={() => {
                                setCurrentReportingAndFollowUpId(item?.id);
                                setFeedBackDialog(true);
                            }}
                        >
                            FeedBack
                        </button>
                    </>
                )}

            {/* Step 2: Save + Submit (auditee only) */}
            {item?.stepNo === 2 &&
                Number(user?.userId?.id) === Number(currentItem?.auditee?.id) && (
                    <>
                        <button
                            className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                                }`}
                            onClick={() => handleSaveStep2(item)}
                        >
                            {loading ? "Loading..." : "Save"}
                        </button>

                        <button
                            className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                                }`}
                            onClick={() => {
                                setShowCurrentSubmittedItem(item);
                                setShowSubmitDialog(true);
                            }}
                        >
                            Submit
                        </button>
                    </>
                )}

            {/* Step 3: Approve + Feedback (IAH, approvers, or resourcesList) */}
            {item?.stepNo === 3 &&
                (user?.userId?.employeeid?.userHierarchy === "IAH" ||
                    Number(user?.userId?.id) ===
                    Number(
                        singleReport?.resourceAllocation?.backupHeadOfInternalAudit?.id
                    ) ||
                    Number(user?.userId?.id) ===
                    Number(singleReport?.resourceAllocation?.proposedJobApprover?.id) ||
                    singleReport?.resourceAllocation?.resourcesList?.find(
                        (singleResource) =>
                            Number(singleResource?.id) === Number(user?.userId?.id)
                    )) && (
                    <>
                        <button
                            className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                                }`}
                            onClick={() => handleSaveToStep4(item)}
                        >
                            {loading ? "Loading..." : "Approve"}
                        </button>

                        <button
                            className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                                }`}
                            onClick={() => {
                                setCurrentReportingAndFollowUpId(item?.id);
                                setFeedBackDialog(true);
                            }}
                        >
                            FeedBack
                        </button>
                    </>
                )}

            {/* Feedback View Buttons */}
            {item?.firstFeedback?.description && (
                <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                        }`}
                    onClick={() => {
                        setViewFeedBackItem(item);
                        setViewFirstFeedBackDialog(true);
                    }}
                >
                    View First FeedBack
                </button>
            )}

            {item?.secondFeedback?.description && (
                <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                        }`}
                    onClick={() => {
                        setViewFeedBackItem(item);
                        setViewSecondFeedBackDialog(true);
                    }}
                >
                    View Second FeedBack
                </button>
            )}
        </div>
    );
};

export default React.memo(ActionButtons);
