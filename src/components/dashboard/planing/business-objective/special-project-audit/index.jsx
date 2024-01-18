import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import ObjectiveListDialog from "../../../../modals/objective-list-dialog/index";
import Dialog from "@mui/material/Dialog";
import { setupSaveSpecialProjectAudit } from "../../../../../global-redux/reducers/planing/engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SpecialProjectAudit = () => {
  const [showObjectiveListDialog, setShowObjectiveListDialog] =
    React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const { allEngagements } = useSelector((state) => state.planingEngagements);
  const dispatch = useDispatch();
  const [object, setObject] = React.useState({
    description: "",
    domain: "",
    meetingDateTimeFrom: "",
    meetingDateTimeTo: "",
    mapProcessDescription: "",
    mapProcessDomain: "",
    businessObjectiveAndMapProcessList: [],
  });

  function handleSaveAll() {
    const engagement = allEngagements.find(
      (item) => item?.id === Number(engagementId)
    );
    dispatch(
      setupSaveSpecialProjectAudit({
        description: object?.description,
        domain: object?.domain,
        specialProjectOrAudit: {
          meetingScheduleAndMinutes: {
            meetingDateTimeFrom: object?.meetingDateTimeFrom,
            meetingDateTimeTo: object?.meetingDateTimeTo,
          },
          businessObjectiveAndMapProcessList:
            object?.businessObjectiveAndMapProcessList,
          engagement: engagement,
        },
      })
    );
  }

  function handleMapProcessSave() {
    if (object?.mapProcessDomain && object?.mapProcessDescription) {
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

      setTimeout(() => {
        setObject((pre) => {
          return {
            ...pre,
            mapProcessDomain: "",
            mapProcessDescription: "",
          };
        });
      }, 1000);
    }
  }
  const navigate = useNavigate();
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

  function handleDeleteMapItem(id) {
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
        <div>
          <div className="mb-4 col-lg-12">
            <div className="col-lg-2 label-text w-100 mb-2">Description</div>
            <div className="col-lg-12">
              <div className="form-group">
                <input
                  type="text"
                  id="description"
                  value={object?.description}
                  onChange={handleChange}
                  name="description"
                  className="form-control h-40"
                  placeholder="Enter"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 col-lg-12">
            <div className="col-lg-2 label-text mb-2">Domain</div>
            <div className="col-lg-12">
              <div className="form-group">
                <input
                  type="text"
                  id="domain"
                  value={object?.domain}
                  onChange={handleChange}
                  name="domain"
                  className="form-control h-40"
                  placeholder="Enter"
                />
              </div>
            </div>
          </div>
        </div>
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

                  <button className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow">
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="my-4 sub-heading"></div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed br-8"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseSix"
                  aria-expanded="false"
                  aria-controls="flush-collapseSix"
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
                id="flush-collapseSix"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Description</th>
                        <th scope="col">Domain</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {object?.businessObjectiveAndMapProcessList?.map(
                        (item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <a href="#">{item?.description}</a>
                              </td>
                              <td>
                                <a href="#">{item?.domain}</a>
                              </td>
                              <td>
                                {/* <i className="fa-eye fa pe-3"></i> */}
                                <i
                                  className="fa fa-trash text-danger f-18 cursor-pointer"
                                  onClick={() => handleDeleteMapItem(item?.id)}
                                ></i>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
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
                      value={object?.mapProcessDescription}
                      onChange={handleChange}
                    ></textarea>
                    <p className="word-limit-info mb-0">Maximum 1500 words</p>
                  </div>

                  <div className="col-lg-12">
                    <label> Select Domain</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={object?.mapProcessDomain}
                      name="mapProcessDomain"
                      onChange={handleChange}
                    >
                      <option value="strategic">strategic</option>
                      <option value="operation">operation</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow"
                    onClick={handleMapProcessSave}
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
          <button
            className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow float-end"
            onClick={handleSaveAll}
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

export default SpecialProjectAudit;
