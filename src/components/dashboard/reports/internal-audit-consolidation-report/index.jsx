import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllInternalAuditReports,
  resetInternalAuditReportAddSuccess,
  setupSaveInternalAuditReport,
} from "../../../../global-redux/reducers/reports/consolidation-report/slice";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import DeleteInternalAuditConsolidationReportDialog from "../../../modals/delete-internal-audit-consolidation-report-dialog";
import MyDocument from "./view-internal-audit-report/components/PDFGenerator";
import { PDFDownloadLink } from "@react-pdf/renderer";

const InternalAuditReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company, year } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const { allInternalAuditReports, loading, internalAuditReportAddSuccess } =
    useSelector((state) => state?.consolidationReports);
  const [
    showDeleteInternalAuditReportDialog,
    setShowDeleteInternalAuditReportDialog,
  ] = React.useState(false);
  const [deleteInternalAuditReportId, setDeleteInternalAuditReportId] =
    React.useState("");
  console.log(allInternalAuditReports);

  const handleChange = (_, value) => {
    setPage(value);
  };
  function handleSubmitReport(item) {
    if (!loading) {
      dispatch(setupSaveInternalAuditReport({ ...item, submitted: true }));
    }
  }
  function handleApproveReport(item) {
    if (!loading) {
      dispatch(setupSaveInternalAuditReport({ ...item, approved: true }));
    }
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
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr No.</th>
                  <th className="w-80">Id</th>
                  <th>Job Name</th>
                  <th>Report Name</th>
                  <th>Report Date</th>
                  <th>Prepared By</th>
                  <th>Approved By</th>
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
                          <td>{item?.id}</td>
                          <td>{item?.jobName || ""}</td>
                          <td>{item?.reportName || ""}</td>
                          <td>
                            {moment(item?.reportDate).format("DD-MM-YYYY")}
                          </td>
                          <td>{item?.preparedBy || ""}</td>
                          <td>null</td>
                          <td>{item?.status}</td>
                          <td>
                            <i
                              className="fa-eye fa f-18 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/audit/view-internal-audit-consolidation-report?reportId=${item?.id}`
                                )
                              }
                            ></i>
                            {item?.submitted === false && (
                              <i
                                className="fa fa-edit px-3 f-18 cursor-pointer "
                                onClick={() =>
                                  navigate(
                                    `/audit/update-internal-audit-consolidation-report?reportId=${item?.id}`
                                  )
                                }
                              ></i>
                            )}
                            <i
                              className={`fa fa-trash text-danger cursor-pointer ${
                                item?.submitted === true && "px-3"
                              } f-18`}
                              onClick={() => {
                                setDeleteInternalAuditReportId(item?.id);
                                setShowDeleteInternalAuditReportDialog(true);
                              }}
                            ></i>
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
                                  className={`btn btn-labeled btn-primary px-3 shadow mx-2 `}
                                  onClick={() => handleSubmitReport(item)}
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-check-circle f-18"></i>
                                  </span>
                                  Submit
                                </div>
                              )}
                            {item?.submitted === true &&
                              item?.approved === false &&
                              user[0]?.userId?.employeeid?.userHierarchy ===
                                "IAH" && (
                                <div
                                  className={`btn btn-labeled btn-primary px-3 shadow mx-2 `}
                                  onClick={() => handleApproveReport(item)}
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-check-circle f-18"></i>
                                  </span>
                                  Approve
                                </div>
                              )}
                            {item?.approved === true && (
                              <PDFDownloadLink
                                document={<MyDocument reportObject={item} />}
                                fileName="consolidation.pdf"
                              >
                                {({ blob, url, loading, error }) =>
                                  "Download pdf!"
                                }
                              </PDFDownloadLink>
                            )}
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
