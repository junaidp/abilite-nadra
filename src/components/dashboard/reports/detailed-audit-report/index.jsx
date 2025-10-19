import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  CircularProgress,
  Typography,
  Tooltip,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  setupGetAllInternalAuditReports,
  resetInternalAuditReportAddSuccess,
  handleChangeReport
} from "../../../../global-redux/reducers/reports/consolidation-report/slice";

import DeleteInternalAuditConsolidationReportDialog from "../../../modals/delete-internal-audit-consolidation-report-dialog";
import SubmitDialog from "./dialogs/SubmitDialog";
import ApproveDialog from "./dialogs/ApproveDialog";
import FeedBackDialog from "./dialogs/FeedBackDialog";
import ViewFeedBackDialog from "./dialogs/ViewFeedBackDialog";

import { encryptAndEncode } from "../../../../config/helper";

// Tooltip font styling
const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};

/**
 * DetailedAuditReport
 * Displays the list of internal audit consolidation reports with actions
 * for viewing, editing, submitting, approving, and feedback.
 */
const DetailedAuditReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const { company, year } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const {
    allInternalAuditReports,
    loading,
    internalAuditReportAddSuccess,
    totalNoOfRecords,
  } = useSelector((state) => state?.consolidationReport);

  // Local states
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentReportItem, setCurrentReportItem] = React.useState({});
  const [showSubmitReportDialog, setShowSubmitReportDialog] = React.useState(false);
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);
  const [showFeedBackDialog, setFeedBackDialog] = React.useState(false);
  const [viewFeedBackDialog, setViewFeedBackDialog] = React.useState(false);
  const [showDeleteInternalAuditReportDialog, setShowDeleteInternalAuditReportDialog] =
    React.useState(false);
  const [deleteInternalAuditReportId, setDeleteInternalAuditReportId] = React.useState("");

  const isInitialRender = React.useRef(true);

  // ---- Pagination handler ----
  const handleChange = (_, value) => setPage(value);

  // ---- Items per page change ----
  const handleChangeItemsPerPage = (event) => {
    const companyId = user[0]?.company?.find((item) => item?.companyName === company)?.id;
    if (companyId) {
      const newLimit = Number(event.target.value);
      setPage(1);
      setItemsPerPage(newLimit);
      dispatch(
        setupGetAllInternalAuditReports({
          companyId,
          page: 1,
          itemsPerPage: newLimit,
          year,
        })
      );
    }
  };

  // ---- Dialog handlers ----
  const handleSubmitReport = (item) => {
    setCurrentReportItem(item);
    setShowSubmitReportDialog(true);
  };

  const handleApproveReport = (item) => {
    setCurrentReportItem(item);
    setShowApproveDialog(true);
  };

  // ---- Re-fetch data after successful add/update/delete ----
  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      const companyId = user[0]?.company?.find((item) => item?.companyName === company)?.id;
      if (companyId) {
        setPage(1);
        setItemsPerPage(10);
        dispatch(
          setupGetAllInternalAuditReports({
            companyId,
            page: 1,
            itemsPerPage: 10,
            year,
          })
        );
        dispatch(resetInternalAuditReportAddSuccess());
      }
    }
  }, [internalAuditReportAddSuccess, dispatch, user, company, year]);

  // ---- Initial and page change fetch ----
  React.useEffect(() => {
    const companyId = user[0]?.company?.find((item) => item?.companyName === company)?.id;
    if (companyId) {
      dispatch(
        setupGetAllInternalAuditReports({
          companyId,
          page,
          itemsPerPage,
          year,
        })
      );
    }
  }, [dispatch, user, company, page, itemsPerPage, year]);

  // ---- Fetch data when year changes (after initial mount) ----
  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const companyId = user[0]?.company?.find((item) => item?.companyName === company)?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(10);
      dispatch(
        setupGetAllInternalAuditReports({
          companyId,
          page: 1,
          itemsPerPage: 10,
          year,
        })
      );
    }
  }, [year, dispatch, user, company]);

  return (
    <div>
      {/* ---- Modals ---- */}
      {showDeleteInternalAuditReportDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <DeleteInternalAuditConsolidationReportDialog
              setShowDeleteInternalAuditReportDialog={setShowDeleteInternalAuditReportDialog}
              deleteInternalAuditReportId={deleteInternalAuditReportId}
            />
          </div>
        </div>
      )}

      {showSubmitReportDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <SubmitDialog
              currentReportItem={currentReportItem}
              setShowSubmitReportDialog={setShowSubmitReportDialog}
            />
          </div>
        </div>
      )}

      {showApproveDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
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

      {/* ---- Header ---- */}
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Detailed Audit Report</div>
        <div>
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() =>
              navigate("/audit/generate-internal-audit-consolidation-report")
            }
          >
            Generate Report
          </div>
          <Tooltip
            title={
              <React.Fragment>
                <Typography color="inherit" className="mb-2" style={poppinsStyle}>
                  Click to create a new detailed audit report
                </Typography>
                <ul
                  style={{
                    ...poppinsStyle,
                    paddingLeft: "20px",
                    margin: 0,
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

      {/* ---- Table ---- */}
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
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : allInternalAuditReports?.length === 0 ||
                  allInternalAuditReports[0]?.error === "Not Found" ? (
                  <tr>
                    <td className="w-300">
                      No Internal Audit Consolidation Reports To Show.
                    </td>
                  </tr>
                ) : (
                  allInternalAuditReports?.map((item, index) => {
                    const isCreatedByUser =
                      item?.preparedBy === user[0]?.userId?.name
                    const isIAH =
                      user[0]?.userId?.employeeid?.userHierarchy === "IAH";

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
                            {/* View */}
                            <i
                              className="fa-eye fa f-18 cursor-pointer"
                              onClick={() => {
                                const encryptedId = encryptAndEncode(
                                  item?.id.toString()
                                );
                                navigate(
                                  `/audit/view-internal-audit-consolidation-report/${encryptedId}`
                                );
                              }}
                            ></i>

                            {/* Edit */}
                            {(isCreatedByUser && !item?.submitted) || isIAH ? (
                              <i
                                className="fa fa-edit f-18 cursor-pointer"
                                onClick={() => {
                                  const encryptedId = encryptAndEncode(
                                    item?.id.toString()
                                  );
                                  navigate(
                                    `/audit/update-internal-audit-consolidation-report/${encryptedId}`
                                  );
                                }}
                              ></i>
                            ) : null}

                            {/* Delete */}
                            {(isCreatedByUser && !item?.submitted) || isIAH ? (
                              <i
                                className="fa fa-trash text-danger cursor-pointer f-18"
                                onClick={() => {
                                  setDeleteInternalAuditReportId(item?.id);
                                  setShowDeleteInternalAuditReportDialog(true);
                                }}
                              ></i>
                            ) : null}

                            {/* Submit */}
                            {item?.reportName &&
                              !item?.submitted &&
                              isCreatedByUser && (
                                <div
                                  className="btn btn-labeled btn-primary shadow h-40"
                                  onClick={() => handleSubmitReport(item)}
                                >
                                  Submit
                                </div>
                              )}

                            {/* Approve */}
                            {item?.submitted &&
                              !item?.approved &&
                              isIAH && (
                                <div
                                  className="btn btn-labeled btn-primary shadow h-35"
                                  onClick={() => handleApproveReport(item)}
                                >
                                  Approve
                                </div>
                              )}

                            {/* Download */}
                            {item?.submitted && (
                              <Tooltip title="Link to download pdf" placement="top">
                                <i
                                  className="fa fa-download f-18 cursor-pointer"
                                  onClick={() => {
                                    dispatch(handleChangeReport(item))
                                    const encryptedId = encryptAndEncode(
                                      item?.id.toString()
                                    );
                                    navigate(
                                      `/audit/download-detailed-audit-report/${encryptedId}`
                                    );
                                  }}
                                ></i>
                              </Tooltip>
                            )}

                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {allInternalAuditReports?.length > 0 && (
            <div className="row">
              <div className="col-lg-6 mb-4">
                <Pagination
                  count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                  page={page}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 mb-4 d-flex justify-content-end">
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">Items Per Page</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Age"
                    value={itemsPerPage}
                    onChange={handleChangeItemsPerPage}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
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

export default DetailedAuditReport;
