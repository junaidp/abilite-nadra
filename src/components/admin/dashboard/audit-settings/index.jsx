import React from "react";
import TopBar from "../../../common/top-bar/TopBar";
import Sidebar from "../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { changeUserLoggedIn } from "../../../../global-redux/reducers/auth/slice";
import { useDispatch } from "react-redux";
const AuditSettings = () => {
  let { showSidebar } = useSelector((state) => state.common);
  let dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeUserLoggedIn(false));
  }, []);
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <div class="card p-3 shadow-sm setting-tab">
            <h2 class="text-center heading p-3">Settings</h2>

            <div class="row">
              <div class="col-lg-2">
                <nav class="mt-4" style={{ paddingBottom: "10px" }}>
                  <div
                    class="nav d-grid nav-tabs glass-effect border-0"
                    id="nav-tab"
                    role="tablist"
                  >
                    <button
                      class="nav-link active  border-0 shadow-sm mb-3  rounded-0 me-3 "
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Supporting Doc
                    </button>
                    <button
                      class="nav-link shadow-sm  border-0 mb-3  rounded-0  me-3 "
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Location
                    </button>
                    <button
                      class="nav-link shadow-sm border-0 mb-3  rounded-0 me-3 "
                      id="nav-risk-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-risk"
                      type="button"
                      role="tab"
                      aria-controls="nav-risk"
                      aria-selected="false"
                    >
                      Risk Factor
                    </button>
                    <button
                      class="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                      id="nav-email-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-email"
                      type="button"
                      role="tab"
                      aria-controls="nav-email"
                      aria-selected="false"
                    >
                      Email
                    </button>
                    <button
                      class="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                      id="nav-check-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-check"
                      type="button"
                      role="tab"
                      aria-controls="nav-check"
                      aria-selected="false"
                    >
                      Checklist Management
                    </button>
                    <button
                      class="nav-link shadow-sm  border-0 mb-3   rounded-0 me-3 "
                      id="nav-noti-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-noti"
                      type="button"
                      role="tab"
                      aria-controls="nav-noti"
                      aria-selected="false"
                    >
                      Notification
                    </button>
                    <button
                      class="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                      id="nav-user-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-user"
                      type="button"
                      role="tab"
                      aria-controls="nav-user"
                      aria-selected="false"
                    >
                      User Management
                    </button>
                    <button
                      class="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                      id="nav-mod-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-mod"
                      type="button"
                      role="tab"
                      aria-controls="nav-mod"
                      aria-selected="false"
                    >
                      Modules
                    </button>
                    <button
                      class="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                      id="nav-com-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-com"
                      type="button"
                      role="tab"
                      aria-controls="nav-com"
                      aria-selected="false"
                    >
                      Company Management
                    </button>
                  </div>
                </nav>
              </div>

              <div class="col-lg-10">
                <div
                  class="tab-content p-3 mt-4 border bg-light"
                  id="nav-tabContent"
                >
                  <div
                    class="tab-pane fade active show"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div class="row my-3">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">
                          Supporting Documents
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-6">
                        <label class="w-100">Enter File Name:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Enter"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="row position-relative">
                      <div class="col-lg-12 text-center settings-form">
                        <form action="upload.php" method="POST">
                          <input type="file" multiple />
                          <p class="mb-0">
                            Drag your files here or click in this area.
                          </p>
                        </form>
                      </div>
                    </div>
                    <div class="row my-3">
                      <div class="col-lg-12 text-end">
                        <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-save"></i>
                          </span>
                          Submit
                        </button>
                      </div>
                    </div>

                    <div class="row my-3">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table class="table table-bordered  table-hover rounded">
                            <thead class="bg-secondary text-white">
                              <tr>
                                <th style={{ width: "80px" }}>Sr No.</th>
                                <th>Particulars</th>
                                <th style={{ width: "180px" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>File Name here</td>
                                <td>
                                  <i class="fa-eye fa "></i>

                                  <i class="fa fa-trash text-danger   px-3"></i>

                                  <i class="fa fa-download"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>File Name here</td>
                                <td>
                                  <i class="fa-eye fa "></i>

                                  <i class="fa fa-trash text-danger  px-3"></i>

                                  <i class="fa fa-download "></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">
                          Location & Departments Management
                        </div>
                        <label class="fw-light">
                          Create and manage your dropdown list for your
                          organisation Location Division / Department
                        </label>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-6">
                        <label>Department/Division/ Location:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Enter Text here"
                          type="text"
                        />
                      </div>
                      <div class="col-lg-6 text-end float-end align-self-end">
                        <div class="btn btn-labeled btn-primary px-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-plus"></i>
                          </span>
                          Add New Section
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <div class="accordion" id="accordionFlushExample">
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingeight">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                              >
                                <div class="d-flex w-100 me-3 align-items-center justify-content-between">
                                  <div class=" d-flex align-items-center">
                                    1. Show Department/Division/ Location
                                  </div>
                                </div>
                              </button>
                            </h2>
                            <div
                               id="flush-collapseOne"
                               className="accordion-collapse collapse"
                               data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body">
                                <div class="row mb-3">
                                  <div class="col-lg-12 text-end">
                                    <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                                      <span class="btn-label me-2">
                                        <i class="fa fa-plus"></i>
                                      </span>
                                      Add
                                    </button>
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="col-lg-12">
                                    <div class="table-responsive">
                                      <table class="table table-bordered  table-hover rounded">
                                        <thead class="bg-secondary text-white">
                                          <tr>
                                            <th style={{ width: "80px" }}>
                                              Sr No.
                                            </th>
                                            <th>Particulars</th>
                                            <th>Actions</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>1</td>
                                            <td>
                                              Show
                                              Sub-Department/Sub-Division/Sub-Location
                                            </td>
                                            <td>
                                              <i class="fa fa-edit  px-3"></i>

                                              <i class="fa fa-trash text-danger"></i>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>2</td>
                                            <td>
                                              Show
                                              Sub-Department/Sub-Division/Sub-Location
                                            </td>
                                            <td>
                                              <i class="fa fa-edit  px-3"></i>

                                              <i class="fa fa-trash text-danger"></i>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>

                                <div class="row my-3">
                                  <div class="col-lg-12 text-end">
                                    <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                                      <span class="btn-label me-2">
                                        <i class="fa fa-save"></i>
                                      </span>
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingeightt">
                              <button
                               className="accordion-button collapsed"
                               type="button"
                               data-bs-toggle="collapse"
                               data-bs-target="#flush-collapseTwo"
                               aria-expanded="false"
                               aria-controls="flush-collapseTwo"
                              >
                                <div class="d-flex w-100 me-3 align-items-center justify-content-between">
                                  <div class=" d-flex align-items-center">
                                    2. Show Department/Division/ Location
                                  </div>
                                </div>
                              </button>
                            </h2>
                            <div
                               id="flush-collapseTwo"
                               className="accordion-collapse collapse"
                               data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body">
                                <div class="row mb-3">
                                  <div class="col-lg-12 text-end">
                                    <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                                      <span class="btn-label me-2">
                                        <i class="fa fa-plus"></i>
                                      </span>
                                      Add
                                    </button>
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="col-lg-12">
                                    <div class="table-responsive">
                                      <table class="table table-bordered  table-hover rounded">
                                        <thead class="bg-secondary text-white">
                                          <tr>
                                            <th style={{ width: "80px" }}>
                                              Sr No.
                                            </th>
                                            <th>Particulars</th>
                                            <th>Actions</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>1</td>
                                            <td>
                                              Show
                                              Sub-Department/Sub-Division/Sub-Location
                                            </td>
                                            <td>
                                              <i class="fa fa-edit  px-3"></i>

                                              <i class="fa fa-trash text-danger"></i>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>2</td>
                                            <td>
                                              Show
                                              Sub-Department/Sub-Division/Sub-Location
                                            </td>
                                            <td>
                                              <i class="fa fa-edit  px-3"></i>

                                              <i class="fa fa-trash text-danger"></i>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>

                                <div class="row my-3">
                                  <div class="col-lg-12 text-end">
                                    <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                                      <span class="btn-label me-2">
                                        <i class="fa fa-save"></i>
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

                    <div class="row mb-3">
                      <div class="col-lg-12 text-end">
                        <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-print"></i>
                          </span>
                          print
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-risk"
                    role="tabpanel"
                    aria-labelledby="nav-risk-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">Risk Factor</div>
                        <label class="fw-light">
                          Define list of Risk factors here for Risk Factor
                          approach at Universe Level Risk Assessment{" "}
                        </label>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-6">
                        <label>Add New Risk Factor:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Enter Text here"
                          type="text"
                        />
                      </div>
                      <div class="col-lg-3  align-self-end">
                        <div class="btn btn-labeled btn-primary px-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-save"></i>
                          </span>
                          Save
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table class="table table-bordered  table-hover rounded">
                            <thead class="bg-secondary text-white">
                              <tr>
                                <th style={{ width: "80px" }}>Sr No.</th>
                                <th>Particulars</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  Show Sub-Department/Sub-Division/Sub-Location
                                </td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>
                                  Show Sub-Department/Sub-Division/Sub-Location
                                </td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-12 text-end">
                        <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-save"></i>
                          </span>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-email"
                    role="tabpanel"
                    aria-labelledby="nav-email-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">Email</div>
                        <label class="fw-light">
                          Define your email template here
                        </label>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <textarea
                          class="form-control"
                          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                          id="exampleFormControlT"
                          rows="15"
                        ></textarea>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <div class="col-lg-6 text-end float-end align-self-end">
                          <div class="btn btn-labeled btn-primary px-3 shadow">
                            <span class="btn-label me-2">
                              <i class="fa fa-save"></i>
                            </span>
                            Save
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-check"
                    role="tabpanel"
                    aria-labelledby="nav-check-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">
                          Checklist Management
                        </div>
                        <label class="fw-light">
                          Create and manage your dropdown list for your
                          organisation Location Division / Department
                        </label>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-6">
                        <label>Checklist Name:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Enter Text here"
                          type="text"
                        />
                      </div>
                      <div class="col-lg-3  align-self-end">
                        <div class="btn btn-labeled btn-primary px-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-plus"></i>
                          </span>
                          Add
                        </div>
                      </div>
                    </div>

                    <div class="border mt-3 rounded bg-white p-3 shadow-sm">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="sub-heading  fw-bold">
                            1. Name of Checklist will show here
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-6">
                          <label>
                            Would you like to keep Standard Observation?
                          </label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Yes</option>
                            <option value="2">No</option>
                          </select>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-6">
                          <label>Bulk Upload:</label>
                          <label for="fileInput">Add Attachment:</label>
                          <input
                            class="ms-3"
                            style={{ fontSize: "10px" }}
                            type="file"
                            id="fileInput"
                          />
                        </div>
                        <div class="col-lg-6 float-end text-end  align-self-end">
                          <div class="btn btn-labeled btn-primary px-3 shadow">
                            <span class="btn-label me-2">
                              <i class="fa fa-download"></i>
                            </span>
                            Download Template
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-12 float-end text-end  align-self-end">
                          <div class="btn btn-labeled btn-primary px-3 shadow">
                            <span class="btn-label me-2">
                              <i class="fa fa-plus"></i>
                            </span>
                            Add
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table class="table table-bordered  table-hover rounded">
                            <thead class="bg-secondary text-white">
                              <tr>
                                <th style={{ width: "80px" }}>Sr No.</th>
                                <th>Area</th>
                                <th>Subject</th>
                                <th>Particulars</th>
                                <th>Observation</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-12 text-end">
                        <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-print"></i>
                          </span>
                          print
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-noti"
                    role="tabpanel"
                    aria-labelledby="nav-noti-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">Notifications</div>
                        <label class="fw-light">
                          Manage your notifications from here
                        </label>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-6">
                        <label>Department/Division/ Location:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Enter Text here"
                          type="text"
                        />
                      </div>
                      <div class="col-lg-6 text-end float-end align-self-end">
                        <div class="btn btn-labeled btn-primary px-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-plus"></i>
                          </span>
                          Add New Section
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table class="table table-bordered  table-hover rounded">
                            <thead class="bg-secondary text-white">
                              <tr>
                                <th style={{ width: "80px" }}>Sr No.</th>
                                <th>Enable all Notification</th>
                                <th>Email Notification</th>
                                <th>System Notification</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>On Login</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>User Creation</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Password recovery</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Forget password</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>5</td>
                                <td>On meeting request</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>6</td>
                                <td>Audit Plan Submitted for approval</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>7</td>
                                <td>Audit Plan Approved</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>8</td>
                                <td>On job assignment</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>9</td>
                                <td>Job change request</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>10</td>
                                <td>Job change request Approved</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>11</td>
                                <td>Checklist Change request</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>12</td>
                                <td>Checklist Change request Approved</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>13</td>
                                <td>Job due for Kick-off in a week</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>14</td>
                                <td>Audit Notification</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>15</td>
                                <td>On Information request</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>16</td>
                                <td>Risk Control Matrix Submission</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>17</td>
                                <td>Risk Control Matrix Approval</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>18</td>
                                <td>Audit Program Submission</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>19</td>
                                <td>Audit Program Approval</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>20</td>
                                <td>Management comments received</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>21</td>
                                <td>Management comments sent</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>22</td>
                                <td>Management comments due</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>23</td>
                                <td>Exceptions due for implementation</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>24</td>
                                <td>Exceptions Implemented</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>25</td>
                                <td>Exceptions date change request</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>26</td>
                                <td>Job complete</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>27</td>
                                <td>Audit Plan report - draft received</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>28</td>
                                <td>Audit Plan report - Feedback Issued</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>29</td>
                                <td>Audit Plan report - Feedback Received</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>30</td>
                                <td>Audit Plan report Approved</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>31</td>
                                <td>Internal Audit Report - Draft Received</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>32</td>
                                <td>Internal Audit Report - Feedback Issued</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>33</td>
                                <td>
                                  Internal Audit Report - Feedback Received
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>34</td>
                                <td>Internal Audit Report Approved</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>35</td>
                                <td>
                                  Weekly Reminder for Job List in Follow-up
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>36</td>
                                <td>
                                  Fortnightly Reminder for Job List in Follow-up
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>37</td>
                                <td>Task allocation</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>38</td>
                                <td>Task Received</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>39</td>
                                <td>Task due date</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>40</td>
                                <td>Raise information request</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>41</td>
                                <td>Receive information request</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>42</td>
                                <td>Information request due</td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-user"
                    role="tabpanel"
                    aria-labelledby="nav-user-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">User Management</div>
                      </div>
                    </div>

                    <div class="row my-3">
                      <div class="col-lg-4">
                        <label>Fiscal Year:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Enter Text here"
                          type="date"
                        />
                      </div>
                      <div class="col-lg-4">
                        <label>End Year:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Enter Text here"
                          type="date"
                        />
                      </div>
                      <div class="col-lg-4 text-end float-end align-self-end">
                        <div class="btn btn-labeled btn-primary px-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-plus"></i>
                          </span>
                          Add New
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table class="table table-bordered  table-hover rounded">
                            <thead class="bg-secondary text-white">
                              <tr>
                                <th style={{ width: "80px" }}>Sr No.</th>
                                <th>Username</th>
                                <th>Designation</th>
                                <th>Email ID</th>
                                <th>Skill Set</th>
                                <th>Role</th>
                                <th>Reporting To</th>
                                <th>Department</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-12 text-end">
                        <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-save"></i>
                          </span>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-mod"
                    role="tabpanel"
                    aria-labelledby="nav-mod-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">
                          Modules Management
                        </div>
                        <label class="fw-light">Super Admin view</label>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table class="table table-bordered  table-hover rounded">
                            <thead class="bg-secondary text-white">
                              <tr>
                                <th style={{ width: "80px" }}>Sr No.</th>
                                <th>Name of Company</th>
                                <th>Audit Planning & Scheduling</th>
                                <th>Audit Engagement</th>
                                <th>Compliance Checklist</th>
                                <th>RCM Library</th>
                                <th>Reporting & Follow-up</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>xxxxxxxxxx</td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>xxxxxxxxxx</td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                                <td class="checkbox-cell">
                                  <input type="checkbox" class="checkbox" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-12 text-end">
                        <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-save"></i>
                          </span>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-com"
                    role="tabpanel"
                    aria-labelledby="nav-com-tab"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="sub-heading  fw-bold">
                          Company Management
                        </div>
                        <label class="fw-light">Super user setting</label>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-6">
                        <label>Search Company:</label>
                        <input
                          class="form-control w-100"
                          placeholder="Search Company here"
                          type="text"
                        />
                      </div>
                      <div class="col-lg-6 text-end float-end align-self-end">
                        <div class="btn btn-labeled btn-primary px-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-plus"></i>
                          </span>
                          Add New
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12">
                        <div class="table-responsive overflow-x-auto">
                          <table class="table table-bordered overflow-x-auto table-hover rounded">
                            <thead class="bg-secondary text-white">
                              <tr>
                                <th style={{ minWidth: "50px" }}>Sr No.</th>
                                <th style={{ width: "130px" }}>Company Name</th>
                                <th style={{ width: "100px" }}>Company ID</th>
                                <th style={{ width: "100px" }}>Email ID</th>
                                <th style={{ width: "190px" }}>
                                  Contact Person Name
                                </th>
                                <th style={{ width: "190px" }}>
                                  Contact Person No.
                                </th>
                                <th style={{ minWidth: "50px" }}>Role</th>
                                <th style={{ width: "180px" }}>
                                  Fiscal Year From:
                                </th>
                                <th style={{ width: "180px" }}>
                                  Fiscal Year To:
                                </th>
                                <th>No. of Users</th>
                                <th>Management Accounts</th>
                                <th>Modules Management</th>
                                <th>Company Status</th>
                                <th>Package</th>
                                <th style={{ width: "80px" }}>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>xxxxxxxx</td>
                                <td>+9209078601</td>
                                <td>Admin</td>
                                <td class="highlight-orange">DD:MM:YYYY</td>
                                <td class="highlight-orange">DD:MM:YYYY</td>
                                <td>12</td>
                                <td>12</td>
                                <td class="highlight-yellow"></td>
                                <td>
                                  <select
                                    class="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option selected>Active</option>
                                    <option value="1">Deactive</option>
                                    <option value="2">Remove</option>
                                  </select>
                                </td>
                                <td>
                                  <select
                                    class="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option value="1">Trial</option>

                                    <option selected>Standard</option>
                                    <option value="2">Premium</option>
                                  </select>
                                </td>
                                <td>
                                  <i class="fa fa-edit  px-3"></i>

                                  <i class="fa fa-trash text-danger"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-12 text-end">
                        <button class="btn btn-labeled btn-primary px-3 mt-3 shadow">
                          <span class="btn-label me-2">
                            <i class="fa fa-save"></i>
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
    </div>
  );
};

export default AuditSettings;
