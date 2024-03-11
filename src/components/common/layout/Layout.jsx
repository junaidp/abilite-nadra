import React from "react";
import { useSelector } from "react-redux";
import TopBar from "../top-bar/TopBar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Settings from "../../dashboard/audit-settings/index";

const Layout = () => {
  const navigate = useNavigate();
  let { showSidebar } = useSelector((state) => state.common);
  let { user } = useSelector((state) => state?.auth);

  React.useEffect(() => {
    if (user[0]?.token) {
      if (user[0]?.userId?.role[0]?.name === "ADMIN") {
        navigate("/audit/audit-settings");
      }
    }
  }, [user]);

  return (
    <React.Fragment>
      <TopBar />
      <div className="flex">
        {user[0]?.userId?.role[0]?.name === "USER" && <Sidebar />}
        {user[0]?.userId?.role[0]?.name === "ADMIN" && (
          <div className="p-4 w-100">
            <h1 className="text-center main-color">Welcome Admin</h1>
            <Settings />
          </div>
        )}
        {user[0]?.userId?.role[0]?.name === "USER" && (
          <div
            className="row"
            id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
          >
            <Outlet />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Layout;
