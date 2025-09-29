import moment from "moment";
import Chip from "@mui/material/Chip";

const ReportFirstLayout = ({ reportObject, handleChangeReportObject, isReadOnly = false }) => {

    return (
        <div>
            {/* Report Title */}
            <div className="row">
                <div className="col-md-12">
                    <div className="sub-heading ps-2 fw-bold">
                        {reportObject?.jobName}
                    </div>
                    <hr />
                </div>
            </div>

            <div className="border px-3 py-2 rounded">
                {/* Job Name & Date */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label>Job Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Job Name"
                            name="reportName"
                            value={reportObject?.reportName || ""}
                            onChange={(e) => !isReadOnly && handleChangeReportObject?.(e)}
                            disabled={isReadOnly}
                            readOnly={isReadOnly}
                        />
                    </div>

                    <div className="col-lg-6">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="reportDate"
                            value={moment.utc(reportObject?.reportDate).format("YYYY-MM-DD") || ""}
                            onChange={(e) => !isReadOnly && handleChangeReportObject?.(e)}
                            disabled={isReadOnly}
                            readOnly={isReadOnly}
                        />
                    </div>
                </div>

                {/* Planned Dates */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label>Planned Start Date:</label>
                        <input
                            type="date"
                            className="form-control w-100"
                            disabled
                            value={moment.utc(reportObject?.plannedStartDate).format("YYYY-MM-DD")}
                        />
                    </div>

                    <div className="col-lg-6">
                        <label>Planned End Date:</label>
                        <input
                            type="date"
                            className="form-control w-100"
                            disabled
                            value={moment.utc(reportObject?.plannedEndDate).format("YYYY-MM-DD")}
                        />
                    </div>
                </div>

                {/* Risk & Planned Hours */}
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label>Risk Approach:</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            value={reportObject?.riskApproach || "No Risk Approach Provided"}
                            disabled
                        />
                    </div>

                    <div className="col-lg-6">
                        <label>Planned Hours:</label>
                        <input
                            type="text"
                            className="form-control w-100"
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
                            {!reportObject?.subLocationList?.length ? (
                                <p className="mt-2">No Location To Show</p>
                            ) : (
                                [...new Set(reportObject?.subLocationList?.map((i) => i?.locationid?.description))].map(
                                    (location, index) => <Chip key={index} label={location} className="mx-2 mb-2" />
                                )
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <label className="mt-2">Sub-Location:</label>
                        <div>
                            {!reportObject?.subLocationList?.length ? (
                                <p className="mt-2">No Sub Location To Show</p>
                            ) : (
                                reportObject?.subLocationList?.map((item, index) => (
                                    <Chip key={index} label={item?.description} className="mx-2 mb-2" />
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
                            {!reportObject?.subDepartmentDTOList?.length ? (
                                <p className="mt-2">No Department To Show</p>
                            ) : (
                                [...new Set(reportObject?.subDepartmentDTOList?.map((i) => i?.department?.description))].map(
                                    (department, index) => <Chip key={index} label={department} className="mx-2 mb-2" />
                                )
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <label className="mt-2">Sub-Department:</label>
                        <div>
                            {!reportObject?.subDepartmentDTOList?.length ? (
                                <p className="mt-2">No Sub Department To Show</p>
                            ) : (
                                reportObject?.subDepartmentDTOList?.map((item, index) => (
                                    <Chip key={index} label={item?.description} className="mx-2 mb-2" />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportFirstLayout;
