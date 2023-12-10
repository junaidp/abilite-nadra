import React from "react";
import TopBar from "../../../common/top-bar/TopBar";
import Sidebar from "../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { changeUserLoggedIn } from "../../../../global-redux/reducers/auth/slice";
import { useDispatch } from "react-redux";
const AuditSettings = () => {
  let { showSidebar } = useSelector((state) => state.common);
  let dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeUserLoggedIn(false));
  }, []);
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <p>settings works!</p>
        </div>
      </div>
    </div>
  );
};

export default AuditSettings;
