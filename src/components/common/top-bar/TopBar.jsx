import React from "react";
import "./TopBar.css";
import user1 from "../../../assets/user-1.jpg";
import logo from "../../../assets/light-logo-.png";
import { Link } from "react-router-dom";
import { changeShowSidebar } from "../../../global-redux/reducers/common/slice";
import { useDispatch, useSelector } from "react-redux";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useNavigate } from "react-router-dom";
import {
  changeAuthUser,
  setupLogoutUser,
} from "../../../global-redux/reducers/auth/slice";
import nadraLogo from "../../../assets/logo.png";
import {
  changeCompany,
  changeYear,
} from "../../../global-redux/reducers/common/slice";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopBar = () => {
  const [showUserProfile, setShowUserProfile] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);
  const { showSidebar, company, year } = useSelector((state) => state.common);
  const userRef = useDetectClickOutside({
    onTriggered: closeUserProfileDropDown,
  });

  function closeUserProfileDropDown() {
    setShowUserProfile(false);
  }

  function handleLogout() {
    dispatch(setupLogoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    localStorage.removeItem("year");
    dispatch(changeAuthUser([]));
    navigate("/login");
  }

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
              <img src={nadraLogo} className="h-60 w-60 py-1 px-2" />
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
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                </select>
              )}

              {user[0]?.userId?.role[0]?.name === "USER" &&
                user[0]?.userId?.employeeid?.userHierarchy !==
                  "Management_Auditee" && (
                  <a
                    className="nav-link f-20"
                    onClick={() => {
                      navigate("/audit/audit-settings");
                      dispatch(changeShowSidebar(false));
                    }}
                  >
                    <i className="fa fa-gear f-18"></i>
                    <div className="notification bg-primary rounded-circle"></div>
                  </a>
                )}

              <li className="nav-item dropdown">
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
                        src={user1}
                        className="rounded-circle"
                        width="35"
                        height="35"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
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
                          src={user1}
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
