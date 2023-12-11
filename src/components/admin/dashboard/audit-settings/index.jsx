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
          <div className="card p-3 shadow-sm setting-tab">
            <h2 className="text-center heading p-3">Settings</h2>
            <nav
              style={{
                borderBottom: "1px solid #c7c7c7",
                paddingBottom: "10px",
              }}
            >
              <div
                className="nav nav-tabs glass-effect border-0"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className="nav-link active shadow-sm  rounded-0 me-3"
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
                  className="nav-link shadow-sm  rounded-0  "
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
                <div className="row my-3">
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
                    <form action="upload.php" method="POST">
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
                            <th style={{ width: "80px" }}>Action</th>
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
                <p>
                  <strong>
                    This is some placeholder content the Profile tab's
                    associated content.
                  </strong>
                  Clicking another tab will toggle the visibility of this one
                  for the next. The tab JavaScript swaps classNamees to control
                  the content visibility and styling. You can use it with tabs,
                  pills, and any other <code>.nav</code>-powered navigation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSettings;
