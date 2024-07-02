import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Routes, Route } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import TopBar from "../top-bar/TopBar";
import Sidebar from "../sidebar/Sidebar";
import { changeAuthUser,setupLogoutUser } from "../../../global-redux/reducers/auth/slice";
import Settings from "../../dashboard/audit-settings/index";
import ManagementAuditeeView from "../../dashboard/management-auditee-view/index";
import FollowUpRoute from "../../dashboard/reporting-follow-up/follow-up/follow-up-particulars/index";
import ReportingRoute from "../../dashboard/reporting-follow-up/reporting/reporting-particulars/index";
const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { showSidebar } = useSelector((state) => state.common);
  const location = useLocation();
  let { user } = useSelector((state) => state?.auth);

  // Logging Out the user due to inactivity or token expiration
  const onIdle = () => {
    toast.error("You were automatically logged out for inactivity.", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      toastId: "success1",
    });
    dispatch(setupLogoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    localStorage.removeItem("year");
    dispatch(changeAuthUser([]));
    navigate("/login");
  };
  const tokenExpiration = () => {
    toast.error("The token has expired, so you were logged out.", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      toastId: "success1",
    });
    dispatch(setupLogoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    localStorage.removeItem("year");
    dispatch(changeAuthUser([]));
    navigate("/login");
  };

  useIdleTimer({
    onIdle,
    timeout: 600000, // 10 minutes in milliseconds
    throttle: 500,
  });

  React.useEffect(() => {
    const checkTokenExpiration = () => {
      const token = user[0]?.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          tokenExpiration();
        }
      }
    };
    checkTokenExpiration();
  }, [location]);

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
