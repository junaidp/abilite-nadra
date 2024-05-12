import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllInternalAuditReports,
  resetInternalAuditReportAddSuccess,
} from "../../../../global-redux/reducers/reports/consolidation-report/slice";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import DeleteInternalAuditConsolidationReportDialog from "../../../modals/delete-internal-audit-consolidation-report-dialog";
import MyDocument from "./view-internal-audit-report/components/PDFGenerator";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SubmitDialog from "./dialogs/SubmitDialog";
import ApproveDialog from "./dialogs/ApproveDialog";
import FeedBackDialog from "./dialogs/FeedBackDialog";
import ViewFeedBackDialog from "./dialogs/ViewFeedBackDialog";

const InternalAuditReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company, year } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const { allInternalAuditReports, loading, internalAuditReportAddSuccess } =
    useSelector((state) => state?.consolidationReports);
  const [currentReportItem, setCurrentReportItem] = React.useState({});
  const [showSubmitReportDialog, setShowSubmitReportDialog] =
    React.useState(false);
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);
  const [showFeedBackDialog, setFeedBackDialog] = React.useState(false);
  const [viewFeedBackDialog, setViewFeedBackDialog] = React.useState(false);
  const [
    showDeleteInternalAuditReportDialog,
    setShowDeleteInternalAuditReportDialog,
  ] = React.useState(false);
  const [deleteInternalAuditReportId, setDeleteInternalAuditReportId] =
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

  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllInternalAuditReports(
            `?companyId=${companyId}&Year=${Number(year)}`
          )
        );
      }
      dispatch(resetInternalAuditReportAddSuccess());
    }
  }, [internalAuditReportAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllInternalAuditReports(
          `?companyId=${companyId}&Year=${Number(year)}`
        )
      );
    }
  }, [user, company, year]);

  return (
    <div>
      {showDeleteInternalAuditReportDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteInternalAuditConsolidationReportDialog
              setShowDeleteInternalAuditReportDialog={
                setShowDeleteInternalAuditReportDialog
              }
              deleteInternalAuditReportId={deleteInternalAuditReportId}
            />
          </div>
        </div>
      )}
      {showSubmitReportDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <SubmitDialog
              currentReportItem={currentReportItem}
              setShowSubmitReportDialog={setShowSubmitReportDialog}
            />
          </div>
        </div>
      )}
      {showApproveDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ApproveDialog
              currentReportItem={currentReportItem}
              setShowApproveDialog={setShowApproveDialog}
            />
          </div>
        </div>
      )}
      {showFeedBackDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <FeedBackDialog
              Id={currentReportItem?.id}
              setFeedBackDialog={setFeedBackDialog}
            />
          </div>
        </div>
      )}
      {viewFeedBackDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewFeedBackDialog
              currentReportItem={currentReportItem}
              setViewFeedBackDialog={setViewFeedBackDialog}
            />
          </div>
        </div>
      )}
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Internal Audit Consolidation Report</div>
        <div className="">
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() =>
              navigate("/audit/generate-internal-audit-consolidation-report")
            }
          >
            <span className="btn-label me-2">
              <i className="fa fa-eye"></i>
            </span>
            Generate Report
          </div>
          <i
            className="fa fa-info-circle ps-3 text-secondary cursor-pointer"
            title="Info"
          ></i>
        </div>
      </header>

      <div className="row">
        <div className="col-lg-12">
          <div>
            <table className="table table-bordered  table-hover rounded table-responsive">
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
                      Internal Audit Consolidation Report Not Found
                    </td>
                  </tr>
                ) : (
                  allInternalAuditReports
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.jobName || ""}</td>
                          <td>{item?.reportName || ""}</td>
                          <td>
                            {moment(item?.reportDate).format("DD-MM-YYYY")}
                          </td>
                          <td>{item?.preparedBy || ""}</td>
                          <td>{item?.status}</td>
                          <td>
                            <div className="row gap-1">
                              <i
                                className="fa-eye fa f-18 cursor-pointer col-lg-3"
                                onClick={() =>
                                  navigate(
                                    `/audit/view-internal-audit-consolidation-report?reportId=${item?.id}`
                                  )
                                }
                              ></i>
                              {item?.approved === false && (
                                <i
                                  className="fa fa-edit  f-18 cursor-pointer col-lg-3"
                                  onClick={() =>
                                    navigate(
                                      `/audit/update-internal-audit-consolidation-report?reportId=${item?.id}`
                                    )
                                  }
                                ></i>
                              )}
                              {item?.approved === false && (
                                <i
                                  className={`fa fa-trash text-danger cursor-pointer f-18 col-lg-3`}
                                  onClick={() => {
                                    setDeleteInternalAuditReportId(item?.id);
                                    setShowDeleteInternalAuditReportDialog(
                                      true
                                    );
                                  }}
                                ></i>
                              )}
                              {item?.reportName &&
                                item?.reportName !== "" &&
                                item?.executiveSummary &&
                                item?.executiveSummary !== "" &&
                                item?.auditPurpose &&
                                item?.auditPurpose !== "" &&
                                item?.intAuditExtraFieldsList &&
                                item?.intAuditExtraFieldsList?.length !== 0 &&
                                item?.submitted === false &&
                                Number(item?.createdBy) ===
                                  Number(user[0]?.userId?.id) && (
                                  <div
                                    className={`btn btn-labeled btn-primary  shadow  mx-2 h-40 col-lg-3 mt-2 `}
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
                                    className={`btn btn-labeled btn-primary  shadow mx-2  h-35 col-lg-4 mt-2 `}
                                    onClick={() => handleApproveReport(item)}
                                  >
                                    Approve
                                  </div>
                                )}
                              {item?.submitted === true && (
                                <div className="col-lg-3 mt-2 ">
                                  <PDFDownloadLink
                                    document={
                                      <MyDocument reportObject={item} />
                                    }
                                    fileName="consolidation.pdf"
                                  >
                                    {({ blob, url, loading, error }) =>
                                      "Download pdf!"
                                    }
                                  </PDFDownloadLink>
                                </div>
                              )}
                              {item?.submitted === true &&
                                item?.approved === false &&
                                user[0]?.userId?.employeeid?.userHierarchy ===
                                  "IAH" && (
                                  <div
                                    className={`btn btn-labeled btn-primary  shadow mx-2  col-lg-4 h-35  mt-2 `}
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
                                  className={`btn btn-labeled btn-primary col-lg-8 h-35  shadow   mx-2  mt-2`}
                                  onClick={() => {
                                    setCurrentReportItem(item);
                                    setViewFeedBackDialog(true);
                                  }}
                                >
                                  View FeedBack
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(allInternalAuditReports?.length / 10)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalAuditReport;
