import moment from "moment";

/**
 * Displays the top section of the summarized report form,
 * including metadata like report name, dates, risk approach, and resource details.
 */
const FirstLayout = ({ editableSummarizedReport, handleChangeReportObject }) => {
    return (
        <div>
            {/* Job Title */}
            <div className="row">
                <div className="col-md-12">
                    <div className="sub-heading ps-2 fw-bold">
                        {editableSummarizedReport?.jobName || "No name provided"}
                    </div>
                    <hr />
                </div>
            </div>

            {/* Report Details */}
            <div className="border px-3 py-2 rounded">
                {/* Report Name & Date */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="me-3">Report Name:</label>
                        <input
                            className="form-control w-100"
                            name="reportName"
                            value={editableSummarizedReport?.reportName || ""}
                            onChange={handleChangeReportObject}
                        />
                    </div>

                    <div className="col-lg-6">
                        <label className="me-3">Report Date:</label>
                        <input
                            className="form-control w-100"
                            placeholder="Select Date"
                            type="date"
                            name="reportDate"
                            value={moment
                                .utc(editableSummarizedReport?.reportDate)
                                .format("YYYY-MM-DD")}
                            onChange={handleChangeReportObject}
                        />
                    </div>
                </div>

                {/* Planned Dates */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="me-3">Planned Start Date:</label>
                        <input
                            className="form-control w-100"
                            placeholder="Select Date"
                            type="date"
                            disabled
                            value={moment
                                .utc(editableSummarizedReport?.plannedStartDate)
                                .format("YYYY-MM-DD")}
                        />
                    </div>

                    <div className="col-lg-6">
                        <label className="me-3">Planned End Date:</label>
                        <input
                            className="form-control w-100"
                            placeholder="Select Date"
                            type="date"
                            disabled
                            value={moment
                                .utc(editableSummarizedReport?.plannedEndDate)
                                .format("YYYY-MM-DD")}
                        />
                    </div>
                </div>

                {/* Risk Approach & Hours */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="me-3">Risk Approach:</label>
                        <input
                            className="form-control w-100"
                            placeholder="Enter Risk Approach"
                            type="text"
                            value={
                                editableSummarizedReport?.riskApproach ||
                                "No Risk Approach Provided"
                            }
                            disabled
                        />
                    </div>

                    <div className="col-lg-6">
                        <label className="me-3">Planned Hours:</label>
                        <input
                            className="form-control w-100"
                            placeholder="Enter Planned Hours"
                            type="text"
                            value={editableSummarizedReport?.plannedHours || ""}
                            disabled
                        />
                    </div>
                </div>

                {/* Resource Information */}
                <div className="row mb-3 f-13 mt-3">
                    <div className="col-lg-4 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Head Of Internal Audit:</div>
                        <div>
                            {editableSummarizedReport?.resourceAllocation?.headOfInternalAudit?.name ||
                                "No Head Of Internal Audit"}
                        </div>
                    </div>

                    <div className="col-lg-4 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Backup Head Of Internal Audit:</div>
                        <div>
                            {editableSummarizedReport?.resourceAllocation?.backupHeadOfInternalAudit?.name ||
                                "No Backup Head Of Internal Audit Assigned"}
                        </div>
                    </div>

                    <div className="col-lg-4 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Proposed Job Approver:</div>
                        <div>
                            {editableSummarizedReport?.resourceAllocation?.proposedJobApprover?.name ||
                                "No Proposed Job Approver Assigned"}
                        </div>
                    </div>
                </div>

                {/* Resource List */}
                <div className="row mb-3 mt-3 f-13">
                    <div className="col-lg-4 px-3 d-flex gap-4 flex-wrap w-100">
                        <div className="fw-bold">Resource List:</div>

                        {editableSummarizedReport?.resourceAllocation?.resourcesList?.length ? (
                            <div className="d-flex gap-4 flex-wrap">
                                {editableSummarizedReport.resourceAllocation.resourcesList.map(
                                    (user, idx) => (
                                        <div key={idx}>{user?.name}</div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p>Resource List Not Found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstLayout;
