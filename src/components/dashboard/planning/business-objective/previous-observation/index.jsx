import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import Select from "./component/Select";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  handleCleanUp,
  setupGetAllPreviousObservations,
  setupCreateNewJob,
  setupGetAllUsers,
} from "../../../../../global-redux/reducers/settings/previous-observation/slice";
import { CircularProgress } from "@mui/material";
import ResourcesRequired from "./component/resource-required";
import { toast } from "react-toastify";
import TimeAndDateAllocation from "./component/time-date-allocation";
import ResourceAllocation from "./component/resource-allocation";
import ObservationList from "./component/observation-list";

const PreviousObservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const {
    users,
    loading,
    createObservationLoding,
    previousObservationAddSuccess,
  } = useSelector((state) => state?.settingsPreviousObservation);
  const [fieldWorkManHours, setFieldWorkManHours] = React.useState(0);
  const [totalWorkingManHours, setTotalWorkingManHours] = React.useState(0);
  const [totalHours, setTotalHours] = React.useState(0);

  const [values, setValues] = React.useState({
    riskRating: "",
    year: "",
    jobTitle: "",
    auditee: "",
    numberOfResourcesRequired: {
      finance: 0,
      business: 0,
      fraud: 0,
      operations: 0,
      other: 0,
      it: 0,
    },
    timeAndDateAllocation: {
      estimatedWeeks: "",
      fieldWorkManHours: "",
      internalAuditManagementHours: "",
      totalWorkingManHours: "",
      placeOfWork: "",
      travellingDays: "",
      totalHours: "",
      repeatJob: false,
      frequency: "",
    },
    resourceAllocation: {
      resourcesList: [],
      headOfInternalAudit: "",
      backupHeadOfInternalAudit: "",
      proposedJobApprover: "",
    },
    observationsList: [],
  });

  function handleCreateJob() {
    if (
      values?.jobTitle === "" ||
      values?.riskRating === "" ||
      values?.auditee === "" ||
      values?.year === "" ||
      values?.timeAndDateAllocation?.placeOfWork === "" ||
      values?.resourceAllocation?.resourcesList.length === 0 ||
      values?.observationsList?.length === 0
    ) {
      toast.error("Please provide all fields");
    } else {
      if (!createObservationLoding) {
        dispatch(
          setupCreateNewJob({
            ...values,
            timeAndDateAllocation: {
              ...values?.timeAndDateAllocation,
              fieldWorkManHours,
              totalWorkingManHours,
              totalHours,
            },
            resourceAllocation: {
              ...values?.resourceAllocation,
              headOfInternalAudit: users?.find(
                (user) => user?.employeeid?.userHierarchy === "IAH"
              )?.id,
            },
            jobSchedule: {
              plannedJobStartDate: moment().toISOString(),
              plannedJobEndDate: moment().add(1, "minute").toISOString(),
            },
          })
        );
      }
    }
  }

  function handleChange(event) {
    setValues((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleChangeNumberTextField(event, section) {
    if (section === "resourcesRequired") {
      let ifUsersExists = users?.some(
        (userItem) =>
          userItem?.employeeid?.skillSet?.toUpperCase() ===
          event?.target?.name?.toUpperCase()
      );

      if (!ifUsersExists) {
        toast.error("No resource available in Operations");
      }

      if (ifUsersExists) {
        if (/^\d*\.?\d*$/.test(event?.target?.value)) {
          setValues((pre) => {
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
        setValues((pre) => {
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

  function handleChangeJobSchedulingCheckFields(event) {
    setValues((pre) => {
      return {
        ...pre,
        timeAndDateAllocation: {
          ...pre?.timeAndDateAllocation,
          [event?.target?.name]: event?.target?.checked,
        },
      };
    });
  }

  function handleChangeJobSchedulingStringTextFields(event) {
    setValues((pre) => {
      return {
        ...pre,
        timeAndDateAllocation: {
          ...pre?.timeAndDateAllocation,
          [event.target.name]: event.target.value,
        },
      };
    });
  }

  React.useEffect(() => {
    if (user[0]?.token) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      dispatch(setupGetAllPreviousObservations({ companyId }));
      dispatch(setupGetAllUsers());
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-business-objective"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  React.useEffect(() => {
    if (previousObservationAddSuccess) {
      navigate("/audit/business-objective");
    }
  }, [previousObservationAddSuccess]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <header className="section-header my-3 align-items-center  text-start d-flex ">
            <a
              className="text-primary"
              onClick={() => navigate("/audit/business-objective")}
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Previous Observataion</div>
          </header>
          <div className="row">
            <div className="mb-4 col-lg-12">
              <div className="col-lg-2 label-text w-100 mb-2">Job Name</div>
              <div className="col-lg-12">
                <div className="form-group">
                  <input
                    type="text"
                    id="description"
                    className="form-control h-40"
                    value={values?.jobTitle}
                    name="jobTitle"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6">
              <select
                className="form-select"
                aria-label="Default select example"
                value={values?.year}
                onChange={(event) => handleChange(event)}
                name="year"
              >
                <option value="">Select Year</option>
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
                <option value={2020}>2020</option>
                <option value={2019}>2019</option>
                <option value={2018}>2018</option>
                <option value={2017}>2017</option>
                <option value={2016}>2016</option>
              </select>
            </div>
            <div className="col-lg-6">
              <select
                className="form-select"
                aria-label="Default select example"
                name="riskRating"
                value={values?.riskRating}
                onChange={(event) => handleChange(event)}
              >
                <option value="">Select Rating</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="col-lg-12 mb-4">
            <Select
              label="Auditee"
              value={values?.auditee}
              handleChange={handleChange}
              users={users}
            />
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="accordion" id="accordionFlushExample">
                <div className="col-lg-12 mb-4">
                  <ResourcesRequired
                    values={values}
                    handleChangeNumberTextField={handleChangeNumberTextField}
                  />
                </div>
                <div className="col-lg-12 mb-4">
                  <TimeAndDateAllocation
                    values={values}
                    handleChangeNumberTextField={handleChangeNumberTextField}
                    handleChangeJobSchedulingStringTextFields={
                      handleChangeJobSchedulingStringTextFields
                    }
                    handleChangeJobSchedulingCheckFields={
                      handleChangeJobSchedulingCheckFields
                    }
                    fieldWorkManHours={fieldWorkManHours}
                    totalWorkingManHours={totalWorkingManHours}
                    totalHours={totalHours}
                    setFieldWorkManHours={setFieldWorkManHours}
                    setTotalWorkingManHours={setTotalWorkingManHours}
                    setTotalHours={setTotalHours}
                  />
                </div>
                <div className="col-lg-12 mb-4">
                  <ResourceAllocation
                    values={values}
                    setValues={setValues}
                    users={users}
                  />
                </div>
                <div className="col-lg-12 mb-4">
                  <ObservationList setValues={setValues} values={values} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="float-end">
        <button
          className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow ${
            createObservationLoding && "disabled"
          }`}
          onClick={handleCreateJob}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle"></i>
          </span>
          {createObservationLoding ? "loading..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PreviousObservation;
