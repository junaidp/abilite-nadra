import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";
import {
  setupGetNavigation,
  setupGetData,
} from "../../../global-redux/reducers/common/slice";
import { CircularProgress } from "@mui/material";
import InfoCard from "./components/cards/InfoCard";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "./components/pie-chart/PieChart";
import AreaChartComponent from "./components/area-chart/AreaChart";
import KickOffModal from "./components/modals/kickOffModal";
import { encryptAndEncode } from "../../../config/helper";

const DashboardHome = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [showKickOffDialog, setShowKickOffDialog] = React.useState(false);
  const [kickOffId, setKickOffId] = React.useState("");
  const { year, company, loading, navigationInfo, dataInfo } = useSelector(
    (state) => state?.common
  );
  const { user } = useSelector((state) => state?.auth);

  React.useEffect(() => {
    if (user[0]?.token) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(resetAuthValues());
        dispatch(
          setupGetData({
            companyId: companyId,
            year: year,
            userId: user[0]?.id,
          })
        );
        setTimeout(() => {
          dispatch(
            setupGetNavigation({
              companyId: companyId,
              year: year,
              userId: user[0]?.id,
            })
          );
        }, 1200);
      }
    }
  }, [dispatch]);

  return (
    <div className="overflow-y-hidden">
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
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header my-3  text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Dashboard</div>
            </div>

            <div className="row mb-3 dashboard-content-wrap">
              <div className="col-lg-9">
                <section id="minimal-statistics">
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
                      {/* <div className="col-xl-4 col-sm-6 col-12 flex-1">
                        <InfoCard
                          name="Jobs By Special Project/Audit"
                          icon={
                            <i className="fa fa-calculator primary fa-2xl f-40"></i>
                          }
                          value={dataInfo?.jobsBySpecialAudit}
                        />
                      </div> */}

                      <div className="col-xl-4 col-sm-6 col-12 flex-1">
                        <InfoCard
                          name="Jobs In Progress"
                          icon={
                            <i className="fa fa-tasks primary fa-2xl f-40"></i>
                          }
                          value={
                            dataInfo?.jobsInProgress + "/" + dataInfo?.totalJobs
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card job-card p-0 cursor-auto">
                        <div className="card-header application-main-color color-white">
                          Jobs in Execution
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsInExecution?.length === 0 ? (
                            <p>No jobs In execution yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.jobsInExecution?.map(
                                (job, index) => {
                                  return (
                                    <h5
                                      className="card-title cursor-pointer mb-4"
                                      key={index}
                                      onClick={() => {
                                        const encryptedId = encryptAndEncode(
                                          job?.id.toString()
                                        );
                                        navigate(
                                          `/audit/kick-off/${encryptedId}`
                                        );
                                      }}
                                    >
                                      {job?.name}
                                    </h5>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 ">
                      <div className="card job-card p-0 cursor-auto">
                        <div className="card-header application-main-color color-white">
                          Jobs Due for Kick Off
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsDueForKickOffWithinAWeek
                            ?.length === 0 ? (
                            <p>No jobs due for kick Off within a week yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.jobsDueForKickOffWithinAWeek?.map(
                                (job, index) => {
                                  return (
                                    <h5
                                      className="card-title cursor-pointer mb-4"
                                      key={index}
                                      onClick={() => {
                                        setKickOffId(job?.id);
                                        setShowKickOffDialog(true);
                                      }}
                                    >
                                      {job?.name}
                                    </h5>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card cursor-auto job-card p-0">
                        <div className="card-header application-main-color color-white">
                          Management comments overdue
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.managementCommentsOverdue?.length ===
                          0 ? (
                            <p> No jobs overdue yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.managementCommentsOverdue?.map(
                                (job, index) => {
                                  return (
                                    <h5
                                      className="card-title cursor-pointer mb-4"
                                      key={index}
                                      onClick={() => {
                                        const encryptedId = encryptAndEncode(
                                          job?.id.toString()
                                        );
                                        navigate(
                                          `/audit/reporting-particulars/${encryptedId}`
                                        );
                                      }}
                                    >
                                      {job?.name}
                                    </h5>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="card job-card p-0 cursor-auto">
                        <div className="card-header application-main-color color-white">
                          Jobs Due for completion within a week
                        </div>

                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsDueForCompletionWithinAWeek
                            ?.length === 0 ? (
                            <p> No jobs due for completion within a week yet</p>
                          ) : (
                            <div className="limited-text">
                              {navigationInfo?.jobsDueForCompletionWithinAWeek?.map(
                                (job, index) => {
                                  return (
                                    <h5
                                      className="card-title cursor-pointer mb-4"
                                      key={index}
                                      onClick={() => {
                                        const encryptedId = encryptAndEncode(
                                          job?.id.toString()
                                        );
                                        navigate(
                                          `/audit/reporting-particulars/${encryptedId}`
                                        );
                                      }}
                                    >
                                      {job?.name}
                                    </h5>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card  glassmorphism-card text-center">
                    <div className="card-content">
                      <div className="card-body ">
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
              <div className="col-lg-3">
                <div className="row exceptions-wrap">
                  <div className="col-xl-12 col-sm-12 col-12">
                    <div className="card  glassmorphism-card">
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
