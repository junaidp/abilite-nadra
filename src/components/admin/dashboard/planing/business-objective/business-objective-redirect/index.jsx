import React from "react";
import TopBar from "../../../../../common/top-bar/TopBar";
import Sidebar from "../../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ObjectiveListDialog from "../../../../../modals/objective-list-dialog/index";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BusinessObjectiveRedirect = () => {
  let navigate = useNavigate();
  let { showSidebar } = useSelector((state) => state.common);
  let [domain, setDomain] = React.useState("");
  let [showObjectiveListDialog, setShowObjectiveListDialog] =
    React.useState(false);
  function handleClose() {
    setShowObjectiveListDialog(false);
  }
  return (
    <div>
      <Dialog open={showObjectiveListDialog} onClose={handleClose}>
        <ObjectiveListDialog
          setShowObjectiveListDialog={setShowObjectiveListDialog}
        />
      </Dialog>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
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
                            className="link-underline-muted"
                            style={{ textDecoration: "none" }}
                          >
                            AI Generate
                          </a>
                        </div>
                        <textarea
                          className="form-control w-100"
                          placeholder="Enter update"
                          type="textarea"
                        ></textarea>
                        <p className="word-limit-info mb-0">
                          Maximum 1500 words
                        </p>

                        <button className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow">
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
                          className="link-underline-muted"
                          style={{ textDecoration: "none" }}
                        >
                          AI Generate
                        </a>
                      </div>
                      <textarea
                        className="form-control w-100"
                        placeholder="Enter update"
                        type="textarea"
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
                                className="custom-file-input hidden "
                                id="inputGroupFile01"
                                style={{ visibility: "hidden" }}
                              />
                              <label
                                className="btn btn-primary p-2 px-3"
                                for="inputGroupFile01"
                              >
                                <i class="bi bi-upload"></i> Upload Document
                              </label>
                            </div>
                          </div>
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Sr No.</th>
                              <th scope="col">Documents</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <a href="#">Detail Document loram</a>
                              </td>
                              <td>
                                <i className="fa-eye fa pe-3"></i>
                                <i className="fa fa-trash text-danger"></i>
                              </td>
                            </tr>
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
                          <label>Select Department</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>List of Department</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <label className="w-100">Meeting Date</label>
                          <input
                            className="form-control w-100"
                            placeholder="Select Date"
                            type="date"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <label className="w-100">From</label>
                          <input
                            className="form-control w-100"
                            placeholder="Select Date"
                            type="time"
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="w-100">To</label>
                          <input
                            className="form-control w-100"
                            placeholder="Select Date"
                            type="time"
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
                {/*  */}
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
                          for="exampleFormControlTextarea1"
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
                        <p className="word-limit-info mb-0">
                          Maximum 1500 words
                        </p>

                        <button className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow">
                          <span className="btn-label me-2">
                            <i className="fa fa-check-circle"></i>
                          </span>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="my-4 sub-heading"></div>
                <header className="section-header my-3 align-items-center text-start d-flex">
                  <div className="mb-0 sub-heading">
                    Define Business Objective and Map Process
                  </div>
                  <div className="btn btn-labeled btn-primary ms-3 px-3 shadow">
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
                    className="fa fa-info-circle ps-3 text-secondary"
                    style={{ cursor: "pointer" }}
                  ></i>
                </header>

                {/*  */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      style={{ borderRadius: "8px" }}
                      className="accordion-button collapsed"
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

                        <i className="fa fa-trash text-danger"></i>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseSix"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="mb-3 w-100">
                        <label
                          for="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Business Objective
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Enter Here"
                          id="ds"
                          rows="3"
                        ></textarea>
                        <p className="word-limit-info mb-0">
                          Maximum 1500 words
                        </p>
                      </div>

                      <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Select Domain
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>strategic</MenuItem>
                          <MenuItem value={20}>operation</MenuItem>
                        </Select>
                      </FormControl>

                      <button className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow">
                        <span className="btn-label me-2">
                          <i className="fa fa-check-circle"></i>
                        </span>
                        Save
                      </button>
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

export default BusinessObjectiveRedirect;
