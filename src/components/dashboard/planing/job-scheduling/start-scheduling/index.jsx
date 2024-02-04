import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MultiSelect from "./components/select/MultiSelect";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { setupGetAllLocations } from "../../../../../global-redux/reducers/settings/location/slice";
import Select from "./components/Select";
import {
  setupGetAllJobScheduling,
  setupUpdateJobScheduling,
  resetJobSchedulingSuccess,
} from "../../../../../global-redux/reducers/planing/job-scheduling/slice";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const StartScheduling = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const jobSchedulingId = searchParams.get("Id");
  const { allJobScheduling, loading, jobSchedulingAddSuccess } = useSelector(
    (state) => state?.planingJobScheduling
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [currentJobSchedulingObject, setCurrentJobScheduling] = React.useState(
    {}
  );
  const [allSubLocations, setAllSubLocations] = React.useState([]);

  function handleChangeNumberTextField(event) {
    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        [event?.target?.name]: Number(event?.target?.value),
      };
    });
  }

  function handleFrequencyChange(event) {
    if (event.target?.value) {
      dispatch(
        setupUpdateJobScheduling({
          ...currentJobSchedulingObject,
          frequency: event?.target?.value,
        })
      );
    }
  }
  function handleChangeJobSchedulingStringTextFields(event) {
    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }
  function handleChangeJobSchedulingCheckFields(event) {
    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.checked,
      };
    });
  }

  function handleSave() {
    if (!loading) {
      dispatch(setupUpdateJobScheduling(currentJobSchedulingObject));
    }
  }

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllJobScheduling(
          `?companyId=${companyId}&currentYear=${Number("2024")}`
        )
      );
    }
  }, [user]);

  React.useEffect(() => {
    if (jobSchedulingAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllJobScheduling(
            `?companyId=${companyId}&currentYear=${Number("2024")}`
          )
        );
      }
      dispatch(resetJobSchedulingSuccess());
    }
  }, [jobSchedulingAddSuccess]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-job-scheduling"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
  }, []);

  React.useEffect(() => {
    if (jobSchedulingId && allJobScheduling?.length !== 0) {
      const object = allJobScheduling?.find(
        (item) => item?.id === Number(jobSchedulingId)
      );
      setCurrentJobScheduling(object);
    }
  }, [jobSchedulingId, allJobScheduling]);

  // Location and Sub Location
  React.useEffect(() => {
    if (user[0]?.token) {
      dispatch(setupGetAllLocations());
    }
  }, [user]);

  // React.useEffect(() => {
  //   if (object?.location_Id) {
  //     const item = allLocations?.find(
  //       (all) => all?.id === Number(object?.location_Id)
  //     );
  //     setAllSubLocations(item?.subLocations);
  //   }
  // }, [object?.location_Id]);

  return (
    <div>
      <form>
        <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
          <div className="mb-0 heading">
            <i
              onClick={() => navigate("/audit/job-scheduling")}
              className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
            ></i>
            <span className="me-3">
              {currentJobSchedulingObject?.jobPrioritization?.unit?.reason}
            </span>
          </div>
        </header>

        <div className="row mb-3">
          <div className="col-lg-6">
            <MultiSelect
              names={["Location 1", "Location 2", "Location 3"]}
              title="Location"
              initialPersonalArray={currentJobSchedulingObject?.locationList}
              name="locationList"
              setCurrentJobScheduling={setCurrentJobScheduling}
            />
          </div>
          <div className="col-lg-6">
            <MultiSelect
              title="SubLocation"
              names={["SubLocation 1", "SubLocation 2", "SubLocation 3"]}
              initialPersonalArray={currentJobSchedulingObject?.subLocation}
              name="subLocation"
              setCurrentJobScheduling={setCurrentJobScheduling}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="accordion" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Determination of Number of Resources Required
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="container">
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>IT</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labeltext"
                            placeholder=""
                            value={currentJobSchedulingObject?.it}
                            name="it"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label>Finance</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labeltex"
                            placeholder=""
                            value={currentJobSchedulingObject?.finance}
                            name="finance"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>Business</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labelt"
                            placeholder=""
                            value={currentJobSchedulingObject?.business}
                            name="business"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label>Fraud</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labelte"
                            placeholder=""
                            value={currentJobSchedulingObject?.fraud}
                            name="fraud"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>Operations</label>
                          <input
                            type="number"
                            className="form-control"
                            id="label"
                            placeholder=""
                            value={currentJobSchedulingObject?.operations}
                            name="operations"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label>Other</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labe"
                            placeholder=""
                            value={currentJobSchedulingObject?.other}
                            name="other"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Time and Date Allocation
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="container">
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>Estimated Weeks</label>
                          <input
                            type="number"
                            className="form-control"
                            id="lav"
                            placeholder=""
                            value={currentJobSchedulingObject?.estimatedWeeks}
                            name="estimatedWeeks"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label>Field work Man Hours</label>
                          <input
                            type="number"
                            className="form-control"
                            id="lab"
                            placeholder=""
                            value={
                              currentJobSchedulingObject?.fieldWorkManHours
                            }
                            name="fieldWorkManHours"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>Internal Audit Management Hours</label>
                          <input
                            type="number"
                            className="form-control"
                            id="la"
                            placeholder=""
                            value={
                              currentJobSchedulingObject?.internalAuditManagementHours
                            }
                            name="internalAuditManagementHours"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label>Total Working Man Hours</label>
                          <input
                            type="number"
                            className="form-control"
                            id="l"
                            placeholder=""
                            value={
                              currentJobSchedulingObject?.totalWorkingManHours
                            }
                            name="totalWorkingManHours"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label className="me-3">Place of work</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={
                              currentJobSchedulingObject?.placeOfWork || ""
                            }
                            name="placeOfWork"
                            onChange={handleChangeJobSchedulingStringTextFields}
                          >
                            <option>Select One</option>
                            <option value="In-house">In-house</option>
                            <option value="Outstation">Outstation</option>
                            <option value="In-house & outstation">
                              In-house & outstation
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-lg-12">
                          <label>Travelling days</label>
                          <input
                            type="number"
                            className="form-control"
                            id="sa"
                            placeholder=""
                            value={currentJobSchedulingObject?.travellingDays}
                            name="travellingDays"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-lg-12">
                          <p className="p-2 px-3 rounded  bg-body-secondary">
                            <span className="fw-bold label-text">
                              TOTAL HOURS INCLUSIVE OF TRAVELLING:
                            </span>
                            <span className="float-end">
                              {currentJobSchedulingObject?.totalHours}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* <div className="row mb-3">
                        <div className="col-lg-12">
                          <label>Proposed Job Approver</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labeltext"
                            placeholder=""
                            value={
                              currentJobSchedulingObject?.proposedJobApprover
                            }
                            name="proposedJobApprover"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div> */}

                      <div className="row mb-3">
                        <div className="col-lg-6 align-self-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              name="repeatJob"
                              checked={currentJobSchedulingObject?.repeatJob}
                              onChange={handleChangeJobSchedulingCheckFields}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Repeat job
                            </label>
                          </div>
                        </div>
                        {currentJobSchedulingObject?.repeatJob === true && (
                          <div className="col-lg-6">
                            <label className="me-3">Frequency</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={
                                currentJobSchedulingObject?.frequency || ""
                              }
                              name="frequency"
                              onChange={handleFrequencyChange}
                            >
                              <option>Select</option>
                              <option value="Once">Once</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Quarterly">Quarterly</option>
                              <option value="Semi-Annually">
                                Semi-Annually
                              </option>
                              <option value="Every Second Year">
                                Every Second Year
                              </option>
                              <option value="Every Third Year">
                                Every Third Year
                              </option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    Job Schedule List
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    {currentJobSchedulingObject?.jobScheduleList?.length ===
                    0 ? (
                      <p>No job schedule list to show!</p>
                    ) : (
                      <div>
                        {currentJobSchedulingObject?.jobScheduleList?.map(
                          (list, ind) => {
                            return (
                              <div className="row mb-4" key={ind}>
                                <div className="col-lg-6">
                                  <label className="form-label me-2">
                                    Start Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Select Date"
                                    value={moment(
                                      list?.plannedJobStartDate
                                    ).format("YYYY-MM-DD")}
                                    readOnly
                                  />
                                </div>
                                <div className="col-lg-6">
                                  <label className="form-label me-2">
                                    End Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Select Date"
                                    value={moment(
                                      list?.plannedJobEndDate
                                    ).format("YYYY-MM-DD")}
                                    readOnly
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Resource Allocation
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="container overflow-x-auto">
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>Head Of Internal Audit</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labeltext"
                            placeholder=""
                            value={
                              currentJobSchedulingObject?.headOfInternalAudit
                            }
                            name="headOfInternalAudit"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label>Backup Head Of InternalAudit</label>
                          <input
                            type="number"
                            className="form-control"
                            id="labeltext"
                            placeholder=""
                            value={
                              currentJobSchedulingObject?.backupHeadOfInternalAudit
                            }
                            name="backupHeadOfInternalAudit"
                            onChange={handleChangeNumberTextField}
                          />
                        </div>
                      </div>

                      <div className="select-grid">
                        <div className="single-select-grid single-select-grid-part-1">
                          <p>Year</p>
                          <p>2023</p>
                          <p>2024</p>
                          <p>2025</p>
                          <p>2026</p>
                          <p>2027</p>
                        </div>
                        <div className="resource-allocation-select-wrap">
                          <div className="single-select-grid single-select-grid-part-2">
                            <p>Proposed Resources </p>
                            <Select />
                            <Select />
                            <Select />
                            <Select />
                            <Select />
                          </div>
                          <div className="single-select-grid single-select-grid-part-3">
                            <p>Proposed Job Approver</p>
                            <Select />
                            <Select />
                            <Select />
                            <Select />
                            <Select />
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

        <div className="row mt-3">
          <div className="col-lg-12 justify-content-end text-end">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow ${
                loading && "disabled"
              }`}
              onClick={handleSave}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle"></i>
              </span>
              {loading ? "Loading..." : "Save"}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StartScheduling;
