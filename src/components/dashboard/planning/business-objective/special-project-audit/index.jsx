import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import ObjectiveListDialog from "../../../../modals/objective-list-dialog/index";
import Dialog from "@mui/material/Dialog";
import moment from "moment";
import { toast } from "react-toastify";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { setupGetAllLocations } from "../../../../../global-redux/reducers/settings/location/slice";
import {
  resetAddEngagementSuccess,
  setupGetSingleSpecialProjectAuditObjective,
  setupUpdateSpecialProjectAudit,
  setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit,
  setupUpdateBusinessMinuteMeeting,
  handleCleanUp,
  setupGetInitialSingleSpecialProjectAuditObjective,
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SetMeetingTime from "./components/set-meeting-time";
import BusinessObjectiveMapProcess from "./components/business-objective-map-process";
import { CircularProgress } from "@mui/material";

const SpecialProjectAudit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const {
    planingEngagementSingleObject,
    engagementAddSuccess,
    loading,
    initialLoading,
  } = useSelector((state) => state.planningEngagement);
  const { allLocations } = useSelector((state) => state.settingsLocation);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [showObjectiveListDialog, setShowObjectiveListDialog] =
    React.useState(false);
  const [domain, setDomain] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [allSubLocations, setAllSubLocations] = React.useState([]);
  const [object, setObject] = React.useState({
    engagementName: "",
    meetingDateTimeFrom: "",
    meetingDateTimeTo: "",
    strategicDocuments: [],
    subLocation_Id: "",
    location_Id: "",
    businessObjectiveAndMapProcessList: [
      {
        description: "",
        domain: "",
        id: 1,
      },
    ],
  });

  function handleClose() {
    setShowObjectiveListDialog(false);
  }

  function handleChange(event) {
    setObject((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleSumMapProcess() {
    setObject((pre) => {
      return {
        ...pre,
        businessObjectiveAndMapProcessList: [
          ...pre?.businessObjectiveAndMapProcessList,
          {
            description: "",
            domain: "",
            id: uuidv4(),
          },
        ],
      };
    });
  }

  function handleSaveMinuteMeetings() {
    if (!loading) {
      const today = moment.utc().startOf("day");

      const fromDate = moment.utc(object?.meetingDateTimeFrom).startOf("day");
      const toDate = moment.utc(object?.meetingDateTimeTo).startOf("day");

      if (
        !object?.location_Id ||
        !object?.subLocation_Id ||
        !object?.meetingDateTimeFrom ||
        !object?.meetingDateTimeTo
      ) {
        toast.error("Please provide all values");
        return;
      }

      if (fromDate.isBefore(today)) {
        toast.error("Start date must be today or greater than today");
        return;
      }

      if (!toDate.isAfter(fromDate)) {
        toast.error(
          "Invalid meeting date range. End date must be greater than start date"
        );
        return;
      }

      dispatch(
        setupUpdateBusinessMinuteMeeting({
          engagementId: engagementId,
          location_Id: object?.location_Id,
          subLocation_Id: object?.subLocation_Id,
          meetingDateTimeFrom: object?.meetingDateTimeFrom,
          meetingDateTimeTo: object?.meetingDateTimeTo,
          meetingMinutes: "",
        })
      );
    }
  }

  function handleUpdateSpecialProjectAudit() {
    if (!loading) {
      dispatch(
        setupUpdateSpecialProjectAudit({
          ...planingEngagementSingleObject,
          engagementName: object?.engagementName,
        })
      );
    }
  }
  function handleSubmitSpecialAuditObjective() {
    if (!loading) {
      dispatch(
        setupUpdateSpecialProjectAudit({
          ...planingEngagementSingleObject,
          complete: true,
        })
      );
    }
  }

  function handleSaveBusinessObjectiveMapProcess(item) {
    if (!loading) {
      if (description === "" || domain === "") {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit({
            specialProjectOrAudit: planingEngagementSingleObject,
            domain,
            description,
            id: typeof item?.id === "number" ? item?.id : 0,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    setObject((pre) => {
      return {
        ...pre,
        engagementName: planingEngagementSingleObject?.engagementName || "",
        businessObjectiveAndMapProcessList:
          planingEngagementSingleObject?.businessObjectiveAndMapProcessList ||
          [],
        location_Id:
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.location_Id || "",
        meetingDateTimeFrom: planingEngagementSingleObject
          ?.meetingScheduleAndMinutes?.meetingDateTimeFrom
          ? moment
              .utc(
                planingEngagementSingleObject?.meetingScheduleAndMinutes
                  ?.meetingDateTimeFrom
              )
              .format("YYYY-MM-DD")
          : "",
        meetingDateTimeTo: planingEngagementSingleObject
          ?.meetingScheduleAndMinutes?.meetingDateTimeTo
          ? moment
              .utc(
                planingEngagementSingleObject?.meetingScheduleAndMinutes
                  ?.meetingDateTimeTo
              )
              .format("YYYY-MM-DD")
          : "",
        subLocation_Id:
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.subLocation_Id || "",
      };
    });
  }, [planingEngagementSingleObject]);

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetSingleSpecialProjectAuditObjective(engagementId));
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    if (object?.location_Id) {
      const item = allLocations?.find(
        (all) => all?.id === Number(object?.location_Id)
      );
      setAllSubLocations(item?.subLocations);
    }
  }, [object?.location_Id]);

  React.useEffect(() => {
    if (user[0]?.token && engagementId) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetInitialSingleSpecialProjectAuditObjective(engagementId)
        );
        dispatch(setupGetAllLocations(`?companyId=${companyId}`));
      }
    }
  }, [engagementId, user]);

  React.useEffect(() => {
    if (!engagementId) {
      navigate("/audit/business-objective");
    }
  }, [engagementId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-business-objective"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : planingEngagementSingleObject[0]?.error === "Not Found" ? (
        "Engagement Not Found"
      ) : (
        <>
          <Dialog open={showObjectiveListDialog} onClose={handleClose}>
            <ObjectiveListDialog
              setShowObjectiveListDialog={setShowObjectiveListDialog}
            />
          </Dialog>

          <header className="section-header my-3 align-items-center  text-start d-flex ">
            <a
              className="text-primary"
              onClick={() => navigate("/audit/business-objective")}
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Special Project/Audit</div>
          </header>

          <div className="px-4">
            <div>
              <div className="mb-4 col-lg-12">
                <div className="label-text w-100 mb-2">Engagement Name</div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="text"
                      id="description"
                      value={object?.engagementName}
                      onChange={handleChange}
                      name="engagementName"
                      className="form-control h-40"
                      placeholder="Enter"
                      disabled={
                        planingEngagementSingleObject?.locked === true ||
                        (planingEngagementSingleObject?.complete === true &&
                          planingEngagementSingleObject?.locked === false &&
                          user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="accordion" id="accordionFlushExample">
                <SetMeetingTime
                  planingEngagementSingleObject={planingEngagementSingleObject}
                  object={object}
                  handleChange={handleChange}
                  allLocations={allLocations}
                  allSubLocations={allSubLocations}
                  handleSaveMinuteMeetings={handleSaveMinuteMeetings}
                  loading={loading}
                />
                <BusinessObjectiveMapProcess
                  handleSumMapProcess={handleSumMapProcess}
                  setShowObjectiveListDialog={setShowObjectiveListDialog}
                  object={object}
                  description={description}
                  domain={domain}
                  setDomain={setDomain}
                  setDescription={setDescription}
                  handleSaveBusinessObjectiveMapProcess={
                    handleSaveBusinessObjectiveMapProcess
                  }
                  loading={loading}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                />
              </div>
              {(planingEngagementSingleObject?.complete === false ||
                (planingEngagementSingleObject?.complete === true &&
                  planingEngagementSingleObject?.locked === false &&
                  user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
                <button
                  className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow float-end ${
                    loading && "disabled"
                  }`}
                  onClick={handleUpdateSpecialProjectAudit}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  {loading ? "loading..." : "Save"}
                </button>
              )}
            </div>
            {planingEngagementSingleObject?.complete === false &&
              planingEngagementSingleObject?.businessObjectiveAndMapProcessList &&
              planingEngagementSingleObject?.businessObjectiveAndMapProcessList
                ?.length > 0 && (
                <button
                  className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow mx-4 float-end ${
                    loading && "disabled"
                  }`}
                  onClick={handleSubmitSpecialAuditObjective}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  {loading ? "loading..." : "Submit"}
                </button>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default SpecialProjectAudit;
