import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {
  setupGetAllReports,
  resetReportAddSuccess,
} from "../../../../global-redux/reducers/reports/planing-report/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import ReportDeleteDailog from "./components/report-delete-dialog";
import ReportPublishDialog from "./components/report-publish-dialog";

const PlanningReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, allReports, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [page, setPage] = React.useState(1);
  const [selectedReportId, setSelectedReportId] = React.useState("");
  const [showReportDeleteDialog, setShowReportDeleteDialog] =
    React.useState(false);
  const [showReportPublishDialog, setShowReportPublishDialog] =
    React.useState(false);
  const [reportNameValue, setReportNameValue] = React.useState("");

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handlePublish(id) {
    setSelectedReportId(id);
    setShowReportPublishDialog(true);
  }

  function handleDelete(id) {
    setSelectedReportId(id);
    setShowReportDeleteDialog(true);
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(setupGetAllReports(companyId));
      }
      dispatch(resetReportAddSuccess());
    }
  }, [reportAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllReports(companyId));
    }
  }, [dispatch]);

  return (
    <div>
      {showReportPublishDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ReportPublishDialog
              setShowReportPublishDialog={setShowReportPublishDialog}
              selectedReportId={selectedReportId}
            />
          </div>
        </div>
      )}
      {showReportDeleteDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ReportDeleteDailog
              setShowReportDeleteDialog={setShowReportDeleteDialog}
              selectedReportId={selectedReportId}
            />
          </div>
        </div>
      )}
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Planning Report</div>
        <button
          className="btn btn-outline-light text-black"
          onClick={() =>
            navigate(`/audit/generate-planning-report?&editable=notApplicable`)
          }
        >
          Generate Report
        </button>
      </header>

      <div className="row">
        <div className="col-lg-12">
          <div className="example-header">
            <div className="mb-2 w-100">
              <input
                placeholder="Filter With Created By"
                id="inputField"
                className="border-bottom-black"
                value={reportNameValue}
                onChange={(event) => setReportNameValue(event?.target?.value)}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr. #</th>
                  <th className="w-80">Id</th>
                  <th>Report Name</th>
                  <th>Report Date</th>
                  <th>Created By</th>
                  <th>Shared With</th>
                  <th>Status</th>
                  {user[0]?.userId?.employeeid?.userHierarchy === "IAH" && (
                    <th>Report Share With</th>
                  )}
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
                ) : allReports?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Reports To Show!</td>
                  </tr>
                ) : (
                  allReports
                    ?.filter((all) =>
                      all?.reportName
                        ?.toLowerCase()
                        .includes(reportNameValue?.toLowerCase())
                    )
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((item, index) => {
                      return (
                        <tr className="h-40" key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.id}</td>
                          <td>{item?.reportName}</td>
                          <td>
                            {moment(item?.createdTime).format("DD-MM-YY")}
                          </td>
                          <td>{item?.createdBy?.name}</td>
                          <td>{item?.reportShareWith?.name || "null"}</td>
                          <td>{item?.reportStatus}</td>
                          <td>
                            <i
                              className="fa fa-eye text-primary f-18 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/audit/generate-planning-report?reportId=${item?.id}&editable=false`
                                )
                              }
                            ></i>
                            {(item?.reportStatus === "draft" ||
                              user[0]?.userId?.employeeid?.userHierarchy ===
                                "IAH") && (
                              <i
                                className="fa fa-edit mx-3 text-secondary f-18 cursor-pointer mx-2"
                                onClick={() =>
                                  navigate(
                                    `/audit/generate-planning-report?reportId=${item?.id}&editable=true`
                                  )
                                }
                              ></i>
                            )}
                            {item?.reportStatus === "draft" &&
                              item?.createdBy?.id === user[0]?.userId?.id && (
                                <i
                                  className="fa fa-trash text-danger f-18 cursor-pointer mx-2"
                                  onClick={() => handleDelete(item?.id)}
                                ></i>
                              )}
                            {item?.reportStatus === "draft" &&
                              user[0]?.userId?.employeeid?.userHierarchy ===
                                "IAH" && (
                                <div
                                  className={`btn btn-labeled btn-primary px-3 shadow me-3 mx-4 fitContent ${
                                    loading && "disabled"
                                  }`}
                                  onClick={() => handlePublish(item?.id)}
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-check-circle f-18"></i>
                                  </span>
                                  {loading ? "Loading..." : "Publish"}
                                </div>
                              )}
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          count={Math.ceil(allReports?.length / 10)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PlanningReport;
