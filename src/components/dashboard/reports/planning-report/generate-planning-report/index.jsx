import React from "react";
import Header from "./components/header";
import { useDispatch } from "react-redux";
import { handleCleanUp } from "../../../../../global-redux/reducers/reports/planing-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";

const GeneratePlanningReport = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-planing-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div id="reportsPage">
      <Header />
    </div>
  );
};

export default GeneratePlanningReport;
