import React from "react";
import { useNavigate } from "react-router-dom";
import {
  setupGetAllReports,
  resetReportAddSuccess,
  setupGetAllUsers,
} from "../../../../global-redux/reducers/reports/planing-report/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import ReportDeleteDailog from "./components/report-delete-dialog";
import ReportPublishDialog from "./components/report-publish-dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PlanningReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, allReports, reportAddSuccess, users, totalNoOfRecords } =
    useSelector((state) => state?.planningReport);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
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

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllReports({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
        })
      );
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        setPage(1);
        setItemsPerPage(10);
        dispatch(
          setupGetAllReports({
            companyId,
            page: 1,
            itemsPerPage: 10,
          })
        );
        dispatch(resetReportAddSuccess());
      }
    }
  }, [reportAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllReports({
          companyId,
          page,
          itemsPerPage,
        })
      );
    }
  }, [dispatch, page]);

  React.useEffect(() => {
    if (user[0]?.token) {
      dispatch(setupGetAllUsers());
    }
  }, [dispatch]);

  return (
    <div>
      {showReportPublishDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ReportPublishDialog
              setShowReportPublishDialog={setShowReportPublishDialog}
              selectedReportId={selectedReportId}
            />
          </div>
        </div>
      )}
      {showReportDeleteDialog && (
        <div className="model-parent">
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
          onClick={() => navigate(`/audit/generate-planning-report`)}
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
                ) : allReports?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Reports To Show!</td>
                  </tr>
                ) : (
                  allReports
                    ?.filter((all) =>
                      all?.reportTitle
                        ?.toLowerCase()
                        .includes(reportNameValue?.toLowerCase())
                    )
                    ?.map((item, index) => {
                      return (
                        <tr className="h-40" key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.id}</td>
                          <td>{item?.reportTitle}</td>
                          <td>
                            {moment.utc(item?.createdTime).format("DD-MM-YY")}
                          </td>
                          <td>
                            {
                              users?.find(
                                (user) => user?.id === item?.createdBy
                              )?.name
                            }
                          </td>
                          <td>{item?.reportStatus}</td>
                          <td>
                            <div className="d-flex flex-wrap gap-4">
                              <i
                                className="fa fa-eye text-primary f-18 cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `/audit/view-planning-report?reportId=${item?.id}`
                                  )
                                }
                              ></i>
                              {item?.reportStatus === "Draft" && (
                                <i
                                  className="fa fa-edit text-secondary f-18 cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/audit/update-planning-report?reportId=${item?.id}`
                                    )
                                  }
                                ></i>
                              )}
                              {item?.reportStatus === "Draft" &&
                                item?.createdBy === user[0]?.userId?.id && (
                                  <i
                                    className="fa fa-trash text-danger f-18 cursor-pointer"
                                    onClick={() => handleDelete(item?.id)}
                                  ></i>
                                )}
                              {item?.reportStatus === "Draft" &&
                                user[0]?.userId?.employeeid?.userHierarchy ===
                                  "IAH" &&
                                item?.summary &&
                                item?.summary !== "" &&
                                item?.methodology &&
                                item?.methodology !== "" &&
                                item?.riskAssessmentSummary &&
                                item?.riskAssessmentSummary !== "" &&
                                item?.organizationStrategy &&
                                item?.organizationStrategy !== "" &&
                                item?.summaryRisk &&
                                item?.summaryRisk !== "" && (
                                  <div
                                    className={`btn btn-labeled btn-primary shadow fitContent`}
                                    onClick={() => handlePublish(item?.id)}
                                  >
                                    Publish
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
          </div>
        </div>
        {allReports?.length > 0 && (
          <div className="row p-0 m-0">
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
  );
};

export default PlanningReport;
