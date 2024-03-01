import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import ObjectiveListDialog from "../../../../modals/objective-list-dialog/index";
import Dialog from "@mui/material/Dialog";
import {
  resetAddEngagementSuccess,
  setupGetSingleEngagementObject,
  setupUpdateBusinessObjective,
  setupSaveMapProcessBusinessObjective,
  setupUpdateBusinessMinuteMeeting,
  handleCleanUp,
  setupGetInitialSingleEngagementObject,
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import { setupGetAllLocations } from "../../../../../global-redux/reducers/settings/location/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import IndustryUpdates from "./components/industry-updates";
import CompanyUpdates from "./components/company-updates";
import SetMeetingTime from "./components/set-meeting-time";
import BusinessObjectiveMapProcess from "./components/business-objective-map-process";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const BusinessObjectiveRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const { allLocations } = useSelector((state) => state.setttingsLocation);
  const {
    planingEngagementSingleObject,
    engagementAddSuccess,
    loading,
    initialLoading,
  } = useSelector((state) => state.planingEngagements);
  const { user } = useSelector((state) => state?.auth);
  const [showObjectiveListDialog, setShowObjectiveListDialog] =
    React.useState(false);
  const [domain, setDomain] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [allSubLocations, setAllSubLocations] = React.useState([]);

  const [object, setObject] = React.useState({
    engagementName: "",
    industryUpdate: "",
    companyUpdate: "",
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

  function handleDeleteSingleMapItem(id) {
    setObject((pre) => {
      return {
        ...pre,
        businessObjectiveAndMapProcessList:
          pre.businessObjectiveAndMapProcessList.filter(
            (all) => all?.id !== id
          ),
      };
    });
  }

  function handleSaveMinuteMeetings() {
    if (!loading) {
      if (
        object?.location_Id === "" ||
        object?.subLocation_Id === "" ||
        object?.meetingDateTimeFrom === "" ||
        object?.meetingDateTimeTo === ""
      ) {
        toast.error("Please provide all values");
      }
      const fromDate = new Date(object?.meetingDateTimeFrom);
      const toDate = new Date(object?.meetingDateTimeTo);
      if (fromDate > toDate) {
        toast.error("InValid meeting date range");
      }
      if (
        object?.location_Id !== "" &&
        object?.subLocation_Id !== "" &&
        object?.meetingDateTimeFrom !== "" &&
        object?.meetingDateTimeTo !== "" &&
        toDate > fromDate
      ) {
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
  }

  function handleUpdateBusinessObjective() {
    if (!loading) {
      dispatch(
        setupUpdateBusinessObjective({
          ...planingEngagementSingleObject,
          industryUpdate: object?.industryUpdate,
          companyUpdate: object?.companyUpdate,
          engagement: {
            ...planingEngagementSingleObject?.engagement,
            engagementName: object?.engagementName,
          },
        })
      );
    }
  }

  function handleSaveBusinessObjectiveMapProcess() {
    if (!loading) {
      if (description === "" || domain === "") {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupSaveMapProcessBusinessObjective({
            businessObjective: planingEngagementSingleObject,
            description,
            domain,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    setObject((pre) => {
      return {
        ...pre,
        industryUpdate: planingEngagementSingleObject?.industryUpdate || "",
        companyUpdate: planingEngagementSingleObject?.companyUpdate || "",
        engagementName:
          planingEngagementSingleObject?.engagement?.engagementName || "",
        businessObjectiveAndMapProcessList:
          planingEngagementSingleObject?.businessObjectiveAndMapProcessList ||
          [],
        location_Id:
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.location_Id || "",
        meetingDateTimeFrom: planingEngagementSingleObject
          ?.meetingScheduleAndMinutes?.meetingDateTimeFrom
          ? moment(
              planingEngagementSingleObject?.meetingScheduleAndMinutes
                ?.meetingDateTimeFrom
            ).format("YYYY-MM-DD")
          : "",
        meetingDateTimeTo: planingEngagementSingleObject
          ?.meetingScheduleAndMinutes?.meetingDateTimeTo
          ? moment(
              planingEngagementSingleObject?.meetingScheduleAndMinutes
                ?.meetingDateTimeTo
            ).format("YYYY-MM-DD")
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
      dispatch(setupGetSingleEngagementObject(engagementId));
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
      dispatch(setupGetInitialSingleEngagementObject(engagementId));
      dispatch(setupGetAllLocations());
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
            <div className="mb-0 heading">Business Objectives</div>
          </header>

          <div className="row px-4">
            <div className="row">
              <div className="mb-4 col-lg-12">
                <div className="col-lg-2 label-text w-100 mb-2">
                  Engagement Name
                </div>
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="accordion" id="accordionFlushExample">
                <IndustryUpdates
                  handleUpdateBusinessObjective={handleUpdateBusinessObjective}
                  handleChange={handleChange}
                  object={object}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                  loading={loading}
                />
                <CompanyUpdates
                  handleUpdateBusinessObjective={handleUpdateBusinessObjective}
                  handleChange={handleChange}
                  object={object}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                  loading={loading}
                />

                <SetMeetingTime
                  planingEngagementSingleObject={planingEngagementSingleObject}
                  object={object}
                  handleChange={handleChange}
                  allLocations={allLocations}
                  allSubLocations={allSubLocations}
                  loading={loading}
                  handleSaveMinuteMeetings={handleSaveMinuteMeetings}
                />
                <BusinessObjectiveMapProcess
                  handleSumMapProcess={handleSumMapProcess}
                  setShowObjectiveListDialog={setShowObjectiveListDialog}
                  object={object}
                  handleSaveBusinessObjectiveMapProcess={
                    handleSaveBusinessObjectiveMapProcess
                  }
                  loading={loading}
                  domain={domain}
                  description={description}
                  setDomain={setDomain}
                  setDescription={setDescription}
                  handleDeleteSingleMapItem={handleDeleteSingleMapItem}
                />
              </div>
              <button
                className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow float-end ${
                  loading && "disabled"
                }`}
                onClick={handleUpdateBusinessObjective}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-check-circle"></i>
                </span>
                {loading ? "loading..." : "Save"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessObjectiveRedirect;
