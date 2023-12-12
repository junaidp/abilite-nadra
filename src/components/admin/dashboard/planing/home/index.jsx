import React from "react";
import TopBar from "../../../../common/top-bar/TopBar";
import Sidebar from "../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";

const PlaningHome = () => {
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
          <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">Audit Planning and Scheduling</div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default PlaningHome;
