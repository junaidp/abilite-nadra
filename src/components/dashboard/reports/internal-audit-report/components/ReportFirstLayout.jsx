import React, { useMemo } from "react";
import moment from "moment";
import Chip from "@mui/material/Chip";

/**
 * ReportFirstLayout Component
 * ---------------------------
 * Displays the header and metadata section of the Internal Audit Report.
 * Includes report info, planned dates, locations, departments, and assigned resources.
 */
const ReportFirstLayout = ({ reportObject, handleChangeReportObject }) => {
    // ✅ Memoized helpers for cleaner JSX
    const formattedReportDate = useMemo(
        () => moment.utc(reportObject?.reportDate).format("YYYY-MM-DD"),
        [reportObject?.reportDate]
    );

    const formattedStartDate = useMemo(
        () => moment.utc(reportObject?.plannedStartDate).format("YYYY-MM-DD"),
        [reportObject?.plannedStartDate]
    );

    const formattedEndDate = useMemo(
        () => moment.utc(reportObject?.plannedEndDate).format("YYYY-MM-DD"),
        [reportObject?.plannedEndDate]
    );

    // ✅ Helper to render Chips or empty message
    const renderChipGroup = (list, extractFn, emptyMessage) => {
        if (!list || list.length === 0) return <p className="mt-2">{emptyMessage}</p>;

        const uniqueLabels = [...new Set(list.map(extractFn))];
        return uniqueLabels.map((label, idx) => (
            <Chip label={label} key={idx} className="mx-2 mb-2" />
        ));
    };

    return (
        <div>
            {/* Report Header */}
            <div className="row">
                <div className="col-md-12">
                    <div className="sub-heading ps-2 fw-bold">{reportObject?.jobName}</div>
                    <hr />
                </div>
            </div>

            {/* Report Details Section */}
            <div className="border px-3 py-2 rounded">
                {/* Report Name & Date */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="me-3">Report Name:</label>
                        <input
                            className="form-control w-100"
                            name="reportName"
                            value={reportObject?.reportName || ""}
                            onChange={handleChangeReportObject}
                        />
                    </div>

                    <div className="col-lg-6">
                        <label className="me-3">Report Date:</label>
                        <input
                            type="date"
                            className="form-control w-100"
                            name="reportDate"
                            placeholder="Select Date"
                            value={formattedReportDate}
                            onChange={handleChangeReportObject}
                        />
                    </div>
                </div>

                {/* Planned Start / End Dates */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="me-3">Planned Start Date:</label>
                        <input
                            type="date"
                            className="form-control w-100"
                            disabled
                            value={formattedStartDate}
                        />
                    </div>

                    <div className="col-lg-6">
                        <label className="me-3">Planned End Date:</label>
                        <input
                            type="date"
                            className="form-control w-100"
                            disabled
                            value={formattedEndDate}
                        />
                    </div>
                </div>

                {/* Risk Approach & Planned Hours */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="me-3">Risk Approach:</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            placeholder="Enter Risk Approach"
                            value={reportObject?.riskApproach || "No Risk Approach Provided"}
                            disabled
                        />
                    </div>

                    <div className="col-lg-6">
                        <label className="me-3">Planned Hours:</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            placeholder="Enter Planned Hours"
                            value={reportObject?.plannedHours || ""}
                            disabled
                        />
                    </div>
                </div>

                {/* Location & Sub-Location */}
                <div className="row mb-3">
                    <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <label className="mt-2">Location:</label>
                        <div>
                            {renderChipGroup(
                                reportObject?.subLocationList,
                                (item) => item?.locationid?.description,
                                "No Location To Show"
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <label className="mt-2">Sub-Location:</label>
                        <div>
                            {!reportObject?.subLocationList?.length ? (
                                <p className="mt-2">No Sub Location To Show</p>
                            ) : (
                                reportObject?.subLocationList.map((item, index) => (
                                    <Chip
                                        label={item?.description}
                                        key={index}
                                        className="mx-2 mb-2"
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Department & Sub-Department */}
                <div className="row mb-3">
                    <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <label className="mt-2">Department:</label>
                        <div>
                            {renderChipGroup(
                                reportObject?.subDepartmentList,
                                (item) => item?.department?.description,
                                "No Department To Show"
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <label className="mt-2">Sub-Department:</label>
                        <div>
                            {!reportObject?.subDepartmentList?.length ? (
                                <p className="mt-2">No Sub Department To Show</p>
                            ) : (
                                reportObject?.subDepartmentList.map((item, index) => (
                                    <Chip
                                        label={item?.description}
                                        key={index}
                                        className="mx-2 mb-2"
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Resources Section */}
                <div className="row mb-3 f-13">
                    <div className="col-lg-4 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Head Of Internal Audit:</div>
                        <div>
                            {reportObject?.resourceAllocations?.headOfInternalAudit?.name ||
                                "No Head Of Internal Audit"}
                        </div>
                    </div>

                    <div className="col-lg-4 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Backup Head Of Internal Audit:</div>
                        <div>
                            {reportObject?.resourceAllocations?.backupHeadOfInternalAudit
                                ?.name || "No Backup Head Of Internal Audit Assigned"}
                        </div>
                    </div>

                    <div className="col-lg-4 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Proposed Job Approver:</div>
                        <div>
                            {reportObject?.resourceAllocations?.proposedJobApprover?.name ||
                                "No Proposed Job Approver Assigned"}
                        </div>
                    </div>
                </div>

                {/* Resource List */}
                <div className="row mb-3 mt-3 f-13">
                    <div className="col-lg-12 px-3 d-flex gap-4 flex-wrap w-100">
                        <div className="fw-bold">Resource List:</div>
                        {reportObject?.resourceAllocations?.resourcesList?.length ? (
                            <div className="d-flex gap-4 flex-wrap">
                                {reportObject?.resourceAllocations?.resourcesList.map(
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

export default ReportFirstLayout;
