import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import chart11 from "../../../assets/chart11.png";
import chart1 from "../../../assets/chart1.png";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";
import {
  setupGetNavigation,
  setupGetData,
} from "../../../global-redux/reducers/common/slice";
import { CircularProgress } from "@mui/material";

const DashboardHome = () => {
  let dispatch = useDispatch();
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
        dispatch(setupGetNavigation({ companyId: companyId, year: year }));
        dispatch(setupGetData({ companyId: companyId, year: year }));
      }
    }
  }, [user]);
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header my-3  text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Dashboard</div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-9">
                <section id="minimal-statistics">
                  <div className="row">
                    <div className="col-xl-4 col-sm-6 col-12">
                      <div className="card glassmorphism-card">
                        <div className="card-content">
                          <div className="card-body">
                            <div className="media d-flex  justify-content-between">
                              <div className="align-self-center">
                                <i className="fa fa-tasks primary fa-2xl f-40"></i>
                              </div>
                              <div className="media-body">
                                <span>Jobs in Progress</span>
                                <h3>
                                  {dataInfo?.totalJobs} /{" "}
                                  {dataInfo?.jobsCompleted}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-12">
                      <div className="card glassmorphism-card">
                        <div className="card-content">
                          <div className="card-body">
                            <div className="media d-flex justify-content-between">
                              <div className="align-self-center">
                                <i className="fa fa-calculator primary fa-2xl f-40"></i>
                              </div>
                              <div className="media-body">
                                <span>Avg obs. per job</span>
                                <h3>{dataInfo?.averageObservationPerJob}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-12">
                      <div className="card glassmorphism-card">
                        <div className="card-content">
                          <div className="card-body">
                            <div className="media d-flex justify-content-between">
                              <div className="align-self-center">
                                <i className="fa fa-check-circle primary fa-2xl f-40"></i>
                              </div>
                              <div className="media-body">
                                <span>Jobs Completed</span>
                                <h3>{dataInfo?.jobsCompleted}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-12">
                      <div className="card glassmorphism-card">
                        <div className="card-content">
                          <div className="card-body">
                            <div className="media d-flex justify-content-between">
                              <div className="align-self-center">
                                <i class="bi bi-share primary f-40"></i>{" "}
                              </div>
                              <div className="media-body">
                                <span>Jobs by Business Objective</span>
                                <h3>{dataInfo?.jobsByBusinessObjective}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-4 col-sm-6 col-12">
                      <div className="card glassmorphism-card">
                        <div className="card-content">
                          <div className="card-body">
                            <div className="media d-flex justify-content-between">
                              <div className="align-self-center">
                                <i class="bi bi-shield-shaded primary f-40"></i>{" "}
                              </div>
                              <div className="media-body">
                                <span>Jobs by Compliance</span>
                                <h3>{dataInfo?.jobsByCompliance}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-4 col-sm-6 col-12">
                      <div className="card glassmorphism-card">
                        <div className="card-content">
                          <div className="card-body">
                            <div className="media d-flex justify-content-between">
                              <div className="align-self-center">
                                <i className="fa fa-exclamation-triangle primary fa-2xl f-40"></i>
                              </div>
                              <div className="media-body">
                                <span>Exceptions Implemented</span>
                                <h3>{dataInfo?.exceptionsImplemented}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card job-card p-0">
                        <div className="card-header application-main-color color-white">
                          Jobs in Execution
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsInExecution?.length === 0 ? (
                            <p>No jobs In execution yet</p>
                          ) : (
                            navigationInfo?.jobsInExecution?.map(
                              (job, index) => {
                                return (
                                  <h5 className="card-title" key={index}>
                                    {job?.name}
                                  </h5>
                                );
                              }
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 ">
                      <div className="card job-card p-0">
                        <div className="card-header application-main-color color-white">
                          Jobs Due for Kick Off within a week
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsDueForKickOffWithinAWeek
                            ?.length === 0 ? (
                            <p> No jobs due for kick Off within a week</p>
                          ) : (
                            navigationInfo?.jobsDueForKickOffWithinAWeek?.map(
                              (job, index) => {
                                return (
                                  <h5 className="card-title" key={index}>
                                    {job?.name}
                                  </h5>
                                );
                              }
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card job-card p-0">
                        <div className="card-header application-main-color color-white">
                          Management comments overdue
                        </div>
                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.managementCommentsOverdue?.length ===
                          0 ? (
                            <p> No jobs overdue yet</p>
                          ) : (
                            navigationInfo?.managementCommentsOverdue?.map(
                              (job, index) => {
                                return (
                                  <h5 className="card-title" key={index}>
                                    {job?.name}
                                  </h5>
                                );
                              }
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="card job-card p-0">
                        <div className="card-header application-main-color color-white">
                          Jobs Due for completion within a week
                        </div>

                        <div className="card-body d-flex flex-column">
                          {navigationInfo?.jobsDueForCompletionWithinAWeek
                            ?.length === 0 ? (
                            <p> No jobs due for completion within a week</p>
                          ) : (
                            navigationInfo?.jobsDueForCompletionWithinAWeek?.map(
                              (job, index) => {
                                return (
                                  <h5 className="card-title" key={index}>
                                    {job?.name}
                                  </h5>
                                );
                              }
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-lg-3">
                <div className="row">
                  <div className="col-xl-12 col-sm-6 col-12">
                    <div className="card mb-4 application-main-color  glassmorphism-card-">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex  justify-content-between">
                            <div className="align-self-center">
                              <i className="fa fa-hourglass-end text-white primary fa-2xl f-40"></i>
                            </div>
                            <div className="media-body">
                              <span className="text-white">
                                Exceptions Overdue
                              </span>
                              <h3 className="text-white">
                                {dataInfo?.exceptionsOverDue}%
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card  glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <p className="text-center">
                            Observation by Risk Rating
                          </p>
                          <img
                            src={chart11}
                            className="w-100"
                            rel="copyright"
                          />
                          <div className="text-end">
                            <div className="label high">High</div>
                            <div className="label medium">Medium</div>
                            <div className="label low">Low</div>
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
                          <img
                            src={chart1}
                            className="mx-auto my-3 w-150 h-150"
                            rel="copyright"
                          />
                          <div className="text-end">
                            <div className="label highh">
                              Not Yet due for implementation
                            </div>
                            <div className="label mediumm">
                              Due for implementation
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
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
