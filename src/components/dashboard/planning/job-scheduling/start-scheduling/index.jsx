import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MultiSelect from "./components/select/MultiSelect";
import LocationSelect from "./components/LocationSelect";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { setupGetAllLocations } from "../../../../../global-redux/reducers/settings/location/slice";
import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";
import {
  setupGetSingleJobScheduling,
  setupUpdateJobScheduling,
  resetJobSchedulingSuccess,
  handleCleanUp,
  setupGetInitialSingleJobScheduling,
} from "../../../../../global-redux/reducers/planing/job-scheduling/slice";
import { useSelector, useDispatch } from "react-redux";
import ResourcesRequired from "./components/resources-required";
import TimeAndDateAllocation from "./components/time-date-allocation";
import JobScheduleList from "./components/job-schedule-list";
import ResourceAllocation from "./components/resource-allocation";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import SubmitDialog from "./components/submit-dialog";
import { useParams } from "react-router-dom";
import { decryptString } from "../../../../../config/helper";

const StartScheduling = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const jobSchedulingId = decryptString(id);
  const {
    loading,
    jobSchedulingAddSuccess,
    singleJobSchedulingObject,
    initialLoading,
  } = useSelector((state) => state?.planningJobScheduling);
  const { allUsers } = useSelector((state) => state?.settingsUserManagement);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [initialLocationList, setInitialLocationList] = React.useState([]);
  const [initialSubLocationList, setInitialSubLocationList] = React.useState(
    []
  );
  const [initialUserList, setInitialUserList] = React.useState([]);
  const { allLocations } = useSelector((state) => state?.settingsLocation);
  const [currentJobSchedulingObject, setCurrentJobScheduling] = React.useState(
    {}
  );
  const [allSubLocations, setAllSubLocations] = React.useState([]);

  function handleChangeNumberTextField(event, section) {
    if (section === "resourcesRequired") {
      let ifUsersExists = allUsers?.some(
        (userItem) =>
          userItem?.employeeid?.skillSet?.toUpperCase() ===
          event?.target?.name?.toUpperCase()
      );

      let totalHierarchyUsers = allUsers?.filter(
        (userItem) =>
          userItem?.employeeid?.skillSet?.toUpperCase() ===
          event?.target?.name?.toUpperCase()
      );

      if (!ifUsersExists) {
        toast.error("No resource available in Operations");
        return;
      }

      if (totalHierarchyUsers && totalHierarchyUsers?.length > 0) {
        if (Number(event.target.value > Number(totalHierarchyUsers?.length))) {
          toast.error(
            `There are only ${
              Number(event.target.value) - 1
            } ${event.target.name.toUpperCase()} resource(s) available in the company. You are not allowed to add more.`
          );

          return;
        }
      }

      if (ifUsersExists) {
        if (/^\d*\.?\d*$/.test(event?.target?.value)) {
          setCurrentJobScheduling((pre) => {
            return {
              ...pre,
              numberOfResourcesRequired: {
                ...pre?.numberOfResourcesRequired,
                [event?.target?.name]: Number(event?.target?.value),
              },
            };
          });
        }
      }
    }

    if (section === "timeAllocation") {
      if (/^\d*\.?\d*$/.test(event?.target?.value)) {
        setCurrentJobScheduling((pre) => {
          return {
            ...pre,
            timeAndDateAllocation: {
              ...pre?.timeAndDateAllocation,
              [event?.target?.name]: Number(event?.target?.value),
            },
          };
        });
      }
    }
  }

  function handleChangeJobSchedulingStringTextFields(event) {
    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        timeAndDateAllocation: {
          ...pre?.timeAndDateAllocation,
          [event?.target?.name]: event?.target?.value,
        },
      };
    });
  }

  function handleChangeJobSchedulingCheckFields(event, section) {
    if (section === "repeatJob") {
      setCurrentJobScheduling((pre) => {
        return {
          ...pre,
          timeAndDateAllocation: {
            ...pre?.timeAndDateAllocation,
            [event?.target?.name]: event?.target?.checked,
          },
        };
      });
    }
    if (section === "seprateJob") {
      setCurrentJobScheduling((pre) => {
        return {
          ...pre,
          [event?.target?.name]: event?.target?.checked,
        };
      });
    }
  }

  function handleSaveMainJobScheduling() {
    if (!loading) {
      const filteredLocationArray = allLocations.filter((item) =>
        currentJobSchedulingObject?.locationList.includes(item?.description)
      );
      const filteredSubLocationArray = allSubLocations.filter((item) =>
        currentJobSchedulingObject?.subLocation.includes(item?.description)
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
      };
      dispatch(setupUpdateJobScheduling(object));
    }
  }

  function handleSubmitJobScheduling() {
    setShowSubmitDialog(true);
  }

  function handleCheckJobScheduling(list) {
    if (list) {
      let isTrue = true;
      list?.forEach((listItem) => {
        if (!listItem?.plannedJobStartDate || !listItem?.plannedJobEndDate) {
          isTrue = false;
        }
      });
      return isTrue;
    }
  }

  React.useEffect(() => {
    const isEmptyObject =
      Object.keys(singleJobSchedulingObject).length === 0 &&
      singleJobSchedulingObject.constructor === Object;
    if (!isEmptyObject) {
      setCurrentJobScheduling(singleJobSchedulingObject);
      if (singleJobSchedulingObject?.locationList !== null) {
        setInitialLocationList(
          singleJobSchedulingObject?.locationList?.map(
            (all) => all?.description
          )
        );
      }
      if (singleJobSchedulingObject?.subLocation !== null) {
        setInitialSubLocationList(
          singleJobSchedulingObject?.subLocation?.map((all) => all?.description)
        );
      }
      if (
        singleJobSchedulingObject?.resourceAllocation !== null &&
        singleJobSchedulingObject?.resourceAllocation?.resourcesList !== null
      ) {
        setInitialUserList(
          singleJobSchedulingObject?.resourceAllocation?.resourcesList?.map(
            (all) => all?.name
          )
        );
      }
    }
  }, [singleJobSchedulingObject]);

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
    if (jobSchedulingAddSuccess) {
      dispatch(setupGetSingleJobScheduling(jobSchedulingId));
      dispatch(resetJobSchedulingSuccess());
    }
  }, [jobSchedulingAddSuccess]);

  React.useEffect(() => {
    if (user[0]?.token && jobSchedulingId) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      dispatch(setupGetInitialSingleJobScheduling(jobSchedulingId));
      dispatch(setupGetAllLocations(`?companyId=${companyId}`));
      setTimeout(() => {
        dispatch(setupGetAllUsers({ shareWith: true }));
      }, 1200);
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!jobSchedulingId) {
      navigate("/audit/job-scheduling");
    }
  }, [jobSchedulingId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-job-scheduling"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
      {showSubmitDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <SubmitDialog
              currentJobSchedulingObject={currentJobSchedulingObject}
              setShowSubmitDialog={setShowSubmitDialog}
              allLocations={allLocations}
              allSubLocations={allSubLocations}
            />
          </div>
        </div>
      )}
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : singleJobSchedulingObject[0]?.error === "Not Found" ? (
        "Job Scheduling Not Found"
      ) : (
        <form>
          <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">
              <i
                onClick={() => navigate("/audit/job-scheduling")}
                className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
              ></i>
              <span className="me-3">
                {currentJobSchedulingObject?.auditableUnitTitle}
              </span>
            </div>
          </header>
          {singleJobSchedulingObject?.natureThrough ===
          "Compliance Checklist" ? (
            <div className="row ">
              <div className="col-lg-5 mb-3">
                <MultiSelect
                  names={allLocations?.map((all) => all?.description)}
                  title="Location"
                  initialPersonalArray={initialLocationList}
                  name="locationList"
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  singleJobSchedulingObject={singleJobSchedulingObject}
                />
              </div>
              <div className="col-lg-5 mb-3">
                <MultiSelect
                  title="SubLocation"
                  names={allSubLocations?.map((all) => all?.description)}
                  initialPersonalArray={initialSubLocationList}
                  name="subLocation"
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  singleJobSchedulingObject={singleJobSchedulingObject}
                />
              </div>
            </div>
          ) : (
            <div className="row ">
              <div className="col-lg-5 mb-3">
                <LocationSelect
                  names={allLocations?.map((all) => all?.description)}
                  title="Location"
                  initialPersonalArray={initialLocationList}
                  name="locationList"
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  singleJobSchedulingObject={singleJobSchedulingObject}
                />
              </div>
              <div className="col-lg-5 mb-3">
                <LocationSelect
                  title="SubLocation"
                  names={allSubLocations?.map((all) => all?.description)}
                  initialPersonalArray={initialSubLocationList}
                  name="subLocation"
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  singleJobSchedulingObject={singleJobSchedulingObject}
                />
              </div>
              <div className="col-lg-2 mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    name="separateJob"
                    checked={currentJobSchedulingObject?.separateJob}
                    onChange={(event) =>
                      handleChangeJobSchedulingCheckFields(event, "seprateJob")
                    }
                    disabled={
                      singleJobSchedulingObject?.locked === true ||
                      singleJobSchedulingObject?.natureThrough ===
                        "Compliance Checklist" ||
                      (singleJobSchedulingObject?.complete === true &&
                        singleJobSchedulingObject?.locked === false &&
                        user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                        ? true
                        : false
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Seprate job
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <div className="accordion" id="accordionFlushExample">
                <ResourcesRequired
                  currentJobSchedulingObject={currentJobSchedulingObject}
                  handleChangeNumberTextField={handleChangeNumberTextField}
                  handleSaveMainJobScheduling={handleSaveMainJobScheduling}
                  singleJobSchedulingObject={singleJobSchedulingObject}
                />

                <TimeAndDateAllocation
                  currentJobSchedulingObject={currentJobSchedulingObject}
                  handleChangeJobSchedulingCheckFields={
                    handleChangeJobSchedulingCheckFields
                  }
                  handleChangeJobSchedulingStringTextFields={
                    handleChangeJobSchedulingStringTextFields
                  }
                  handleChangeNumberTextField={handleChangeNumberTextField}
                  handleSaveMainJobScheduling={handleSaveMainJobScheduling}
                  singleJobSchedulingObject={singleJobSchedulingObject}
                />

                <JobScheduleList
                  currentJobSchedulingObject={currentJobSchedulingObject}
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  handleSaveMainJobScheduling={handleSaveMainJobScheduling}
                />

                {singleJobSchedulingObject?.numberOfResourcesRequired &&
                  (singleJobSchedulingObject?.numberOfResourcesRequired
                    ?.finance > 0 ||
                    singleJobSchedulingObject?.numberOfResourcesRequired
                      ?.business > 0 ||
                    singleJobSchedulingObject?.numberOfResourcesRequired
                      ?.fraud > 0 ||
                    singleJobSchedulingObject?.numberOfResourcesRequired
                      ?.operations > 0 ||
                    singleJobSchedulingObject?.numberOfResourcesRequired
                      ?.other > 0 ||
                    singleJobSchedulingObject?.numberOfResourcesRequired?.it >
                      0) && (
                    <ResourceAllocation
                      currentJobSchedulingObject={currentJobSchedulingObject}
                      setCurrentJobScheduling={setCurrentJobScheduling}
                      initialUserList={initialUserList}
                      handleSaveMainJobScheduling={handleSaveMainJobScheduling}
                      allUsers={allUsers}
                    />
                  )}
              </div>
            </div>
          </div>
          <div className="row flex mb-2">
            <div className="col-lg-10 ">
              {singleJobSchedulingObject?.jobScheduleList &&
                handleCheckJobScheduling(
                  singleJobSchedulingObject?.jobScheduleList
                ) &&
                singleJobSchedulingObject?.complete === false &&
                singleJobSchedulingObject?.resourceAllocation?.resourcesList &&
                singleJobSchedulingObject?.resourceAllocation?.resourcesList
                  ?.length !== 0 &&
                currentJobSchedulingObject?.locationList &&
                currentJobSchedulingObject?.locationList?.length !== 0 &&
                currentJobSchedulingObject?.subLocation &&
                currentJobSchedulingObject?.subLocation?.length !== 0 && (
                  <div className=" mt-3">
                    <div className="col-lg-12 justify-content-end text-end">
                      <div
                        className={`btn btn-labeled btn-primary mright-4 px-3 shadow ${
                          loading && "disabled"
                        }`}
                        onClick={handleSubmitJobScheduling}
                      >
                        {loading ? "Loading..." : "Submit"}
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="col-lg-2 ">
              {(singleJobSchedulingObject?.complete === false ||
                (singleJobSchedulingObject?.complete === true &&
                  singleJobSchedulingObject?.locked === false &&
                  user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
                <div className=" mt-3 ">
                  <div className="col-lg-12 justify-content-end text-end">
                    <div
                      className={`btn btn-labeled btn-primary px-3  shadow ${
                        loading && "disabled"
                      }`}
                      onClick={handleSaveMainJobScheduling}
                    >
                      {loading ? "Loading..." : "Save"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default StartScheduling;
