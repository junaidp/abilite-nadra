import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

import Header from "../components/header";
import Editors from "./components/editors";
import ResourcesTables from "../components/resources";
import PlanningReportFileUpload from "./components/file-upload";

import {
  setupGetSingleReport,
  handleCleanUp,
  setupGetResourceDetails,
} from "../../../../../global-redux/reducers/reports/planing-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { decryptString } from "../../../../../config/helper";

/**
 * Displays a read-only view of an Internal Audit Planning Report.
 * Shows report details, resources, and attached files.
 */
const ViewPlanningReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = decryptString(id);

  // Redux selectors
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleReportObject, resources } = useSelector(
    (state) => state?.planningReport
  );

  /** Redirect if reportId is invalid */
  React.useEffect(() => {
    if (!reportId) navigate("/audit/planning-report");
  }, [reportId, navigate]);

  /** Fetch report details and related resources */
  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      const fetchReportData = async () => {
        await dispatch(setupGetSingleReport(Number(reportId)));
        await dispatch(setupGetResourceDetails({ reportId: Number(reportId) }));
      };
      fetchReportData();
    }
  }, [dispatch, user, reportId]);

  /** Set sidebar active link + cleanup on unmount */
  React.useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-planing-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* ---- Report Header ---- */}
          <Header data={singleReportObject} title="View Planning Report" />

          {/* ---- Read-only Rich Text Sections ---- */}
          <Editors data={singleReportObject} />

          {/* ---- Resource Details Table ---- */}
          {resources?.length > 0 && <ResourcesTables resources={resources} />}

          {/* ---- File Attachments ---- */}
          <PlanningReportFileUpload item={singleReportObject} />
        </>
      )}
    </div>
  );
};

export default ViewPlanningReport;
