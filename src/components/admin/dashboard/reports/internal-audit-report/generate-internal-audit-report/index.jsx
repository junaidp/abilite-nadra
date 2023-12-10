import React from "react";
import TopBar from "../../../../../common/top-bar/TopBar";
import Sidebar from "../../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GenerateReport = () => {
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
          <div class="d-flex">
            <button
              class="btn btn-outline-indigo"
              onClick={() => navigate("/audit/internal-audit-report")}
            >
              Back
            </button>
            <p class="m-3">generate-audit-planning-report works!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
