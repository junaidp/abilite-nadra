import React from "react";
import { useNavigate } from "react-router-dom";
import {
  resetReportingAddSuccess,
  setupGetAllReporting,
  setupUpdateFollowUp,
} from "../../../../../global-redux/reducers/reporting/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./index.css";

const ReportingParticulars = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const { allReports, loading, reportingAddSuccess } = useSelector(
    (state) => state?.reporting
  );
  const [reports, setReports] = React.useState([]);

  function handleChange(event, id) {
    setReports((pre) =>
      pre.map((item) =>
        Number(item?.id) === Number(id)
          ? {
              ...item,
              followUp: {
                ...item?.followUp,
                [event?.target?.name]: event?.target?.value,
              },
            }
          : item
      )
    );
  }

  function handleSave(item) {
    if (!loading) {
      dispatch(
        setupUpdateFollowUp({
          ...item?.followUp,
          recommendationsImplemented:
            item?.followUp?.recommendationsImplemented === "true"
              ? true
              : false,

          testInNextYear:
            item?.followUp?.testInNextYear === "true" ? true : false,
        })
      );
    }
  }

  React.useEffect(() => {
    if (reportingAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllReporting(
            `?companyId=${companyId}&currentYear=2024&userId=${user[0]?.userId?.id}`
          )
        );
      }
      dispatch(resetReportingAddSuccess());
    }
  }, [reportingAddSuccess]);

  React.useEffect(() => {
    if (allReports?.length !== 0) {
      setReports(
        allReports[0]?.reportingList?.filter((item) => item?.followUp !== null)
      );
    }
  }, [allReports]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllReporting(
          `?companyId=${companyId}&currentYear=2024&userId=${user[0]?.userId?.id}`
        )
      );
    }
  }, [user]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-followup"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));
  }, []);

  return (
    <div>
      <header className="section-header my-3 align-items-center  text-start d-flex ">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/follow-up")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        <div className="mb-0 heading">Follow-Up</div>
      </header>
      <div className="row px-4">
        <div className="col-md-12">
          <div className="sub-heading ps-2 mb-3 fw-bold">
            {allReports[0]?.title}
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="accordion" id="accordionFlushExample">
                {reports?.map((item, index) => {
                  return (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id="headingeightt">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse${index}`}
                        >
                          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                            <div className=" d-flex align-items-center">
                              {item?.observationTitle}
                            </div>
                          </div>
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="row mb-3">
                            <div className="col-lg-12">
                              <label>Observation Title:</label>
                              <input
                                className="form-control w-100"
                                placeholder="Enter Observation Title here"
                                type="text"
                                value={item?.observationTitle}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label>Observation:</label>
                            <textarea
                              className="form-control "
                              placeholder="Enter Reason"
                              id="exampleFor"
                              rows="3"
                              value={item?.observationName}
                              disabled
                            ></textarea>
                          </div>

                          <div className="mb-3 align-items-center">
                            <label className="pe-4">Implication Rating:</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={item?.implicationRating}
                              disabled
                            >
                              <option value="">Select One</option>
                              <option value={1}>High</option>
                              <option value={2}>Medium</option>
                              <option value={3}>Low</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label>Implication:</label>
                            <textarea
                              className="form-control "
                              placeholder="Enter Reason"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              value={item?.implication}
                              disabled
                            ></textarea>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-12">
                              <label>Auditee:</label>
                              <input
                                className="form-control w-100"
                                placeholder="Enter Observation Title here"
                                type="text"
                                value={item?.auditee?.name}
                                disabled
                              />
                            </div>
                          </div>

                          {/*  */}
                          <div className="mb-3">
                            <label>Management Comments:</label>
                            <textarea
                              className="form-control "
                              placeholder="Enter Reason"
                              id="exampleFor"
                              rows="3"
                              value={item?.followUp?.managementComments || ""}
                              name="managementComments"
                              onChange={(event) =>
                                handleChange(event, item?.id)
                              }
                            ></textarea>
                            <label className="word-limit-info label-text">
                              Maximum 1500 words
                            </label>
                          </div>
                          <div className="mb-3">
                            <label className="py-1">Implementation Date:</label>
                            <input
                              type="date"
                              className="form-control"
                              id="exampleFormControlInput1"
                              value={moment(
                                item?.followUp?.implementationDate
                              ).format("YYYY-MM-DD")}
                              name="implementationDate"
                              onChange={(event) =>
                                handleChange(event, item?.id)
                              }
                            />
                          </div>
                          <div className="mb-3 align-items-center">
                            <label className="pe-4">
                              Recommendations Implemented:
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={item?.followUp?.recommendationsImplemented.toString()}
                              name="recommendationsImplemented"
                              onChange={(event) =>
                                handleChange(event, item?.id)
                              }
                            >
                              <option value="">Select One</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </div>
                          {item?.followUp?.recommendationsImplemented.toString() ===
                            "true" && (
                            <div className="mb-3">
                              <label>Final Comments:</label>
                              <textarea
                                className="form-control "
                                placeholder="Enter Reason"
                                id="exampleFor"
                                rows="3"
                                value={item?.followUp?.finalComments || ""}
                                name="finalComments"
                                onChange={(event) =>
                                  handleChange(event, item?.id)
                                }
                              ></textarea>
                              <label className="word-limit-info label-text">
                                Maximum 1500 words
                              </label>
                            </div>
                          )}

                          <div className="mb-3 align-items-center">
                            <label className="pe-4">Test In Next Year:</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={item?.followUp?.testInNextYear.toString()}
                              name="testInNextYear"
                              onChange={(event) =>
                                handleChange(event, item?.id)
                              }
                            >
                              <option value="">Select One</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </div>

                          <div className="row">
                            <div className="col-lg-12 text-end ">
                              <div className="d-flex align-items-center place-end">
                                <button
                                  className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                                    loading && "disabled"
                                  }`}
                                  onClick={() => handleSave(item)}
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-check"></i>
                                  </span>
                                  {loading ? "Loading..." : "Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingParticulars;
