import React from "react";
import TopBar from "../../../common/top-bar/TopBar";
import Sidebar from "../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";

const ReportingFollowUp = () => {
  let { showSidebar } = useSelector((state) => state.common);

  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <p>reporting-and-followup works!</p>
        </div>
      </div>
    </div>
  );
};

export default ReportingFollowUp;
