import moment from "moment";

const ReportFirstLayout = ({ singleSummarizedReport }) => {
    return (
        <div>
            <div className="row  ">
                <div className="col-md-12">
                    <div className="sub-heading ps-2  fw-bold">
                        {singleSummarizedReport?.jobName || "No name provided"}
                    </div>
                    <hr />
                </div>
            </div>
            <div className="border px-3 py-2 rounded">
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <div>
                            <label className="me-3">Report Name:</label>
                            <input
                                className="form-control w-100"
                                name="reportName"
                                value={singleSummarizedReport?.reportName || ""}
                                disabled
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <label className="me-3">Report Date:</label>
                            <input
                                className="form-control w-100"
                                placeholder="Select Date"
                                type="date"
                                name="reportDate"
                                value={moment
                                    .utc(singleSummarizedReport?.reportDate)
                                    .format("YYYY-MM-DD")}
                                disabled
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-lg-6">
                        <div>
                            <label className="me-3">Planned Start Date:</label>
                            <input
                                className="form-control w-100"
                                placeholder="Select Date"
                                type="date"
                                disabled
                                value={moment
                                    .utc(singleSummarizedReport?.plannedStartDate)
                                    .format("YYYY-MM-DD")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <label className="me-3">Planned End Date:</label>
                            <input
                                className="form-control w-100"
                                placeholder="Select Date"
                                type="date"
                                disabled
                                value={moment
                                    .utc(singleSummarizedReport?.plannedEndDate)
                                    .format("YYYY-MM-DD")}
                            />
                        </div>
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-lg-6">
                        <div>
                            <label className="me-3   ">Risk Approach:</label>
                            <input
                                className="form-control w-100"
                                placeholder="Enter Risk Approach"
                                type="text"
                                value={
                                    singleSummarizedReport?.riskApproach ||
                                    "No Risk Approach Provided"
                                }
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <label className="me-3">Planned Hours:</label>
                            <input
                                className="form-control w-100"
                                placeholder="Enter planned Hours"
                                type="text"
                                disabled
                                value={singleSummarizedReport?.plannedHours}
                            />
                        </div>
                    </div>
                    {/* Resources */}
                    <div className="row mb-3 f-13 mt-3">
                        <div className="col-lg-4 px-3 d-flex justify-content-between">
                            <div className="fw-bold">Head Of Internal Audit:</div>
                            <div className="">
                                {singleSummarizedReport?.resourceAllocation?.headOfInternalAudit
                                    ?.name || "No Head Of Internal Audit"}
                            </div>
                        </div>
                        <div className="col-lg-4 px-3 d-flex justify-content-between">
                            <div className="fw-bold">Backup Head Of InternalAudit:</div>
                            <div className="">
                                {singleSummarizedReport?.resourceAllocation
                                    ?.backupHeadOfInternalAudit?.name ||
                                    "No Backup Head Of InternalAudit Assigned "}
                            </div>
                        </div>
                        <div className="col-lg-4 px-3 d-flex justify-content-between">
                            <div className="fw-bold">Proposed Job Approver:</div>
                            <div className="">
                                {singleSummarizedReport?.resourceAllocation?.proposedJobApprover
                                    ?.name || "No Proposed Job Approver Assigned "}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 mt-3 f-13">
                        <div className="col-lg-4 px-3 d-flex gap-4 flex-wrap w-100">
                            <div className="fw-bold">Resource List:</div>

                            {singleSummarizedReport?.resourceAllocation?.resourcesList &&
                                singleSummarizedReport?.resourceAllocation?.resourcesList
                                    .length ? (
                                <div className="d-flex gap-4 flex-wrap">
                                    {singleSummarizedReport?.resourceAllocation?.resourcesList?.map(
                                        (user) => {
                                            return <div>{user?.name}</div>;
                                        }
                                    )}
                                </div>
                            ) : (
                                <p>Resource List Not Found</p>
                            )}
                        </div>
                    </div>
                    {/* Resources */}
                </div>
            </div>
        </div>
    );
};

export default ReportFirstLayout;
