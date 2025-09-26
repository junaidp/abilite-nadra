import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    setupGetAllSummarizedReports,
    resetSummarizedReportAddSuccess,
    setupGetAllLocations
} from "../../../../global-redux/reducers/reports/summarized-report/slice";
import { CircularProgress, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import DeleteDialog from "./components/DeleteDialog";
import SubmitDialog from "./components/SubmitDialog";
import ApproveDialog from "./components/ApproveDialog";
import FeedBackDialog from "./components/FeedBackDialog";
import ViewFeedBackDialog from "./components/ViewFeedBackDialog";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { encryptAndEncode } from "../../../../config/helper";

const poppinsStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "normal",
};

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
    const [currentReportItem, setCurrentReportItem] = React.useState({});
    const [showSubmitReportDialog, setShowSubmitReportDialog] =
        React.useState(false);
    const [showApproveDialog, setShowApproveDialog] = React.useState(false);
    const [showFeedBackDialog, setFeedBackDialog] = React.useState(false);
    const [viewFeedBackDialog, setViewFeedBackDialog] = React.useState(false);
    const [
        showDeleteSummarizedReportDialog,
        setShowDeleteSummarizedReportDialog,
    ] = React.useState(false);
    const [deleteSummarizedReportId, setDeleteSummarizedReportId] =
        React.useState("");

    const handleChange = (_, value) => {
        setPage(value);
    };
    function handleSubmitReport(item) {
        setCurrentReportItem(item);
        setShowSubmitReportDialog(true);
    }
    function handleApproveReport(item) {
        setCurrentReportItem(item);
        setShowApproveDialog(true);
    }

    function handleChangeItemsPerPage(event) {
        const companyId = user[0]?.company?.find(
            (item) => item?.companyName === company
        )?.id;
        if (companyId) {
            setPage(1);
            setItemsPerPage(Number(event.target.value));
            dispatch(
                setupGetAllSummarizedReports({
                    companyId,
                    page: 1,
                    itemsPerPage: Number(event.target.value),
                    year,
                })
            );
        }
    }

    React.useEffect(() => {
        if (summarizedReportAddSuccess) {
            const companyId = user[0]?.company?.find(
                (item) => item?.companyName === company
            )?.id;
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
        }
    }, [summarizedReportAddSuccess]);

    React.useEffect(() => {
        const companyId = user[0]?.company?.find(
            (item) => item?.companyName === company
        )?.id;
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
    }, [dispatch, page]);

    React.useEffect(() => {
        const companyId = user[0]?.company?.find(
            (item) => item?.companyName === company
        )?.id;
        if (companyId) {
            dispatch(setupGetAllLocations(`?companyId=${companyId}`));
        }
    }, [dispatch])

    React.useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return; // Skip the initial render
        }

        const companyId = user[0]?.company?.find(
            (item) => item?.companyName === company
        )?.id;

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
    }, [year]);

    return (
        <div>
            {showDeleteSummarizedReportDialog && (
                <div className="model-parent  d-flex justify-content-between items-center">
                    <div className="model-wrap">
                        <DeleteDialog
                            setShowDeleteSummarizedReportDialog={
                                setShowDeleteSummarizedReportDialog
                            }
                            deleteSummarizedReportId={deleteSummarizedReportId}
                        />
                    </div>
                </div>
            )}
            {showSubmitReportDialog && (
                <div className="model-parent  d-flex justify-content-between items-center">
                    <div className="model-wrap">
                        <SubmitDialog
                            currentReportItem={currentReportItem}
                            setShowSubmitReportDialog={setShowSubmitReportDialog}
                        />
                    </div>
                </div>
            )}
            {showApproveDialog && (
                <div className="model-parent  d-flex justify-content-between items-center">
                    <div className="model-wrap">
                        <ApproveDialog
                            currentReportItem={currentReportItem}
                            setShowApproveDialog={setShowApproveDialog}
                        />
                    </div>
                </div>
            )}
            {showFeedBackDialog && (
                <div className="model-parent">
                    <div className="model-wrap">
                        <FeedBackDialog
                            Id={currentReportItem?.id}
                            setFeedBackDialog={setFeedBackDialog}
                        />
                    </div>
                </div>
            )}
            {viewFeedBackDialog && (
                <div className="model-parent">
                    <div className="model-wrap">
                        <ViewFeedBackDialog
                            currentReportItem={currentReportItem}
                            setViewFeedBackDialog={setViewFeedBackDialog}
                        />
                    </div>
                </div>
            )}
            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
                <div className="mb-0 heading">Summarized Report</div>
                <div className="">
                    <div
                        className="btn btn-labeled btn-primary px-3 shadow"
                        onClick={() => navigate("/audit/generate-summarized-report")}
                    >
                        Generate Report
                    </div>
                    <Tooltip
                        title={
                            <React.Fragment>
                                <Typography
                                    color="inherit"
                                    className="mb-2"
                                    style={poppinsStyle}
                                >
                                    Click to create a new summarized report
                                </Typography>
                                <ul
                                    style={{
                                        ...poppinsStyle,
                                        paddingLeft: "20px",
                                        margin: "0",
                                    }}
                                >
                                    <li>Select the job from the list</li>
                                    <li>Provide all the required fields</li>
                                    <li>Submit or approve the report to generate the PDF</li>
                                </ul>
                            </React.Fragment>
                        }
                        arrow
                    >
                        <i className="fa fa-info-circle ps-3 text-secondary cursor-pointer"></i>
                    </Tooltip>
                </div>
            </header>

            <div className="row">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered  table-hover rounded">
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
                                        <td className="w-300">
                                            <CircularProgress />
                                        </td>
                                    </tr>
                                ) : !allSummarizedReports?.length || !allSummarizedReports ? (
                                    <tr>
                                        <td className="w-300">
                                            No Summarized Reports To Show.
                                        </td>
                                    </tr>
                                ) : (
                                    allSummarizedReports?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{(page - 1) * itemsPerPage + index + 1}</td>
                                                <td>{item?.jobName || ""}</td>
                                                <td>{item?.reportName || ""}</td>
                                                <td>{moment(item?.reportDate).format("DD-MM-YYYY")}</td>
                                                <td>{item?.preparedBy || ""}</td>
                                                <td>{item?.status}</td>
                                                <td>
                                                    <div className="d-flex flex-wrap gap-4">
                                                        <i
                                                            className="fa-eye fa f-18 cursor-pointer"
                                                            onClick={() => {
                                                                const encryptedId = encryptAndEncode(
                                                                    item?.id.toString()
                                                                );
                                                                navigate(
                                                                    `/audit/view-summarized-report/${encryptedId}`
                                                                );
                                                            }}
                                                        ></i>
                                                        {(item.preparedBy ===
                                                            user[0]?.userId.employeeid.name &&
                                                            item?.submitted === false) ||
                                                            user[0]?.userId?.employeeid?.userHierarchy ===
                                                            "IAH" ? (
                                                            <i
                                                                className="fa fa-edit f-18 cursor-pointer"
                                                                onClick={() => {
                                                                    const encryptedId = encryptAndEncode(
                                                                        item?.id.toString()
                                                                    );
                                                                    navigate(
                                                                        `/audit/update-summarized-report/${encryptedId}`
                                                                    );
                                                                }}
                                                            ></i>
                                                        ) : null}
                                                        {(item.preparedBy ===
                                                            user[0]?.userId.employeeid.name &&
                                                            item?.submitted === false) ||
                                                            user[0]?.userId?.employeeid?.userHierarchy ===
                                                            "IAH" ? (
                                                            <i
                                                                className={`fa fa-trash text-danger cursor-pointer f-18`}
                                                                onClick={() => {
                                                                    setDeleteSummarizedReportId(item?.id);
                                                                    setShowDeleteSummarizedReportDialog(true);
                                                                }}
                                                            ></i>
                                                        ) : null}
                                                        {/* {item?.reportName &&
                                                            item?.reportName !== "" &&
                                                            item?.executiveSummary &&
                                                            item?.executiveSummary !== "" &&
                                                            item?.auditPurpose &&
                                                            item?.auditPurpose !== "" &&
                                                            item?.submitted === false &&
                                                            item.preparedBy ===
                                                            user[0]?.userId.employeeid.name && (
                                                                <div
                                                                    className={`btn btn-labeled btn-primary shadow h-35`}
                                                                    onClick={() => handleSubmitReport(item)}
                                                                >
                                                                    Submit
                                                                </div>
                                                            )}
                                                        {item?.submitted === true &&
                                                            item?.approved === false &&
                                                            user[0]?.userId?.employeeid?.userHierarchy ===
                                                            "IAH" && (
                                                                <div
                                                                    className={`btn btn-labeled btn-primary shadow h-35`}
                                                                    onClick={() => handleApproveReport(item)}
                                                                >
                                                                    Approve
                                                                </div>
                                                            )}

                                                        {item?.submitted === true &&
                                                            item?.approved === false &&
                                                            user[0]?.userId?.employeeid?.userHierarchy ===
                                                            "IAH" && (
                                                                <div
                                                                    className={`btn btn-labeled btn-primary shadow h-35`}
                                                                    onClick={() => {
                                                                        setCurrentReportItem(item);
                                                                        setFeedBackDialog(true);
                                                                    }}
                                                                >
                                                                    FeedBack
                                                                </div>
                                                            )}
                                                        {item?.feedback && item?.feedback?.id && (
                                                            <div
                                                                className={`btn btn-labeled btn-primary shadow  h-35`}
                                                                onClick={() => {
                                                                    setCurrentReportItem(item);
                                                                    setViewFeedBackDialog(true);
                                                                }}
                                                            >
                                                                View FeedBack
                                                            </div>
                                                        )} */}
                                                        <Tooltip
                                                            title="Link to download pdf"
                                                            placement="top"
                                                        >
                                                            <i
                                                                className="fa fa-download f-18 cursor-pointer"
                                                                onClick={() => {
                                                                    const encryptedId = encryptAndEncode(
                                                                        item?.id.toString()
                                                                    );
                                                                    navigate(
                                                                        `/audit/download-summarized-report/${encryptedId}`
                                                                    );
                                                                }}
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
                    {allSummarizedReports?.length > 0 && (
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <Pagination
                                    count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                                    page={page}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-6 mb-4 d-flex justify-content-end">
                                <div>
                                    <FormControl sx={{ minWidth: 200 }} size="small">
                                        <InputLabel id="demo-select-small-label">
                                            Items Per Page
                                        </InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            label="Age"
                                            value={itemsPerPage}
                                            onChange={(event) => handleChangeItemsPerPage(event)}
                                        >
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummarizedReport;
