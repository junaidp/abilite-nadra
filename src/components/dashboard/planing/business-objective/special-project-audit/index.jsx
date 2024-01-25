import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import ObjectiveListDialog from "../../../../modals/objective-list-dialog/index";
import Dialog from "@mui/material/Dialog";
import {
  resetAddEngagementSuccess,
  setupGetSingleSpecialProjectAuditObjective,
  setupUpdateSpecialProjectAudit,
  setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit,
  setupUpdateBusinessMinuteMeeting,
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SpecialProjectAudit = () => {
  const [showObjectiveListDialog, setShowObjectiveListDialog] =
    React.useState(false);
  const [domain, setDomain] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const { planingEngagementSingleObject, engagementAddSuccess, loading } =
    useSelector((state) => state.planingEngagements);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  function handleSaveMinuteMeetings() {
    if (!loading) {
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

  function handleSumMapProcess() {
    setObject((pre) => {
      return {
        ...pre,
        businessObjectiveAndMapProcessList: [
          ...pre?.businessObjectiveAndMapProcessList,
          {
            description: pre?.mapProcessDescription,
            domain: pre?.mapProcessDomain,
            id: uuidv4(),
          },
        ],
      };
    });
  }

  function handleUpdateSpecialProjectAudit() {
    if (!loading) {
      dispatch(
        setupUpdateSpecialProjectAudit({
          ...planingEngagementSingleObject,
          engagement: {
            ...planingEngagementSingleObject?.engagement,
            engagementName: object?.engagementName,
          },
        })
      );
    }
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

  function handleSaveBusinessObjectiveMapProcess() {
    if (!loading) {
      dispatch(
        setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit({
          specialProjectOrAudit: planingEngagementSingleObject,
          domain,
          description,
        })
      );
    }
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetSingleSpecialProjectAuditObjective(engagementId));
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    setObject((pre) => {
      return {
        ...pre,
        engagementName:
          planingEngagementSingleObject?.engagement?.engagementName,
        businessObjectiveAndMapProcessList:
          planingEngagementSingleObject?.businessObjectiveAndMapProcessList,
        location_Id:
          planingEngagementSingleObject?.meetingScheduleAndMinutes?.location_Id,
        meetingDateTimeFrom:
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.meetingDateTimeFrom,
        meetingDateTimeTo:
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.meetingDateTimeTo,
        subLocation_Id:
          planingEngagementSingleObject?.meetingScheduleAndMinutes
            ?.subLocation_Id,
      };
    });
  }, [planingEngagementSingleObject]);

  React.useEffect(() => {
    dispatch(setupGetSingleSpecialProjectAuditObjective(engagementId));
  }, [engagementId]);

  return (
    <div>
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
        <div></div>
        <div className="col-md-12">
          <div className="accordion" id="accordionFlushExample">
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
                  Set Meeting Time
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label>Select Location</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="location_Id"
                        value={object?.location_Id}
                        onChange={handleChange}
                      >
                        <option>List of Locations</option>
                        <option value="1">Location 1</option>
                        <option value="2">Location 2</option>
                        <option value="3">Location 3</option>
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label>Select Sub Location</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="subLocation_Id"
                        onChange={handleChange}
                        value={object?.subLocation_Id}
                      >
                        <option>List of Sub Locations</option>
                        <option value="4">Sub Location 1</option>
                        <option value="5">Sub Location 2</option>
                        <option value="6">Sub Location 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="w-100">From</label>
                      <input
                        className="form-control w-100"
                        placeholder="Select Date"
                        type="date"
                        name="meetingDateTimeFrom"
                        value={object?.meetingDateTimeFrom}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="w-100">To</label>
                      <input
                        className="form-control w-100"
                        placeholder="Select Date"
                        type="date"
                        name="meetingDateTimeTo"
                        value={object?.meetingDateTimeTo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow ${
                      loading && "disabled"
                    }`}
                    onClick={handleSaveMinuteMeetings}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    {loading ? "loading..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
            <div className="my-4 sub-heading"></div>
            <header className="section-header my-3 align-items-center text-start d-flex">
              <div className="mb-0 sub-heading">
                Define Business Objective and Map Process
              </div>
              <div
                className="btn btn-labeled btn-primary ms-3 px-3 shadow"
                onClick={handleSumMapProcess}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-plus-circle"></i>
                </span>
                Add
              </div>
              <div
                className="btn btn-labeled btn-primary ms-3 px-3 shadow"
                onClick={() => setShowObjectiveListDialog(true)}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-list"></i>
                </span>
                Objective List
              </div>
              <i
                title="Info"
                className="fa fa-info-circle ps-3 text-secondary cursor-pointer"
              ></i>
            </header>

            {/*  */}
            {object?.businessObjectiveAndMapProcessList?.map((item, index) => {
              return (
                <div>
                  <div className="w-100 float-right">
                    <i
                      class="fa fa-trash text-danger f-18 px-3 cursor-pointer float-right w-100"
                      onClick={() => handleDeleteSingleMapItem(item?.id)}
                    ></i>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed br-8"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${index}`}
                        onClick={() => {
                          setDescription(item?.description || "");
                          setDomain(item?.domain || "");
                        }}
                      >
                        <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                          <div className=" d-flex align-items-center">
                            <i className="fa fa-check-circle fs-3 text-success pe-3"></i>{" "}
                            Define Business Objective and Map Process
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
                        <div className="mb-3 w-100">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Business Objective
                          </label>
                          <textarea
                            className="form-control"
                            placeholder="Enter Here"
                            id="ds"
                            rows="3"
                            name="mapProcessDescription"
                            value={description}
                            onChange={(e) => setDescription(e?.target?.value)}
                          ></textarea>
                          <p className="word-limit-info mb-0">
                            Maximum 1500 words
                          </p>
                        </div>

                        <div className="col-lg-12">
                          <label> Select Domain</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="mapProcessDomain"
                            value={domain}
                            onChange={(e) => setDomain(e?.target?.value)}
                          >
                            <option>Select</option>
                            <option value="strategic">strategic</option>
                            <option value="operation">operation</option>
                          </select>
                        </div>

                        <button
                          className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow ${
                            loading && "disabled"
                          }`}
                          onClick={handleSaveBusinessObjectiveMapProcess}
                        >
                          <span className="btn-label me-2">
                            <i className="fa fa-check-circle"></i>
                          </span>
                          {loading ? "loading..." : "Save"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default SpecialProjectAudit;
