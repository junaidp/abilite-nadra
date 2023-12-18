import React from "react";
import "./index.css";
// import img from "../../../../assets/under.gif";
import { useSelector } from "react-redux";
import { changeUserLoggedIn } from "../../../../global-redux/reducers/auth/slice";
import { useDispatch } from "react-redux";
import AreaChart from "./components/area-chart/AreaChart";
import BarChart from "./components/bar-chart/BarChart";
import LineChart from "./components/line-chart/LineChart";
import PieChart from "./components/pie-chart/PieChart";
const DashboardHome = () => {
  let dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeUserLoggedIn(false));
  }, []);
  return (
    <div>
      <div className="dashboard-charts-wrapper">
        <AreaChart />
        <BarChart />
        <LineChart />
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardHome;
