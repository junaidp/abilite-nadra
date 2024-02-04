import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {
  setupGetAllReports,
  resetReportAddSuccess,
} from "../../../../global-redux/reducers/reports/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import ReportDeleteDailog from "../../../modals/report-delete-dialog/index";
import ReportStatusChangeDialog from "../../../modals/report-status-change-dialog/index";

const PlanningReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const { loading, allReports, reportAddSuccess } = useSelector(
    (state) => state?.reports
  );
  const [selectedReportId, setSelectedReportId] = React.useState("");
  const [showReportDeleteDialog, setShowReportDeleteDialog] =
    React.useState(false);
  const [showReportStatusChangeDialog, setShowReportStatusChangeDialog] =
    React.useState(false);
  const { user } = useSelector((state) => state?.auth);
  const [createdBy, setCreatedBy] = React.useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  function handlePublish(id) {
    setShowReportStatusChangeDialog(true);
    setSelectedReportId(id);
  }

  function handleDelete(id) {
    setShowReportDeleteDialog(true);
    setSelectedReportId(id);
  }

  React.useEffect(() => {
    if (user[0]?.token) {
      dispatch(setupGetAllReports());
    }
  }, [user]);

  React.useEffect(() => {
    if (reportAddSuccess) {
      dispatch(resetReportAddSuccess());
      dispatch(setupGetAllReports());
    }
  }, [reportAddSuccess]);

  return (
    <div>
      {showReportStatusChangeDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ReportStatusChangeDialog
              setShowReportStatusChangeDialog={setShowReportStatusChangeDialog}
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
        <div className="mb-0 heading">Report</div>
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
                value={createdBy}
                onChange={(event) => setCreatedBy(event?.target?.value)}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr. #</th>
                  <th>Report Date</th>
                  <th>Created By</th>
                  <th>Shared With</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td>
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
                      all?.createdBy?.name
                        ?.toLowerCase()
                        .includes(createdBy?.toLowerCase())
                    )
                    ?.slice((page - 1) * 5, page * 5)
                    ?.map((item, index) => {
                      return (
                        <tr className="h-40" key={index}>
                          <td>{item?.id}</td>
                          <td>
                            {moment(item?.createdTime).format("DD-MM-YY")}
                          </td>
                          <td>{item?.createdBy?.name}</td>
                          <td>{item?.reportShareWith?.name}</td>
                          <td>{item?.reportStatus}</td>
                          <td className="pt-3">
                            <i
                              className="fa fa-eye text-primary f-18 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/audit/generate-planning-report?reportId=${item?.id}&editable=false`
                                )
                              }
                            ></i>
                            {item?.reportStatus === "draft" && (
                              <i
                                className="fa fa-edit mx-3 text-secondary f-18 cursor-pointer mx-2"
                                onClick={() =>
                                  navigate(
                                    `/audit/generate-planning-report?reportId=${item?.id}&editable=true`
                                  )
                                }
                              ></i>
                            )}
                            {item?.reportStatus !== "Published" && (
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
          count={Math.ceil(allReports?.length / 5)}
          page={page}
          onChange={handleChange}
        />{" "}
      </div>
    </div>
  );
};

export default PlanningReport;
