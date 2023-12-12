import React from "react";
import TopBar from "../../../../../common/top-bar/TopBar";
import Sidebar from "../../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewResource = () => {
  let { showSidebar } = useSelector((state) => state.common);
  let navigate = useNavigate();

  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <header className="section-header my-3 text-start d-flex align-items-center">
            <button
              className="btn btn-indigo me-4"
              onClick={() => navigate("/audit/job-scheduling")}
            >
              Back
            </button>

            <div className="mb-0 heading">Resources</div>
          </header>

          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered  table-hover rounded">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Jan</th>
                      <th>Feb</th>
                      <th>Mar</th>
                      <th>Apr</th>
                      <th>May</th>
                      <th>Jun</th>
                      <th>Jul</th>
                      <th>Aug</th>
                      <th>Sep</th>
                      <th>Oct</th>
                      <th>Nov</th>
                      <th>Dec</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Shahrukh Ali - 28715</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>SM Raza ul Islam - 8502</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Shahzad Ahmed - 36531</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResource;
