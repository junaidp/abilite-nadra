import React from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeKickOffRequest } from "../../../../../global-redux/reducers/common/slice";
import MultipleSelect from "./component/select/Select";
import ViewRiskLibraryDialog from "../../../../modals/view-risk-control-matrix-libraray-dialog/index";
import ViewAuditProgramLibraryDialog from "../../../../modals/view-audit-program-library-dialog";
import AuditStepsDialog from "../../../../modals/audit-steps-dialog/index";
import ComplianceCheckListDialog from "../../../../modals/compliance-checklist-dialog/index";

const KickOff = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  React.useEffect(() => {
    dispatch(changeKickOffRequest(""));
  }, []);
  let [showViewLibrary, setShowViewLibrary] = React.useState(false);
  let [showComplianceCheckListDialog, setShowComplianceCheckListDialog] =
    React.useState(false);
  let [viewAuditProgramLibraryDialog, setViewAuditProgramLibraryDialog] =
    React.useState(false);
  let [showAuditStepsDialog, setShowAuditStepsDialog] = React.useState(false);
  return (
    <div>
      {showViewLibrary && (
        <div className="modal-objective-library">
          <div className="model-wrap-library">
            <ViewRiskLibraryDialog setShowViewLibrary={setShowViewLibrary} />
          </div>
        </div>
      )}
      {viewAuditProgramLibraryDialog && (
        <div className="modal-objective-audit-library">
          <div className="model-wrap-audit-library">
            <ViewAuditProgramLibraryDialog
              setViewAuditProgramLibraryDialog={
                setViewAuditProgramLibraryDialog
              }
            />
          </div>
        </div>
      )}
      {showAuditStepsDialog && (
        <div className="modal-objective-audit-steps-library">
          <div className="model-wrap-audit-steps-library">
            <AuditStepsDialog
              setShowAuditStepsDialog={setShowAuditStepsDialog}
            />
          </div>
        </div>
      )}
      {showComplianceCheckListDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <ComplianceCheckListDialog
              setShowComplianceCheckListDialog={
                setShowComplianceCheckListDialog
              }
            />
          </div>
        </div>
      )}

      <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <i
            onClick={() => navigate("/audit/audit-engagement")}
            className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
          ></i>

          <h2 className="mx-2 m-2 heading">Kick Off</h2>
        </div>
      </header>

      <div className="row px-4">
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
                  <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                  Job Name
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="container">
                    <div className="row mb-3" style={{ fontSize: "13px" }}>
                      <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Planned Start Date:</div>
                        <div className="">28-03-2023</div>
                      </div>
                      <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Process</div>
                        <div className="">28-03-2023</div>
                      </div>
                    </div>

                    <div className="row mb-3" style={{ fontSize: "13px" }}>
                      <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Planned End Date:</div>
                        <div className="">28-03-2023</div>
                      </div>
                      <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Sub Process</div>
                        <div className="">28-03-2023</div>
                      </div>
                    </div>

                    <div className="row mb-3" style={{ fontSize: "13px" }}>
                      <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <div className="fw-bold">Job Type:</div>
                        <div className="">Job type will display here</div>
                      </div>
                    </div>

                    <div className="row mb-3" style={{ fontSize: "13px" }}>
                      <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <div className="fw-bold">
                          Department/Division/ Location:
                        </div>
                        <div className="">
                          list of divisions will display here
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3" style={{ fontSize: "13px" }}>
                      <div className="col-lg-6 px-3 d-flex justify-content-between">
                        <div className="fw-bold">
                          Sub-Department/Sub-Division/Sub-Location
                        </div>
                        <div className="">
                          list of department will display here
                        </div>
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
                  Audit Notification
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="container upload-table">
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <div className="d-flex mb-2 align-items-center">
                          <label className="me-3" style={{ width: "80px" }}>
                            To
                          </label>
                          <input
                            className="form-control w-100"
                            placeholder="Enter Email"
                            type="text"
                          />
                        </div>
                        <div className="d-flex mb-2  align-items-center">
                          <label className="me-3" style={{ width: "80px" }}>
                            CC
                          </label>
                          <input
                            className="form-control w-100"
                            placeholder="Enter Email"
                            type="text"
                          />
                        </div>
                        <div className="d-flex mb-2  align-items-center">
                          <label className="me-3" style={{ width: "80px" }}>
                            Subject
                          </label>
                          <input
                            className="form-control w-100"
                            placeholder="Enter Subject"
                            type="text"
                          />
                        </div>
                        <div className="d-flex mb-2  align-items-center">
                          <label
                            className="me-3"
                            style={{ width: "80px" }}
                          ></label>
                          <textarea
                            className="form-control"
                            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                            id="exampleFormControlT"
                            rows="15"
                          ></textarea>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="ms-5 ps-5">
                            <label htmlFor="fileInput">Add Attachment:</label>
                            <input
                              className="ms-3"
                              style={{ fontSize: "10px" }}
                              type="file"
                              id="fileInput"
                            />
                          </div>
                          <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                            <span className="btn-label me-2">
                              <i className="fa fa-share"></i>
                            </span>
                            Send
                          </button>
                        </div>
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
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Raise Information Request
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 text-end">
                        <button className="btn btn-labeled btn-primary px-3 mb-3 shadow">
                          <span className="btn-label me-2">
                            <i className="fa fa-check-circle"></i>
                          </span>
                          Raise Request
                        </button>
                      </div>
                    </div>
                    <div className="row mb-3 ">
                      <div className="col-lg-6">
                        <div className="select-auditee">
                          <MultipleSelect />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label className="w-100">Due Date</label>
                        <input
                          className="form-control w-100"
                          placeholder="Select Date"
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <label>1. Add a Question</label>
                          <i className="fa fa-trash text-danger"></i>
                        </div>
                        <textarea
                          className="form-control"
                          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                        <label className="word-limit-info label-text">
                          Maximum 1500 words
                        </label>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Required
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex align-items-center">
                          <label className="me-3 w-25">
                            Get it in a form of:
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option>Text</option>
                            <option value="2">Attachment</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <label>Your Response:</label>
                          <i className="fa fa-trash text-danger"></i>
                        </div>
                        <textarea
                          className="form-control"
                          placeholder="Enter Response"
                          rows="3"
                        ></textarea>
                        <label className="word-limit-info label-text">
                          Maximum 1500 words
                        </label>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label me-3 mb-3"
                        >
                          Attach files
                        </label>

                        <input
                          type="file"
                          id="file-upload"
                          name="file-upload"
                        />

                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="sr-col">Sr No.</th>
                                <th>Attach Files </th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <a href="#">
                                    Loram File will be displayed here
                                  </a>
                                </td>

                                <td style={{ fontSize: "130px" }}>
                                  <i className="fa fa-eye text-primary"></i>
                                  <i className="fa fa-edit mx-3 text-secondary"></i>
                                  <i className="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  Risk Control Matrix
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="container">
                    <div className="row mb-2">
                      <div className="col-lg-12">
                        <button
                          className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow"
                          onClick={() => setShowViewLibrary(true)}
                        >
                          <span className="btn-label me-2">
                            <i className="fa fa-eye"></i>
                          </span>
                          View Library
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                          <span>Objective</span>
                          <a href="" className="text-white add-btn">
                            <span
                              className="float-end"
                              style={{ fontSize: "10px" }}
                            >
                              <i className="fa fa-plus me-2"></i>Add Objective
                            </span>
                          </a>
                        </p>

                        <div className="card p-3 w-100 shadow-sm border ">
                          <div className="d-flex mb-2 justify-content-between align-items-center">
                            <span className="fw-bold">0.1</span>
                            <div className="d-flex align-items-center">
                              <select
                                className="form-select me-3"
                                aria-label="Default select example"
                              >
                                <option>High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                              </select>

                              <i className="fa fa-window-close text-danger mb-1 text-end"></i>
                            </div>
                          </div>

                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                          <span>Risk</span>
                          <a href="" className="text-white add-btn">
                            <span
                              className="float-end"
                              style={{ fontSize: "10px" }}
                            >
                              <i className="fa fa-plus me-2"></i>Add Risk
                            </span>
                          </a>
                        </p>

                        <div className="card p-3 mb-3 w-100 shadow-sm border ">
                          <div className="d-flex mb-2 justify-content-between align-items-center">
                            <span className="fw-bold">Risk Rating</span>
                            <div className="d-flex align-items-center">
                              <select
                                className="form-select me-3"
                                aria-label="Default select example"
                              >
                                <option>High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                              </select>

                              <i className="fa fa-window-close text-danger mb-1 text-end"></i>
                            </div>
                          </div>

                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                          </p>
                        </div>

                        <div className="card p-3 w-100 shadow-sm border ">
                          <div className="d-flex mb-2 justify-content-between align-items-center">
                            <span className="fw-bold">Risk Rating</span>
                            <div className="d-flex align-items-center">
                              <select
                                className="form-select me-3"
                                aria-label="Default select example"
                              >
                                <option>High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                              </select>

                              <i className="fa fa-window-close text-danger mb-1 text-end"></i>
                            </div>
                          </div>

                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                          <span>Controls</span>
                          <a href="" className="text-white add-btn">
                            <span
                              className="float-end"
                              style={{ fontSize: "10px" }}
                            >
                              <i className="fa fa-plus me-2"></i>Add Control
                            </span>
                          </a>
                        </p>

                        <div className="card p-3 mb-3 w-100 shadow-sm border ">
                          <div className="d-flex mb-2 justify-content-between align-items-center">
                            <span className="fw-bold">Control Risk</span>
                            <div className="d-flex align-items-center">
                              <select
                                className="form-select me-3"
                                aria-label="Default select example"
                              >
                                <option>High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                              </select>

                              <i className="fa fa-window-close text-danger mb-1 text-end"></i>
                            </div>
                          </div>

                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                          </p>
                        </div>
                        <div className="card p-3 mb-3 w-100 shadow-sm border ">
                          <div className="d-flex mb-2 justify-content-between align-items-center">
                            <span className="fw-bold">Control Risk</span>
                            <div className="d-flex align-items-center">
                              <select
                                className="form-select me-3"
                                aria-label="Default select example"
                              >
                                <option>High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                              </select>

                              <i className="fa fa-window-close text-danger mb-1 text-end"></i>
                            </div>
                          </div>

                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span className="btn-label me-2">
                            <i className="fa fa-print"></i>
                          </span>
                          Print
                        </button>
                        <button className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow">
                          <span className="btn-label me-2">
                            <i className="fa fa-save"></i>
                          </span>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  style={{ borderRadius: "8px" }}
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive"
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      Audit Program
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id="flush-collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="container">
                    <div className="row mb-2">
                      <div className="col-lg-12">
                        <button
                          className="btn btn-labeled btn-primary px-3 mt-3 shadow"
                          onClick={() => setViewAuditProgramLibraryDialog(true)}
                        >
                          <span className="btn-label me-2">
                            <i className="fa fa-eye"></i>
                          </span>
                          View Library
                        </button>
                        <button className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow">
                          <span className="btn-label me-2">
                            <i className="fa fa-eye"></i>
                          </span>
                          Add Audit Program
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead>
                              <tr>
                                <th>Sr. #</th>
                                <th>Controls</th>
                                <th>Rating</th>
                                <th>Program</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                                    id="exampleFormControlT"
                                    rows="3"
                                  ></textarea>
                                </td>
                                <td>High</td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                                    id="exampleFormControlT"
                                    rows="3"
                                  ></textarea>
                                  <button className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow">
                                    <span className="btn-label me-2">
                                      <i className="fa fa-plus"></i>
                                    </span>
                                    Add program
                                  </button>
                                </td>
                                <td>
                                  <span className="action-buttons">
                                    <i
                                      className="bi bi-trash danger"
                                      style={{
                                        fontSize: "20px",
                                        marginRight: "10px",
                                        color: "red",
                                      }}
                                    ></i>
                                  </span>
                                  <span className="action-buttons">
                                    <i
                                      className="bi bi-x-circle-fill"
                                      style={{
                                        fontSize: "20px",
                                        marginRight: "10px",
                                      }}
                                    ></i>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 text-end">
                        <button className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow">
                          <span className="btn-label me-2">
                            <i className="fa fa-save"></i>
                          </span>
                          Save
                        </button>
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
                  data-bs-target="#flush-collapseSix"
                  aria-expanded="false"
                  aria-controls="flush-collapseSix"
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      Audit Steps
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
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th style={{ fontSize: "80px" }}>Sr No.</th>
                                <th>Program Name</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <a
                                    onClick={() =>
                                      setShowAuditStepsDialog(true)
                                    }
                                    className="fw-bold  text-primary  px-3 py-1"
                                    style={{ fontSize: "10px" }}
                                  >
                                    loram ipsum is simply dummay text of the
                                    prinitng and type settings industry
                                  </a>{" "}
                                </td>
                                <td>
                                  <i className="fa fa-times-circle text-danger"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>
                                  <a
                                    onClick={() =>
                                      setShowAuditStepsDialog(true)
                                    }
                                    className="fw-bold  text-primary  px-3 py-1"
                                    style={{ fontSize: "10px" }}
                                  >
                                    loram ipsum is simply dummay text of the
                                    prinitng and type settings industry
                                  </a>
                                </td>
                                <td>
                                  <i className="fa fa-check-circle text-success"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingeight">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseSeven"
                  aria-expanded="false"
                  aria-controls="flush-collapseSeven"
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      Compliance Checklist
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id="flush-collapseSeven"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th style={{ fontSize: "80px" }}>Sr No.</th>
                                <th>Location Name</th>
                                <th>Status</th>
                                <th>Change Request</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <a
                                    className="fw-bold  text-primary  px-3 py-1"
                                    style={{ fontSize: "10px" }}
                                  >
                                    Location Name 1
                                  </a>
                                </td>
                                <td>Kickoff</td>
                                <td>Postponed</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>
                                  <a
                                    className="fw-bold  text-primary px-3 py-1"
                                    style={{ fontSize: "10px" }}
                                  >
                                    Location Name 2
                                  </a>
                                </td>
                                <td>Postponed</td>
                                <td>Cancelled</td>
                              </tr>
                            </tbody>
                          </table>
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
    </div>
  );
};

export default KickOff;
