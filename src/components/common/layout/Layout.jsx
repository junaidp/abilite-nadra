import React from "react";
import { useSelector } from "react-redux";
import TopBar from "../top-bar/TopBar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Settings from "../../dashboard/audit-settings/index";
import ManagementAuditeeView from "../../dashboard/management-auditee-view/index";
import { Routes, Route } from "react-router-dom";
import FollowUpRoute from "../../dashboard/reporting-follow-up/follow-up/follow-up-particulars/index";
import ReportingRoute from "../../dashboard/reporting-follow-up/reporting/reporting-particulars/index";

const Layout = () => {
  const navigate = useNavigate();
  let { showSidebar } = useSelector((state) => state.common);
  let { user } = useSelector((state) => state?.auth);

  React.useEffect(() => {
    if (user[0]?.token) {
      if (user[0]?.userId?.role[0]?.name === "ADMIN") {
        navigate("/audit/dashboard");
      }
    }
  }, [user]);

  return (
    <React.Fragment>
      <TopBar />
      <div className="flex">
        {user[0]?.userId?.role[0]?.name === "USER" &&
          user[0]?.userId?.employeeid?.userHierarchy !==
            "Management_Auditee" && <Sidebar />}
        {user[0]?.userId?.role[0]?.name === "ADMIN" && (
          <div className="p-4 w-100">
            <h2 className="text-center main-color">Welcome {user[0]?.name}</h2>
            <Settings />
          </div>
        )}
        {user[0]?.userId?.role[0]?.name === "USER" &&
          user[0]?.userId?.employeeid?.userHierarchy ==
            "Management_Auditee" && (
            <div className="p-4 w-100">
              <Routes>
                <Route path="dashboard" element={<ManagementAuditeeView />} />
                <Route
                  path="follow-up-particulars"
                  element={<FollowUpRoute />}
                />
                <Route
                  path="reporting-particulars"
                  element={<ReportingRoute />}
                />
              </Routes>
            </div>
          )}
        {user[0]?.userId?.role[0]?.name === "USER" &&
          user[0]?.userId?.employeeid?.userHierarchy !==
            "Management_Auditee" && (
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
