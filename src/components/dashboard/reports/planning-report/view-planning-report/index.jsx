import React from "react";
import Headers from "./components/header/index";
import { useSearchParams } from "react-router-dom";
import {
  setupGetSingleReport,
  handleCleanUp,
} from "../../../../../global-redux/reducers/reports/planing-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Editors from "./components/editors/index";
import HeadingTable from "./components/heading-table";
import { useNavigate } from "react-router-dom";
import PlanningReportFileUpload from "./components/file-upload";

const UpdatePlanningReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const reportId = searchParams.get("reportId");
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleReportObject } = useSelector(
    (state) => state?.planningReport
  );

  React.useEffect(() => {
    if (!reportId) {
      navigate("/audit/planning-report");
    }
  }, [reportId]);

  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      dispatch(setupGetSingleReport(Number(reportId)));
    }
  }, [dispatch, reportId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-planing-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Headers data={singleReportObject} />
          <Editors data={singleReportObject} />
          <HeadingTable data={singleReportObject} />
          <PlanningReportFileUpload item={singleReportObject} />
        </>
      )}
    </div>
  );
};

export default UpdatePlanningReport;
