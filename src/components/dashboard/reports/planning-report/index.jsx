import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {
  setupGetAllReports,
  resetReportAddSuccess,
  setupGetIAHReports,
  setupUpdateSingleReport,
} from "../../../../global-redux/reducers/reports/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import ReportDeleteDailog from "../../../modals/report-delete-dialog/index";
import ReportStatusChangeDialog from "../../../modals/report-status-change-dialog/index";
import { setupGetAllUsers } from "../../../../global-redux/reducers/settings/user-management/slice";

const PlanningReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, allReports, reportAddSuccess } = useSelector(
    (state) => state?.reports
  );
  const { allUsers } = useSelector((state) => state?.setttingsUserManagement);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [page, setPage] = React.useState(1);
  const [selectedReportId, setSelectedReportId] = React.useState("");
  const [showReportDeleteDialog, setShowReportDeleteDialog] =
    React.useState(false);
  const [showReportStatusChangeDialog, setShowReportStatusChangeDialog] =
    React.useState(false);
  const [reportNameValue, setReportNameValue] = React.useState("");

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

  function handleReportShare(event, reportId) {
    if (event?.target?.value !== "") {
      const singleReport = allReports?.find(
        (all) => Number(all?.id) === Number(reportId)
      );
      dispatch(
        setupUpdateSingleReport({
          ...singleReport,
          newHeading: singleReport?.newHeading?.map((item) => {
            return {
              heading: item?.heading,
              description: item?.description,
            };
          }),
          storedHtml: "<p>Dummy String By Now</p>",
          reportStatus: singleReport?.reportStatus,
          reportShareWith: Number(event?.target?.value),
          reportingTo: singleReport?.reportingTo?.id || null,
          createdBy: singleReport?.createdBy?.id,
          updatedBy: user[0]?.userId?.id,
          id: Number(reportId),
        })
      );
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      if (user[0]?.userId?.employeeid?.userHierarchy === "IAH") {
        const companyId = user[0]?.company?.find(
          (item) => item?.companyName === company
        )?.id;
        if (companyId) {
          dispatch(setupGetIAHReports(companyId));
        }
      }
      if (user[0]?.userId?.employeeid?.userHierarchy !== "IAH") {
        dispatch(setupGetAllReports());
      }
      dispatch(resetReportAddSuccess());
    }
  }, [reportAddSuccess]);

  React.useEffect(() => {
    if (user[0]?.token) {
      if (user[0]?.userId?.employeeid?.userHierarchy === "IAH") {
        const companyId = user[0]?.company?.find(
          (item) => item?.companyName === company
        )?.id;
        if (companyId) {
          dispatch(setupGetIAHReports(companyId));
          dispatch(setupGetAllUsers({ shareWith: true }));
        }
      }
      if (user[0]?.userId?.employeeid?.userHierarchy !== "IAH") {
        dispatch(setupGetAllReports());
        dispatch(setupGetAllUsers({ shareWith: true }));
      }
    }
  }, [user, company]);

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
                      all?.reportName
                        ?.toLowerCase()
                        .includes(reportNameValue?.toLowerCase())
                    )
                    ?.slice((page - 1) * 5, page * 5)
                    ?.map((item, index) => {
                      return (
                        <tr className="h-40" key={index}>
                          <td>{item?.id}</td>
                          <td>{item?.reportName}</td>
                          <td>
                            {moment(item?.createdTime).format("DD-MM-YY")}
                          </td>
                          <td>{item?.createdBy?.name}</td>
                          <td>{item?.reportShareWith?.name || "null"}</td>
                          <td>{item?.reportStatus}</td>
                          {user[0]?.userId?.employeeid?.userHierarchy ===
                            "IAH" && (
                            <td>
                              <select
                                className="form-select  px-1"
                                aria-label="Default select example"
                                name="priority"
                                value={item?.reportShareWith?.id || ""}
                                onChange={(event) =>
                                  handleReportShare(event, item?.id)
                                }
                              >
                                <option value="">Select One</option>
                                {allUsers
                                  ?.filter(
                                    (all) => all?.id !== user[0]?.userId?.id
                                  )
                                  ?.map((user, i) => {
                                    return (
                                      <option key={i} value={user?.id}>
                                        {user?.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </td>
                          )}
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
          count={Math.ceil(allReports?.length / 5)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PlanningReport;
