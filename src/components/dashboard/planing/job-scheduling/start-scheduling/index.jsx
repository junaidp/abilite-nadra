import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MultiSelect from "./components/select/MultiSelect";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { setupGetAllLocations } from "../../../../../global-redux/reducers/settings/location/slice";
import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";
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
  const jobSchedulingId = searchParams.get("jobScheduling");
  const { allJobScheduling, loading, jobSchedulingAddSuccess } = useSelector(
    (state) => state?.planingJobScheduling
  );
  const { company } = useSelector((state) => state?.common);
  const { allUsers } = useSelector((state) => state?.setttingsUserManagement);
  const { user } = useSelector((state) => state?.auth);
  const [initialLocationList, setInitialLocationList] = React.useState([]);
  const [initialSubLocationList, setInitialSubLocationList] = React.useState(
    []
  );
  const [initialUserList, setInitialUserList] = React.useState([]);
  const { allLocations } = useSelector((state) => state?.setttingsLocation);
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
      const filteredLocationArray = allLocations.filter((item) =>
        currentJobSchedulingObject?.locationList.includes(item?.description)
      );
      const filteredSubLocationArray = allSubLocations.filter((item) =>
        currentJobSchedulingObject?.subLocation.includes(item?.description)
      );
      const filteredHeadOfInternalAudit = allUsers.find(
        (item) =>
          item?.name == currentJobSchedulingObject?.headOfInternalAudit?.name
      );
      const filteredBackupHeadOfInternalAudit = allUsers.find(
        (item) =>
          item?.name ==
          currentJobSchedulingObject?.backupHeadOfInternalAudit?.name
      );
      const filteredProposedJobApprover = allUsers.find(
        (item) =>
          item?.name == currentJobSchedulingObject?.proposedJobApprover?.name
      );
      const filteredResourceArray = allUsers.filter((item) =>
        currentJobSchedulingObject?.resourcesList.includes(item?.name)
      );
      let object;
      object = {
        ...currentJobSchedulingObject,
        frequency: event?.target?.value,
        locationList: filteredLocationArray.map((list) => {
          return {
            id: list?.id,
            description: list?.description,
            companyid: list?.companyid,
          };
        }),
        subLocation: filteredSubLocationArray,
        headOfInternalAudit: filteredHeadOfInternalAudit,
        backupHeadOfInternalAudit: filteredBackupHeadOfInternalAudit,
        proposedJobApprover: filteredProposedJobApprover,
        resourcesList: filteredResourceArray,
      };
      const hasNullValue = Object.values(object).includes(null);
      if (hasNullValue) {
        object = {
          ...object,
          complete: false,
        };
      } else {
        object = {
          ...object,
          complete: true,
        };
      }
      dispatch(setupUpdateJobScheduling(object));
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
      const filteredLocationArray = allLocations.filter((item) =>
        currentJobSchedulingObject?.locationList.includes(item?.description)
      );
      const filteredSubLocationArray = allSubLocations.filter((item) =>
        currentJobSchedulingObject?.subLocation.includes(item?.description)
      );
      const filteredResourceArray = allUsers.filter((item) =>
        currentJobSchedulingObject?.resourcesList.includes(item?.name)
      );
      const filteredHeadOfInternalAudit = allUsers.find(
        (item) =>
          item?.name == currentJobSchedulingObject?.headOfInternalAudit?.name
      );
      const filteredProposedJobApprover = allUsers.find(
        (item) =>
          item?.name == currentJobSchedulingObject?.proposedJobApprover?.name
      );
      const filteredBackupHeadOfInternalAudit = allUsers.find(
        (item) =>
          item?.name ==
          currentJobSchedulingObject?.backupHeadOfInternalAudit?.name
      );
      let object;
      object = {
        ...currentJobSchedulingObject,
        locationList: filteredLocationArray.map((list) => {
          return {
            id: list?.id,
            description: list?.description,
            companyid: list?.companyid,
          };
        }),
        subLocation: filteredSubLocationArray,
        headOfInternalAudit: filteredHeadOfInternalAudit,
        backupHeadOfInternalAudit: filteredBackupHeadOfInternalAudit,
        proposedJobApprover: filteredProposedJobApprover,
        resourcesList: filteredResourceArray,
      };
      const hasNullValue = Object.values(object).includes(null);
      if (hasNullValue) {
        object = {
          ...object,
          complete: false,
        };
      } else {
        object = {
          ...object,
          complete: true,
        };
      }
      dispatch(setupUpdateJobScheduling(object));
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
      setInitialLocationList(
        object?.locationList?.map((all) => all?.description)
      );
      setInitialSubLocationList(
        object?.subLocation?.map((all) => all?.description)
      );
      setInitialUserList(object?.resourcesList?.map((all) => all?.name));
    }
  }, [jobSchedulingId, allJobScheduling]);

  React.useEffect(() => {
    if (user[0]?.token) {
      dispatch(setupGetAllLocations());
      dispatch(setupGetAllUsers());
    }
  }, [user]);

  React.useEffect(() => {
    const locationArray = allLocations.filter((item) =>
      currentJobSchedulingObject?.locationList?.includes(item?.description)
    );
    let allSubLocations = locationArray.reduce((acc, item) => {
      return acc.concat(item.subLocations);
    }, []);
    setAllSubLocations(allSubLocations);
  }, [currentJobSchedulingObject?.locationList]);

  React.useEffect(() => {
    if (!jobSchedulingId) {
      navigate("/audit/job-scheduling");
    }
  }, [jobSchedulingId]);

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
          <div className="col-lg-5">
            <MultiSelect
              names={allLocations?.map((all) => all?.description)}
              title="Location"
              initialPersonalArray={initialLocationList}
              name="locationList"
              setCurrentJobScheduling={setCurrentJobScheduling}
            />
          </div>
          <div className="col-lg-5">
            <MultiSelect
              title="SubLocation"
              names={allSubLocations?.map((all) => all?.description)}
              initialPersonalArray={initialSubLocationList}
              name="subLocation"
              setCurrentJobScheduling={setCurrentJobScheduling}
            />
          </div>
          <div className="col-lg-2 align-self-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                name="separateJob"
                checked={currentJobSchedulingObject?.separateJob}
                onChange={handleChangeJobSchedulingCheckFields}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Seprate job
              </label>
            </div>
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
                              <option value="Semi Annually">
                                Semi Annually
                              </option>
                              <option value="Quarterly">Quarterly</option>
                              <option value="Monthly">Monthly</option>
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
                                    {ind + 1}. Start Date
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
                                    {ind + 1}. End Date
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
                          <Select
                            label="Head Of Internal Audit"
                            value={
                              currentJobSchedulingObject?.headOfInternalAudit
                                ?.name || ""
                            }
                            setCurrentJobScheduling={setCurrentJobScheduling}
                            name="headOfInternalAudit"
                            list={allUsers?.map((all) => all?.name)}
                          />
                        </div>
                        <div className="col-lg-6">
                          <Select
                            label="Backup Head Of InternalAudit"
                            value={
                              currentJobSchedulingObject
                                ?.backupHeadOfInternalAudit?.name || ""
                            }
                            setCurrentJobScheduling={setCurrentJobScheduling}
                            name="backupHeadOfInternalAudit"
                            list={allUsers?.map((all) => all?.name)}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <Select
                            label="Proposed Job Approver"
                            value={
                              currentJobSchedulingObject?.proposedJobApprover
                                ?.name || ""
                            }
                            setCurrentJobScheduling={setCurrentJobScheduling}
                            name="proposedJobApprover"
                            list={allUsers?.map((all) => all?.name)}
                          />
                        </div>
                        <div className="col-lg-6">
                          <MultiSelect
                            title="Resources List"
                            names={allUsers?.map((all) => all?.name)}
                            initialPersonalArray={initialUserList}
                            name="resourcesList"
                            setCurrentJobScheduling={setCurrentJobScheduling}
                          />
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
