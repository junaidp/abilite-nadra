import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    setupGetAllSummarizedReports,
    resetSummarizedReportAddSuccess,
    setupGetAllLocations,
    handleChangeReport
} from "../../../../global-redux/reducers/reports/summarized-report/slice";
import {
    CircularProgress,
    Typography,
    Pagination,
    Tooltip,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";
import moment from "moment";
import DeleteDialog from "./dialogs/DeleteDialog";
import { encryptAndEncode } from "../../../../config/helper";

const poppinsStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "normal",
};

/**
 * Displays all summarized reports with pagination, CRUD actions, and role-based access.
 * Also handles refreshing data on page change, year change, or new report creation.
 */
const SummarizedReport = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isInitialRender = React.useRef(true);

    const { company, year } = useSelector((state) => state?.common);
    const { user } = useSelector((state) => state?.auth);
    const {
        allSummarizedReports,
        loading,
        summarizedReportAddSuccess,
        totalNoOfRecords,
    } = useSelector((state) => state?.summarizedReport);

    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [deleteReportId, setDeleteReportId] = React.useState("");

    /** 🔹 Utility: Extracts selected company ID from user */
    const getCompanyId = React.useCallback(() => {
        return user?.[0]?.company?.find((item) => item?.companyName === company)?.id;
    }, [user, company]);

    /** 🔹 Handle pagination change */
    const handlePageChange = (_, value) => setPage(value);

    /** 🔹 Handle items per page selection */
    const handleItemsPerPageChange = (event) => {
        const companyId = getCompanyId();
        if (!companyId) return;
        const value = Number(event.target.value);
        setPage(1);
        setItemsPerPage(value);
        dispatch(
            setupGetAllSummarizedReports({
                companyId,
                page: 1,
                itemsPerPage: value,
                year,
            })
        );
    };

    /** 🔹 Fetch reports after successful creation */
    React.useEffect(() => {
        if (!summarizedReportAddSuccess) return;
        const companyId = getCompanyId();
        if (companyId) {
            setPage(1);
            setItemsPerPage(5);
            dispatch(
                setupGetAllSummarizedReports({
                    companyId,
                    page: 1,
                    itemsPerPage: 5,
                    year,
                })
            );
            dispatch(resetSummarizedReportAddSuccess());
        }
    }, [summarizedReportAddSuccess, dispatch, getCompanyId, year]);

    /** 🔹 Fetch reports on page change */
    React.useEffect(() => {
        const companyId = getCompanyId();
        if (companyId) {
            dispatch(
                setupGetAllSummarizedReports({
                    companyId,
                    page,
                    itemsPerPage,
                    year,
                })
            );
        }
    }, [dispatch, getCompanyId, page, itemsPerPage, year]);

    /** 🔹 Load company locations */
    React.useEffect(() => {
        const companyId = getCompanyId();
        if (companyId) {
            dispatch(setupGetAllLocations(`?companyId=${companyId}`));
        }
    }, [dispatch, getCompanyId]);

    /** 🔹 Refresh on year change (skip initial mount) */
    React.useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        const companyId = getCompanyId();
        if (companyId) {
            setPage(1);
            setItemsPerPage(5);
            dispatch(
                setupGetAllSummarizedReports({
                    companyId,
                    page: 1,
                    itemsPerPage: 5,
                    year,
                })
            );
        }
    }, [year, dispatch, getCompanyId]);

    return (
        <div>
            {/* 🔹 Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <div className="model-parent d-flex justify-content-center align-items-center">
                    <div className="model-wrap">
                        <DeleteDialog
                            setShowDeleteSummarizedReportDialog={setShowDeleteDialog}
                            deleteSummarizedReportId={deleteReportId}
                        />
                    </div>
                </div>
            )}

            {/* 🔹 Header */}
            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
                <div className="mb-0 heading">Summarized Report</div>

                <div>
                    <div
                        className="btn btn-labeled btn-primary px-3 shadow"
                        onClick={() => navigate("/audit/generate-summarized-report")}
                    >
                        Generate Report
                    </div>

                    <Tooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit" className="mb-2" style={poppinsStyle}>
                                    Click to create a new summarized report
                                </Typography>
                                <ul
                                    style={{
                                        ...poppinsStyle,
                                        paddingLeft: "20px",
                                        margin: 0,
                                    }}
                                >
                                    <li>Select a job from the list</li>
                                    <li>Provide all required fields</li>
                                    <li>Submit or approve to generate the PDF</li>
                                </ul>
                            </React.Fragment>
                        }
                        arrow
                    >
                        <i className="fa fa-info-circle ps-3 text-secondary cursor-pointer"></i>
                    </Tooltip>
                </div>
            </header>

            {/* 🔹 Report Table */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover rounded">
                            <thead className="bg-secondary text-white">
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Job Name</th>
                                    <th>Report Name</th>
                                    <th>Report Date</th>
                                    <th>Prepared By</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            <CircularProgress size={24} />
                                        </td>
                                    </tr>
                                ) : !allSummarizedReports?.length ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No Summarized Reports To Show.
                                        </td>
                                    </tr>
                                ) : (
                                    allSummarizedReports.map((item, index) => {
                                        const encryptedId = encryptAndEncode(item?.id.toString());
                                        const canEditOrDelete =
                                            (item.preparedBy === user?.[0]?.userId?.employeeid?.name &&
                                                !item?.submitted) ||
                                            user?.[0]?.userId?.employeeid?.userHierarchy === "IAH";

                                        return (
                                            <tr key={item?.id || index}>
                                                <td>{(page - 1) * itemsPerPage + index + 1}</td>
                                                <td>{item?.jobName || "-"}</td>
                                                <td>{item?.reportName || "-"}</td>
                                                <td>{moment(item?.reportDate).format("DD-MM-YYYY")}</td>
                                                <td>{item?.preparedBy || "-"}</td>
                                                <td>{item?.status || "-"}</td>
                                                <td>
                                                    <div className="d-flex flex-wrap gap-3">
                                                        {/* View */}
                                                        <i
                                                            className="fa fa-eye f-18 cursor-pointer"
                                                            onClick={() =>
                                                                navigate(`/audit/view-summarized-report/${encryptedId}`)
                                                            }
                                                        ></i>

                                                        {/* Edit */}
                                                        {canEditOrDelete && (
                                                            <i
                                                                className="fa fa-edit f-18 cursor-pointer"
                                                                onClick={() =>
                                                                    navigate(`/audit/update-summarized-report/${encryptedId}`)
                                                                }
                                                            ></i>
                                                        )}

                                                        {/* Delete */}
                                                        {canEditOrDelete && (
                                                            <i
                                                                className="fa fa-trash text-danger cursor-pointer f-18"
                                                                onClick={() => {
                                                                    setDeleteReportId(item?.id);
                                                                    setShowDeleteDialog(true);
                                                                }}
                                                            ></i>
                                                        )}

                                                        {/* Download */}
                                                        <Tooltip title="Download PDF" placement="top">
                                                            <i
                                                                className="fa fa-download f-18 cursor-pointer"
                                                                onClick={() => {
                                                                    dispatch(handleChangeReport(item))
                                                                    navigate(`/audit/download-summarized-report/${encryptedId}`)
                                                                }
                                                                }
                                                            ></i>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔹 Pagination */}
                    {allSummarizedReports?.length > 0 && (
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <Pagination
                                    count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                                    page={page}
                                    onChange={handlePageChange}
                                />
                            </div>
                            <div className="col-lg-6 mb-4 d-flex justify-content-end">
                                <FormControl sx={{ minWidth: 200 }} size="small">
                                    <InputLabel id="items-per-page-label">Items Per Page</InputLabel>
                                    <Select
                                        labelId="items-per-page-label"
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                    >
                                        {[5, 10, 20, 30].map((num) => (
                                            <MenuItem key={num} value={num}>
                                                {num}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummarizedReport;
