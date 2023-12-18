import React from "react";
import { useSelector } from "react-redux";
import TopBar from "../top-bar/TopBar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  let { showSidebar } = useSelector((state) => state.common);

  return (
    <React.Fragment>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
