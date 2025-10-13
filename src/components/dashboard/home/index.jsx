import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";

import {
  setupGetNavigation,
  setupGetData,
} from "../../../global-redux/reducers/common/slice";
import InfoCard from "./components/cards/InfoCard";
import PieChartComponent from "./components/pie-chart/PieChart";
import AreaChartComponent from "./components/area-chart/AreaChart";
import KickOffModal from "./components/modals/kickOffModal";
import { encryptAndEncode } from "../../../config/helper";

/**
 * DashboardHome Component
 * Displays summary metrics, job progress, exceptions, and charts.
 * Fetches dashboard data and navigation info for the selected company & year.
 */
const DashboardHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---- Local state ----
  const [showKickOffDialog, setShowKickOffDialog] = React.useState(false);
  const [kickOffId, setKickOffId] = React.useState("");

  // ---- Redux state ----
  const { year, company, loading, navigationInfo, dataInfo } = useSelector(
    (state) => state?.common
  );
  const { user } = useSelector((state) => state?.auth);

  // ---- Fetch dashboard data and navigation info ----
  React.useEffect(() => {
    if (!user[0]?.token) return;

    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;

    if (!companyId) return;

    dispatch(resetAuthValues());

    // Initial data fetch
    dispatch(
      setupGetData({
        companyId,
        year,
        userId: user[0]?.id,
      })
    );

    // Fetch navigation data after small delay for smoother loading
    const navTimeout = setTimeout(() => {
      dispatch(
        setupGetNavigation({
          companyId,
          year,
          userId: user[0]?.id,
        })
      );
    }, 1200);

    return () => clearTimeout(navTimeout);
  }, [dispatch, company, year, user]);

  // ---- Navigate to route with encrypted ID ----
  const navigateWithId = (path, id) => {
    const encryptedId = encryptAndEncode(id.toString());
    navigate(`${path}/${encryptedId}`);
  };

  return (
    <div className="overflow-y-hidden">
      {/* KickOff Modal */}
      {showKickOffDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <KickOffModal
              setShowKickOffDialog={setShowKickOffDialog}
              kickOffId={kickOffId}
            />
          </div>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="row">
          <div className="col-lg-12">
            {/* Header */}
            <div className="section-header my-3 text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Dashboard</div>
            </div>

            {/* Dashboard Content */}
            <div className="row mb-3 dashboard-content-wrap">
              {/* Left Section: Stats + Charts */}
              <div className="col-lg-9">
                <section id="minimal-statistics">
                  {/* Top Info Cards */}
                  <div className="w-100">
                    <div className="dashboard-wrapper">
                      <div className="flex-1">
                        <InfoCard
                          name="Jobs By Business Objective"
                          icon={<i className="bi bi-share primary f-40"></i>}
                          value={dataInfo?.jobsByBusinessObjective}
                        />
                      </div>
                      <div className="flex-1">
                        <InfoCard
                          name="Jobs By Compliance"
                          icon={
                            <i className="bi bi-shield-shaded primary f-40"></i>
                          }
                          value={dataInfo?.jobsByCompliance}
                        />
                      </div>
                    </div>

                    <div className="dashboard-wrapper">
                      <div className="col-xl-4 col-sm-6 col-12 flex-1">
                        <InfoCard
                          name="Jobs Completed"
                          icon={
                            <i className="fa fa-check-circle primary fa-2xl f-40"></i>
                          }
                          value={dataInfo?.jobsCompleted}
                        />
                      </div>

                      <div className="col-xl-4 col-sm-6 col-12 flex-1">
                        <InfoCard
                          name="Exceptions Implemented"
                          icon={
                            <i className="fa fa-exclamation-triangle primary fa-2xl f-40"></i>
                          }
                          value={dataInfo?.exceptionsImplemented}
                        />
                      </div>
                    </div>

                    <div className="special-audit-wrap dashboard-wrapper">
                      <div className="col-xl-4 col-sm-6 col-12 flex-1">
                        <InfoCard
                          name="Jobs In Progress"
                          icon={
                            <i className="fa fa-tasks primary fa-2xl f-40"></i>
                          }
                          value={`${dataInfo?.jobsInProgress}/${dataInfo?.totalJobs}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Jobs Lists */}
                  <div className="row">
                    {/* Jobs in Execution */}
                    <div className="col-lg-6">
                      <div className="card job-card p-0 cursor-auto">
                        <div className="card-header application-main-color color-white">
                          Jobs in Execution
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsInExecution?.length === 0 ? (
                            <p>No jobs in execution yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.jobsInExecution?.map((job, idx) => (
                                <h5
                                  key={idx}
                                  className="card-title cursor-pointer mb-4"
                                  onClick={() => navigateWithId(
                                    "/audit/kick-off",
                                    job?.id
                                  )}
                                >
                                  {job?.name}
                                </h5>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Jobs Due for Kick Off */}
                    <div className="col-lg-6">
                      <div className="card job-card p-0 cursor-auto">
                        <div className="card-header application-main-color color-white">
                          Jobs Due for Kick Off
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsDueForKickOffWithinAWeek?.length ===
                            0 ? (
                            <p>No jobs due for Kick Off within a week yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.jobsDueForKickOffWithinAWeek?.map(
                                (job, idx) => (
                                  <h5
                                    key={idx}
                                    className="card-title cursor-pointer mb-4"
                                    onClick={() => {
                                      setKickOffId(job?.id);
                                      setShowKickOffDialog(true);
                                    }}
                                  >
                                    {job?.name}
                                  </h5>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Management Comments + Jobs Due for Completion */}
                  <div className="row">
                    {/* Management comments overdue */}
                    <div className="col-lg-6">
                      <div className="card job-card p-0 cursor-auto">
                        <div className="card-header application-main-color color-white">
                          Management Comments Overdue
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.managementCommentsOverdue?.length === 0 ? (
                            <p>No jobs overdue yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.managementCommentsOverdue?.map(
                                (job, idx) => (
                                  <h5
                                    key={idx}
                                    className="card-title cursor-pointer mb-4"
                                    onClick={() =>
                                      navigateWithId(
                                        "/audit/reporting-particulars",
                                        job?.id
                                      )
                                    }
                                  >
                                    {job?.name}
                                  </h5>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Jobs due for completion */}
                    <div className="col-lg-6">
                      <div className="card job-card p-0 cursor-auto">
                        <div className="card-header application-main-color color-white">
                          Jobs Due for Completion Within a Week
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsDueForCompletionWithinAWeek?.length ===
                            0 ? (
                            <p>No jobs due for completion within a week yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.jobsDueForCompletionWithinAWeek?.map(
                                (job, idx) => (
                                  <h5
                                    key={idx}
                                    className="card-title cursor-pointer mb-4"
                                    onClick={() =>
                                      navigateWithId(
                                        "/audit/reporting-particulars",
                                        job?.id
                                      )
                                    }
                                  >
                                    {job?.name}
                                  </h5>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Area Chart: Observation by Due Implementation Date */}
                  <div className="card glassmorphism-card text-center">
                    <div className="card-content">
                      <div className="card-body">
                        <p className="text-center">
                          Observation by Due Implementation Date
                        </p>
                        <div>
                          <AreaChartComponent navigationInfo={navigationInfo} />
                        </div>
                        <div className="row">
                          <div className="label mb-2 mediumm">
                            Due for implementation
                          </div>
                          <div className="label highh">
                            Not Yet due for implementation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Section: Risk Rating Pie Chart */}
              <div className="col-lg-3">
                <div className="row exceptions-wrap">
                  <div className="col-xl-12 col-sm-12 col-12">
                    <div className="card glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <p className="text-center">
                            Observation by Risk Rating
                          </p>
                          <PieChartComponent dataInfo={dataInfo} />
                          <div className="flex">
                            <div className="label high">High</div>
                            <div className="label medium">Medium</div>
                            <div className="label low">Low</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
