import React from "react";
import Header from "./components/header";
import { useDispatch } from "react-redux";
import { handleCleanUp } from "../../../../../global-redux/reducers/reports/planing-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";

/**
 * Parent container for generating a new Planning Report.
 * Sets the active sidebar links and handles cleanup on unmount.
 */
const GeneratePlanningReport = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Mark sidebar as active on load
    dispatch(changeActiveLink("li-internal-audit-planing-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));

    // Cleanup on unmount
    return () => {
      dispatch(handleCleanUp());
    };
  }, [dispatch]);

  return (
    <div id="reportsPage">
      <Header />
    </div>
  );
};

export default GeneratePlanningReport;
