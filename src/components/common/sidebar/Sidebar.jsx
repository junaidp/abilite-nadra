import React from "react";
import "./Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  changeActiveLink,
  changeExpanded,
} from "../../../global-redux/reducers/common/slice";
import SmallScreenSidebar from "./SmallScreenSidebar";
const Sidebar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [isWidthLessThan1250, setIsWidthLessThan1250] = React.useState(
    window.innerWidth < 1250
  );
  let { showSidebar, activeLink, menuItems } = useSelector(
    (state) => state.common
  );

  function handleMainItemClick(link, id) {
    if (link) {
      navigate(link);
    }
    dispatch(changeActiveLink(id));
    if (id === "li-audit") {
      dispatch(changeExpanded("li-audit"));
    }

    if (id === "li-reports") {
      dispatch(changeExpanded("li-reports"));
    }
    if (id === "li-reporting-and-followup") {
      dispatch(changeExpanded("li-reporting-and-followup"));
    }
    if (id === "li-audit-analytics") {
      dispatch(changeExpanded("li-audit-analytics"));
    }
  }

  function handleSubItemClick(link, id) {
    navigate(link);
    dispatch(changeActiveLink(id));
  }

  React.useEffect(() => {
    function handleResize() {
      setIsWidthLessThan1250(window.innerWidth < 1250);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        className={`${!showSidebar ? "page-wrapper-closed" : "page-wrapper"} `}
        id="bigScreenSideBar"
        data-theme="blue_theme"
        data-layout="vertical"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div className="left-sidebar">
          <div className="min-h-100">
            <nav
              className="sidebar-nav scroll-sidebar mt-4 pt-4"
              data-simplebar=""
            >
              <ul id="sidebarnav" className="mt-5">
                {menuItems?.slice(0, -2)?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div
                        className={
                          activeLink !== item?.id
                            ? "link-wrap"
                            : "link-wrap-active"
                        }
                        onClick={() =>
                          handleMainItemClick(item?.route, item?.id)
                        }
                      >
                        <FontAwesomeIcon icon={item?.icon} />
                        <ul>
                          <li>
                            <a>
                              <span>{item?.label}</span>
                            </a>
                          </li>
                        </ul>
                        {item?.id === "li-reports" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            id={item?.open ? "animate" : "non-animate"}
                            aria-hidden="true"
                          ></i>
                        )}
                        {item?.id === "li-audit" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            aria-hidden="true"
                            id={item?.open ? "animate" : "non-animate"}
                          ></i>
                        )}
                        {item?.id === "li-reporting-and-followup" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            aria-hidden="true"
                            id={item?.open ? "animate" : "non-animate"}
                          ></i>
                        )}
                        {item?.id === "li-audit-analytics" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            aria-hidden="true"
                            id={item?.open ? "animate" : "non-animate"}
                          ></i>
                        )}
                      </div>
                      {item?.subMenu &&
                        item?.subMenu?.map((subItem) => {
                          return (
                            <div
                              key={subItem?.id}
                              className={`sub-link-wrap ${
                                item?.open === false && "sub-link-wrap-close"
                              }`}
                              onClick={() =>
                                handleSubItemClick(subItem?.route, subItem?.id)
                              }
                            >
                              <div
                                className={
                                  activeLink !== subItem?.id
                                    ? "link-wrap"
                                    : "link-wrap-active"
                                }
                              >
                                <FontAwesomeIcon icon={subItem?.icon} />
                                <ul>
                                  <li>
                                    <a>
                                      <span>{subItem?.label}</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </ul>
              <hr className="mt-5 ng-star-inserted" />
              <ul id="sidebarnav" className="mt-5">
                {menuItems?.slice(-2)?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div
                        className={
                          activeLink !== item?.id
                            ? "link-wrap"
                            : "link-wrap-active"
                        }
                        onClick={() =>
                          handleMainItemClick(item?.route, item?.id)
                        }
                      >
                        <FontAwesomeIcon icon={item?.icon} />

                        <ul>
                          <li>
                            <a>
                              <span>{item?.label}</span>
                            </a>
                          </li>
                        </ul>
                        {item?.id === "li-reports" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            id={item?.open ? "animate" : "non-animate"}
                            aria-hidden="true"
                          ></i>
                        )}
                        {item?.id === "li-audit" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            aria-hidden="true"
                            id={item?.open ? "animate" : "non-animate"}
                          ></i>
                        )}
                        {item?.id === "li-reporting-and-followup" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            aria-hidden="true"
                            id={item?.open ? "animate" : "non-animate"}
                          ></i>
                        )}
                        {item?.id === "li-audit-analytics" && (
                          <i
                            className="fa fa-angle-down cheveron-icon"
                            aria-hidden="true"
                            id={item?.open ? "animate" : "non-animate"}
                          ></i>
                        )}
                      </div>
                      {item?.subMenu &&
                        item?.subMenu?.map((subItem) => {
                          return (
                            <div
                              key={subItem?.id}
                              className={`sub-link-wrap ${
                                item?.open === false && "sub-link-wrap-close"
                              }`}
                              onClick={() =>
                                handleSubItemClick(subItem?.route, subItem?.id)
                              }
                            >
                              <div
                                className={
                                  activeLink !== subItem?.id
                                    ? "link-wrap"
                                    : "link-wrap-active"
                                }
                              >
                                <FontAwesomeIcon icon={subItem?.icon} />

                                <ul>
                                  <li>
                                    <a>
                                      <span>{subItem?.label}</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {isWidthLessThan1250 && (
        <div className="smallScreenSidebar">
          <SmallScreenSidebar />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
