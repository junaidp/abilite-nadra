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
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const BusinessObjectiveRedirect = () => {
  const [showObjectiveListDialog, setShowObjectiveListDialog] =
    React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const { planingEngagementSingleObject, engagementAddSuccess } = useSelector(
    (state) => state.planingEngagements
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  function handleSaveMinuteMeetings() {
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

  function handleDeleteFileItem(id) {
    setObject((pre) => {
      return {
        ...pre,
        strategicDocuments: pre.strategicDocuments.filter(
          (all) => all?.id !== id
        ),
      };
    });
  }

  // file Upload

  const isImage = (file) => {
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    return file && acceptedImageTypes.includes(file.type);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (isImage(selectedFile)) {
      toast.error("Selected file is an image. Please select a non-image file.");
      return;
    }
    if (!isImage(selectedFile))
      setObject((pre) => {
        return {
          ...pre,
          strategicDocuments: [
            ...pre.strategicDocuments,
            {
              fileName: selectedFile?.name,
              location: selectedFile?.name,
              id: uuidv4(),
            },
          ],
        };
      });
  };

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

  function handleUpdateBusinessObjective() {
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

  function handleChangeMapItemDescription(event, id) {
    setObject((pre) => {
      return {
        ...pre,
        businessObjectiveAndMapProcessList:
          pre?.businessObjectiveAndMapProcessList.map((item) =>
            item?.id === id
              ? { ...item, description: event?.target?.value }
              : item
          ),
      };
    });
  }

  function handleChangeMapItemDemain(event, id) {
    setObject((pre) => {
      return {
        ...pre,
        businessObjectiveAndMapProcessList:
          pre?.businessObjectiveAndMapProcessList.map((item) =>
            item?.id === id ? { ...item, domain: event?.target?.value } : item
          ),
      };
    });
  }

  function handleSaveBusinessObjectiveMapProcess() {
    const businessObjectiveAndMapProcessListObject =
      object?.businessObjectiveAndMapProcessList
        .filter((item) => item?.description && item?.domain)
        .map((all) => {
          return {
            description: all?.description,
            domain: all?.domain,
          };
        });

    if (businessObjectiveAndMapProcessListObject?.length !== 0) {
      dispatch(
        setupSaveMapProcessBusinessObjective({
          ...planingEngagementSingleObject,
          businessObjectiveAndMapProcessList:
            businessObjectiveAndMapProcessListObject,
        })
      );
    }
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetSingleEngagementObject(engagementId));
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    setObject((pre) => {
      return {
        ...pre,
        industryUpdate: planingEngagementSingleObject?.industryUpdate,
        companyUpdate: planingEngagementSingleObject?.companyUpdate,
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
    dispatch(setupGetSingleEngagementObject(engagementId));
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
        <div></div>
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
                  <i className="fa fa-check-circle fs-3 text-success pe-3"></i>{" "}
                  Industry Updates
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {" "}
                  <div className="container">
                    <div className="d-flex justify-content-between">
                      <label>Industry Update</label>

                      <a
                        href="#"
                        className="link-underline-muted decoration-none"
                      >
                        AI Generate
                      </a>
                    </div>
                    <textarea
                      className="form-control w-100"
                      placeholder="Enter update"
                      type="textarea"
                      name="industryUpdate"
                      value={object?.industryUpdate}
                      onChange={handleChange}
                    ></textarea>
                    <p className="word-limit-info mb-0">Maximum 1500 words</p>

                    <button
                      className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow"
                      onClick={handleUpdateBusinessObjective}
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-check-circle"></i>
                      </span>
                      Save
                    </button>
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
                  Company Updates
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {" "}
                  <div className="d-flex justify-content-between">
                    <label>Company Update</label>

                    <a
                      href="#"
                      className="link-underline-muted decoration-none"
                    >
                      AI Generate
                    </a>
                  </div>
                  <textarea
                    className="form-control w-100"
                    placeholder="Enter update"
                    type="textarea"
                    name="companyUpdate"
                    value={object?.companyUpdate}
                    onChange={handleChange}
                  ></textarea>
                  <p className="word-limit-info mb-0">Maximum 1500 words</p>
                  <button
                    className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow"
                    onClick={handleUpdateBusinessObjective}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    Save
                  </button>
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
                  Assess Strategy Document
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="container upload-table">
                    <div className="file-upload float-end mb-3">
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input hidden visibility-hidden"
                            id="inputGroupFile01"
                            onChange={handleFileChange}
                          />
                          <label
                            className="btn btn-primary p-2 px-3"
                            htmlFor="inputGroupFile01"
                          >
                            <i className="bi bi-upload"></i> Upload Document
                          </label>
                        </div>
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col">Document Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {object?.strategicDocuments?.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <a href="#">{item?.fileName}</a>
                              </td>
                              <td>
                                {/* <i className="fa-eye fa pe-3"></i> */}
                                <i
                                  className="fa fa-trash text-danger f-18 cursor-pointer"
                                  onClick={() => handleDeleteFileItem(item?.id)}
                                ></i>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
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
                    className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow"
                    onClick={handleSaveMinuteMeetings}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/*  */}
            {/* <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed br-8"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive"
                >
                  Document Minutes of Meeting
                </button>
              </h2>
              <div
                id="flush-collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Rich text field to document the meeting of minutes
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Here"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    <p className="word-limit-info mb-0">Maximum 1500 words</p>

                    <button className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow">
                      <span className="btn-label me-2">
                        <i className="fa fa-check-circle"></i>
                      </span>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            {/*  */}
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
                            value={index?.description}
                            onChange={(event) =>
                              handleChangeMapItemDescription(event, item?.id)
                            }
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
                            value={index?.domain}
                            name="mapProcessDomain"
                            onChange={(event) =>
                              handleChangeMapItemDemain(event, item?.id)
                            }
                          >
                            <option>Select</option>
                            <option value="strategic">strategic</option>
                            <option value="operation">operation</option>
                          </select>
                        </div>

                        <button
                          className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow"
                          onClick={handleSaveBusinessObjectiveMapProcess}
                        >
                          <span className="btn-label me-2">
                            <i className="fa fa-check-circle"></i>
                          </span>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow float-end"
            onClick={handleUpdateBusinessObjective}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle"></i>
            </span>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessObjectiveRedirect;
