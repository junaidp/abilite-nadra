import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDetectClickOutside } from "react-detect-click-outside";
import "./Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveLink,
  changeExpanded,
} from "../../../global-redux/reducers/common/slice";

export default function TemporaryDrawer() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { showSidebar, activeLink, menuItems } = useSelector(
    (state) => state.common
  );
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(false);
  };
  const userRef = useDetectClickOutside({
    onTriggered: toggleDrawer,
  });

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
  }

  function handleSubItemClick(link, id) {
    navigate(link);
    dispatch(changeActiveLink(id));
  }

  React.useEffect(() => {
    setOpen(true);
  }, [showSidebar]);

  const DrawerList = (
    <Box sx={{ width: 285 }} role="presentation" ref={userRef}>
      <div className="left-sidebar" style={{ marginTop: "-50px" }}>
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
                      onClick={() => handleMainItemClick(item?.route, item?.id)}
                    >
                      <span>
                        <i className={item?.icon} id={item?.id} />
                      </span>
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
                              <span>
                                <i className={subItem?.icon} id={subItem?.id} />
                              </span>
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
                      onClick={() => handleMainItemClick(item?.route, item?.id)}
                    >
                      <span>
                        <i className={item?.icon} id={item?.id} />
                      </span>
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
                              <span>
                                <i className={subItem?.icon} id={subItem?.id} />
                              </span>
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
    </Box>
  );

  return (
    <div>
      <Drawer open={open}>{DrawerList}</Drawer>
    </div>
  );
}
