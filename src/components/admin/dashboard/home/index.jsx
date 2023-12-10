import React from "react";
import TopBar from "../../../common/top-bar/TopBar";
import Sidebar from "../../../common/sidebar/Sidebar";
import "./index.css";
import img from "../../../../assets/under.gif";
import { useSelector } from "react-redux";
import {changeUserLoggedIn}  from "../../../../global-redux/reducers/auth/slice"
import { useDispatch } from "react-redux";
const DashboardHome = () => {
  let { showSidebar } = useSelector((state) => state.common);
  let dispatch=useDispatch()

  React.useEffect(()=>{
    dispatch(changeUserLoggedIn(false))
  },[])
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <div className="col-lg-12">
            <div className="section-header my-3  text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Dashboard</div>
            </div>

            <div
              className="row"
              style={{
                height: "70vh",
                justifyContent: "center",
                placeItems: "center",
              }}
            >
              <div className="col-lg-12 text-center">
                <img src={img} style={{ width: "300px" }} alt="gifImage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
