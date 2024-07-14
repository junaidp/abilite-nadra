import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { setupGetAllJobScheduling } from "../../../../../global-redux/reducers/planing/job-scheduling/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import moment from "moment/moment";

const ViewJobSchedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allJobScheduling, loading } = useSelector(
    (state) => state?.planningJobScheduling
  );
  const { company, year } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  function calculateHours(item) {
    let totalResources =
      Number(item?.numberOfResourcesRequired?.finance) +
      Number(item?.numberOfResourcesRequired?.business) +
      Number(item?.numberOfResourcesRequired?.fraud) +
      Number(item?.numberOfResourcesRequired?.operations) +
      Number(item?.numberOfResourcesRequired?.other) +
      Number(item?.numberOfResourcesRequired?.it);
    let totalWeeksHours =
      Number(item?.timeAndDateAllocation?.estimatedWeeks) * 40;
    return (
      Number(item?.timeAndDateAllocation?.travellingDays) * 8 +
      totalResources * totalWeeksHours +
      Number(item?.timeAndDateAllocation?.internalAuditManagementHours)
    );
  }
  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllJobScheduling(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
  }, [user, year, company]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-job-scheduling"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
  }, []);

  return (
    <div>
      <div>
        <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
          <div className="mb-0 heading">
            <button
              className="btn btn-indigo me-2"
              onClick={() => navigate("/audit/job-scheduling")}
            >
              Back
            </button>
            Job Scheduling
          </div>
        </header>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered table-hover rounded equal-columns">
                <thead>
                  <tr>
                    <th className="sr-col">Sr. #</th>
                    <th>Auditable Unit</th>
                    <th>Year</th>
                    <th>Planned Start Date</th>
                    <th>Planned End Date</th>
                    <th>Resources Allocated</th>
                    <th>Total Estimated Hours</th>
                    <th>Risk Rating</th>
                    <th>Created by</th>
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
                  ) : allJobScheduling?.length === 0 ? (
                    <tr>
                      <td className="w-300">No data to show</td>
                    </tr>
                  ) : (
                    allJobScheduling
                      ?.slice((page - 1) * 10, page * 10)
                      ?.map((item, index) => {
                        return (
                          <tr className="h-50" key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.auditableUnitTitle}</td>
                            <td>{item?.year}</td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                disabled
                                value={moment(
                                  item?.jobScheduleList[0]?.plannedStartDate
                                ).format("YYYY-MM-DD")}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                disabled
                                value={moment(
                                  item?.jobScheduleList[0]?.plannedJobEndDate
                                ).format("YYYY-MM-DD")}
                              />
                            </td>
                            <td>
                              {item?.resourceAllocation?.resourcesList?.length}
                            </td>
                            <td>{calculateHours(item)}</td>
                            <td
                              className={` text-white ${
                                item?.riskRating?.toUpperCase() ===
                                "Low"?.toUpperCase()
                                  ? "bg-success"
                                  : item?.riskRating?.toUpperCase() ===
                                    "Medium"?.toUpperCase()
                                  ? "bg-yellow"
                                  : item?.riskRating?.toUpperCase() ===
                                    "High"?.toUpperCase()
                                  ? "bg-danger"
                                  : ""
                              }`}
                            >
                              {item?.riskRating}
                            </td>
                            <td>{item?.resourceAllocation?.createdBy?.name}</td>
                            <td>
                              {item?.locked === true
                                ? "Completed"
                                : "In-Progress"}
                            </td>
                            <td>
                              <span className="btn-label me-2">
                                <i
                                  className="fa fa-edit  px-3 f-18 cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/audit/start-scheduling?jobScheduling=${item?.id}`
                                    )
                                  }
                                ></i>
                              </span>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Pagination
          count={Math.ceil(allJobScheduling?.length / 10)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ViewJobSchedule;
