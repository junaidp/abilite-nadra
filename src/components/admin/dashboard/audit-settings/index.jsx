import React from "react";
import TopBar from "../../../common/top-bar/TopBar";
import Sidebar from "../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { changeUserLoggedIn } from "../../../../global-redux/reducers/auth/slice";
import { useDispatch } from "react-redux";
const AuditSettings = () => {
  let { showSidebar } = useSelector((state) => state.common);
  let [activeTab,setActiveTab]=React.useState("supportingDoc")
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
          <div className="card p-3 shadow-sm setting-tab">
            <h2 className="text-center heading p-3">Settings</h2>
            <nav style={{ borderBottom: "1px solid #c7c7c7", padding: "10px" }}>
              <div
                className="nav settings-nav-tabs glass-effect border-0"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`nav-link active shadow-sm  rounded-0 me-3 ${activeTab==="supportingDoc" && "active-settings-btn"}`}
                  id="nav-home-tab"
                  style={{ width: "200px" }}
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={()=>setActiveTab("supportingDoc")}
                >
                  Supporting Doc
                </button>
                <button
                  className={`nav-link shadow-sm  rounded-0 ${activeTab==="location" && "active-settings-btn"}`}
                  id="nav-profile-tab"
                  style={{ width: "200px" }}
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={()=>setActiveTab("location")}
                >
                  Location
                </button>
              </div>
            </nav>
            <div
              className="tab-content p-3 mt-4 border bg-light"
              id="nav-tabContent"
            >
              <div
                className="tab-pane fade active show"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="row my-3" >
                  <div className="col-lg-12">
                    <div className="sub-heading  fw-bold">
                      Supporting Documents
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-lg-6">
                    <label className="w-100">Enter File Name:</label>
                    <input
                      className="form-control w-100"
                      placeholder="Enter"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row position-relative">
                  <div className="col-lg-12 text-center">
                    <form
                      action="upload.php"
                      method="POST"
                      className="settings-form"
                    >
                      <input type="file" multiple />
                      <p className="mb-0">
                        Drag your files here or click in this area.
                      </p>
                    </form>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-lg-12 text-end">
                    <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                      <span className="btn-label me-2">
                        <i className="fa fa-save"></i>
                      </span>
                      Submit
                    </button>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table table-bordered  table-hover rounded">
                        <thead className="bg-secondary text-white">
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
                              <i className="fa-eye fa "></i>

                              <i className="fa fa-trash text-danger   px-3"></i>

                              <i className="fa fa-download"></i>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>File Name here</td>
                            <td>
                              <i className="fa-eye fa "></i>

                              <i className="fa fa-trash text-danger  px-3"></i>

                              <i className="fa fa-download "></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sub-heading  fw-bold">
                      Location & Departments Management
                    </div>
                    <label className="fw-light">
                      Create and manage your dropdown list for your organisation
                      Location Division / Department
                    </label>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-6">
                    <label>Department/Division/ Location:</label>
                    <input
                      className="form-control w-100"
                      placeholder="Enter Text here"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6 text-end float-end align-self-end">
                    <div className="btn btn-labeled btn-primary px-3 shadow">
                      <span className="btn-label me-2">
                        <i className="fa fa-plus"></i>
                      </span>
                      Add New Section
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-12">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingeight">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                              <div className=" d-flex align-items-center">
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
                          <div className="accordion-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="table-responsive">
                                  <table className="table table-bordered  table-hover rounded">
                                    <thead className="bg-secondary text-white">
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
                                          <i className="fa fa-edit  px-3"></i>

                                          <i className="fa fa-trash text-danger"></i>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>
                                          Show
                                          Sub-Department/Sub-Division/Sub-Location
                                        </td>
                                        <td>
                                          <i className="fa fa-edit  px-3"></i>

                                          <i className="fa fa-trash text-danger"></i>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="row my-3">
                              <div className="col-lg-12 text-end">
                                <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
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

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingeightt">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                          >
                            <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                              <div className=" d-flex align-items-center">
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
                          <div className="accordion-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="table-responsive">
                                  <table className="table table-bordered  table-hover rounded">
                                    <thead className="bg-secondary text-white">
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
                                          <i className="fa fa-edit  px-3"></i>

                                          <i className="fa fa-trash text-danger"></i>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>
                                          Show
                                          Sub-Department/Sub-Division/Sub-Location
                                        </td>
                                        <td>
                                          <i className="fa fa-edit  px-3"></i>

                                          <i className="fa fa-trash text-danger"></i>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="row my-3">
                              <div className="col-lg-12 text-end">
                                <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
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
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-lg-12 text-end">
                    <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                      <span className="btn-label me-2">
                        <i className="fa fa-print"></i>
                      </span>
                      print
                    </button>
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
