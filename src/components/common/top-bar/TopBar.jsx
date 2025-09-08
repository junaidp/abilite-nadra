import React from "react";
import "./TopBar.css";
import user1 from "../../../assets/person.png";
import logo from "../../../assets/light-logo-.png";
import { Link } from "react-router-dom";
import { changeShowSidebar } from "../../../global-redux/reducers/common/slice";
import { useDispatch, useSelector } from "react-redux";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {
  changeAuthUser,
  setupLogoutUser,
  setupGetSystemNotifications,
} from "../../../global-redux/reducers/auth/slice";
import {
  changeCompany,
  changeYear,
} from "../../../global-redux/reducers/common/slice";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { getYearsRange } from "../../../config/helper";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { user, notifications, notificationLoading } = useSelector(
    (state) => state.auth
  );
  const defaultProfilePic = user?.[0]?.userId?.
    imgFileData
  const profilePicturePreview =
    `data:image/jpeg;base64,${defaultProfilePic}` || ""
  const defaultLogoBase64 = user?.[0]?.company?.[0]?.logo?.fileData || "";
  const logoPreview =
    `data:image/jpeg;base64,${defaultLogoBase64}` || ""
  const { showSidebar, company, year } = useSelector((state) => state.common);
  const [showNotification, setShowNotification] = React.useState(false);
  const [showUserProfile, setShowUserProfile] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const notificationRef = useDetectClickOutside({
    onTriggered: closeNotficationDropDown,
  });

  const userRef = useDetectClickOutside({
    onTriggered: closeUserProfileDropDown,
  });

  function closeNotficationDropDown() {
    setShowNotification(false);
  }

  function closeUserProfileDropDown() {
    setShowUserProfile(false);
  }

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleCallNotifications() {
    setPage(1);
    dispatch(setupGetSystemNotifications({ page: 1, itemsPerPage }));
  }

  function handleLogout() {
    dispatch(setupLogoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    localStorage.removeItem("userCompany");
    localStorage.removeItem("year");
    dispatch(changeAuthUser([]));
    navigate("/login");
  }

  React.useEffect(() => {
    if (showNotification) {
      dispatch(setupGetSystemNotifications({ page, itemsPerPage }));
    } else {
      setPage(1);
    }
  }, [showNotification, page]);

  React.useEffect(() => {
    localStorage.setItem("company", company);
  }, [company]);

  React.useEffect(() => {
    if (year) {
      localStorage.setItem("year", year);
    }
  }, [year]);

  return (
    <header className="app-header shadow-sm mb-3 px-0 ">
      <nav className="navbar navbar-expand-lg navbar-light  navbarWrapMain">
        <div>
          <img src={logo} className="light-logo" width="110" alt="" />
        </div>
        {user[0]?.userId?.role[0]?.name === "USER" &&
          user[0]?.userId?.employeeid?.userHierarchy !==
          "Management_Auditee" && (
            <button
              className="btn  ml-100"
              onClick={() => dispatch(changeShowSidebar(!showSidebar))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
          )}
        {(user[0]?.userId?.role[0]?.name === "ADMIN" ||
          user[0]?.userId?.employeeid?.userHierarchy ===
          "Management_Auditee") && (
            <button
              className="btn btn-outline-primary   my-3 logoutOut-btn-dashboard"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="d-flex align-items-center justify-content-between">
            <a
              className="nav-link d-flex d-lg-none align-items-center justify-content-center"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobilenavbar"
              aria-controls="offcanvasWithBothOptions"
            ></a>
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
              {
                defaultLogoBase64 &&
                <img src={logoPreview} className="py-1 px-2 object-fit-contain" style={{ height: "80px", width: "100px" }} />
              }
              <select
                className="form-select me-4 h-40 w-200"
                aria-label="Default select example"
                value={company}
                onChange={(e) => {
                  e?.target?.value !== "" &&
                    dispatch(changeCompany(e?.target?.value));
                }}
              >
                <option value="">select company</option>
                {user[0]?.company?.map((item, i) => {
                  return (
                    <option value={item?.companyName} key={i}>
                      {item?.companyName}
                    </option>
                  );
                })}
              </select>

              {user[0]?.userId?.role[0]?.name === "USER" && (
                <select
                  className="form-select me-4 h-40"
                  aria-label="Default select example"
                  value={year}
                  onChange={(e) => {
                    if (e?.target?.value !== "") {
                      dispatch(changeYear(e?.target?.value));
                    }
                  }}
                >
                  <option value="">Select Year</option>
                  {getYearsRange().map((year, index) => {
                    return (
                      <option value={year} key={index}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              )}

              {/* System Notifications */}
              {user[0]?.userId?.authorities[0].toUpperCase() === "USER" && (
                <li
                  className="nav-item dropdown"
                  onClick={() => {
                    setShowNotification(true);
                    setShowUserProfile(false);
                  }}
                  ref={notificationRef}
                >
                  <Tooltip
                    title={`Click To See System Notifications`}
                    placement="top"
                  >
                    <a
                      className="nav-link nav-icon-hover"
                      id="drop2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bell-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                      </svg>
                      <div className="notification bg-primary rounded-circle"></div>
                    </a>
                  </Tooltip>
                  {showNotification && (
                    <div className="notification-wrap" aria-labelledby="drop2">
                      <div className="d-flex align-items-center justify-content-between py-3 px-7">
                        <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                        <span className=" bg-primary rounded-4 px-3 py-1">
                          {notifications?.totalElements} total{" "}
                        </span>
                        <i
                          className="fa fa-refresh text-primary f-18 mx-2 cursor-pointer"
                          onClick={handleCallNotifications}
                        ></i>
                      </div>
                      <div className="message-body" data-simplebar="">
                        {notificationLoading ? (
                          <div className="px-7">
                            <CircularProgress size={24} />
                          </div>
                        ) : notifications?.content?.length === 0 ||
                          !notifications?.content ? (
                          <p className="px-7">notifications not found.</p>
                        ) : (
                          notifications?.content?.map((notification) => {
                            return (
                              <a
                                className="py-6 px-7 d-flex align-items-center dropdown-item"
                                key={notification?.id}
                              >
                                <span className="me-3">
                                  <img
                                    src={user1}
                                    alt="user"
                                    className="rounded-circle"
                                    width="48"
                                    height="48"
                                  />
                                </span>
                                <div className="w-75 d-inline-block v-middle">
                                  <h6 className="mb-1 fw-semibold  wrap-text">
                                    {notification?.header}
                                  </h6>
                                  <span className="d-block wrap-text">
                                    {notification?.message}
                                  </span>
                                  <span className="d-block wrap-text">
                                    {notification?.createdDate
                                      ? moment
                                        .utc(notification?.createdDate)
                                        .format("DD-MM-YYYY HH:mm:ss")
                                      : "null"}
                                  </span>
                                </div>
                              </a>
                            );
                          })
                        )}
                      </div>
                      {notifications?.content?.length > 0 && (
                        <div className="row px-7 mt-2">
                          <div className="col-lg-12 mb-4">
                            <Pagination
                              count={Math.ceil(
                                notifications?.totalElements / itemsPerPage
                              )}
                              page={page}
                              onChange={handleChange}
                              siblingCount={1}
                              boundaryCount={1}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              )}

              <li className="nav-item dropdown">
                <Tooltip
                  title={`Click To See More (${user[0]?.userId?.name})`}
                  placement="top"
                >
                  <a
                    className="nav-link pe-0"
                    id="drop1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => {
                      setShowUserProfile((pre) => !pre);
                    }}
                    ref={userRef}
                  >
                    <div className="d-flex align-items-center">
                      <div className="user-profile-img w-32">
                        <img
                          src={defaultProfilePic ? profilePicturePreview : user1}
                          className="rounded-circle"
                          width="35"
                          height="35"
                          alt=""
                        />
                      </div>
                    </div>
                  </a>
                </Tooltip>
                {showUserProfile && (
                  <div
                    className="px-4 content-dd dropdown-menu-end  dropdown-menu-animate-up user-profile-dropdown absolute left-300"
                    aria-labelledby="drop1"
                  >
                    <div data-simplebar="">
                      <div className="py-3  pb-0">
                        <h5 className="mb-0 fs-5 fw-semibold">User Profile</h5>
                      </div>
                      <div className="d-flex align-items-center py-9 border-bottom">
                        <img
                          src={defaultProfilePic ? profilePicturePreview : user1}
                          className="rounded-circle"
                          width="80"
                          height="80"
                          alt=""
                        />
                        <div className="ms-3 w-200">
                          <h5 className="mb-1 fs-3 break-word">
                            {user[0]?.name ? user[0]?.name : "Name Not Found"}
                          </h5>
                          <span className="mb-1 d-block text-dark">
                            {user[0]?.userId?.role[0]?.name}
                          </span>
                          <p className="mb-0 d-flex text-dark align-items-center gap-2 word-break ">
                            <i className="fa fa-envelope fs-4"></i>{" "}
                            {user[0]?.email
                              ? user[0]?.email
                              : "info@abilite.com"}
                          </p>
                        </div>
                      </div>
                      <div className="message-body d-grid hidden">
                        {user[0]?.userId?.role[0]?.name === "USER" &&
                          user[0]?.userId?.employeeid?.userHierarchy !==
                          "Management_Auditee" && (
                            <Link
                              to="/audit/user/profile"
                              className="py-8  mt-8 d-flex align-items-center"
                            >
                              <span className="d-flex align-items-center justify-content-center bg-light rounded-1 p-6">
                                <FontAwesomeIcon
                                  icon={faIdBadge}
                                  className="f-30"
                                />
                              </span>
                              <div className="w-75 d-inline-block v-middle ps-3">
                                <h6 className="mb-1 bg-hover-primary fw-semibold">
                                  My Profile{" "}
                                </h6>
                                <span className="d-block text-dark">
                                  Account Settings
                                </span>
                              </div>
                            </Link>
                          )}
                        <button
                          className="btn btn-outline-primary w-75 my-3 logoutOut-btn"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
