import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

import Header from "../components/header";
import Editors from "./components/editors";
import ResourcesTables from "../components/resources";
import PlanningReportFileUpload from "./components/file-upload";

import {
  handleCleanUp,
  setupGetSingleReport,
  resetReportAddSuccess,
  setupUpdateSingleReport,
  setupGetSingleUpdatedReport,
  setupGetResourceDetails,
} from "../../../../../global-redux/reducers/reports/planing-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { decryptString } from "../../../../../config/helper";

/**
 * Page component for updating an existing Internal Audit Planning Report.
 * Handles fetching report details, updating report data, and managing attached resources/files.
 */
const UpdatePlanningReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = decryptString(id);

  // Global state
  const { user } = useSelector((state) => state?.auth);
  const {
    loading,
    updateLoading,
    singleReportObject,
    reportAddSuccess,
    resources,
  } = useSelector((state) => state?.planningReport);

  // Local editable values
  const [values, setValues] = React.useState({
    summary: "",
    methodology: "",
    riskAssesmentSummary: "",
    orgnizationStrategy: "",
    summaryRisk: "",
  });

  /** Handle editor content changes */
  const onContentChange = React.useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  /** Save updated report */
  const handleUpdate = React.useCallback(() => {
    if (!updateLoading && singleReportObject) {
      dispatch(setupUpdateSingleReport({ ...singleReportObject, ...values }));
    }
  }, [dispatch, updateLoading, singleReportObject, values]);

  /** Sync local state when report data changes */
  React.useEffect(() => {
    if (singleReportObject) {
      setValues({
        summary: singleReportObject?.summary || "",
        methodology: singleReportObject?.methodology || "",
        riskAssesmentSummary: singleReportObject?.riskAssesmentSummary || "",
        orgnizationStrategy: singleReportObject?.orgnizationStrategy || "",
        summaryRisk: singleReportObject?.summaryRisk || "",
      });
    }
  }, [singleReportObject]);

  /** Refetch report when update succeeds */
  React.useEffect(() => {
    if (reportAddSuccess) {
      dispatch(resetReportAddSuccess());
      dispatch(setupGetSingleUpdatedReport(Number(reportId)));
    }
  }, [dispatch, reportAddSuccess, reportId]);

  /** Redirect if reportId is invalid */
  React.useEffect(() => {
    if (!reportId) navigate("/audit/planning-report");
  }, [reportId, navigate]);

  /** Fetch report + resource data when mounted */
  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      const fetchData = async () => {
        await dispatch(setupGetSingleReport(Number(reportId)));
        await dispatch(setupGetResourceDetails({ reportId: Number(reportId) }));
      };
      fetchData();
    }
  }, [dispatch, user, reportId]);

  /** Sidebar state + cleanup */
  React.useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-planing-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => dispatch(handleCleanUp());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* ---- Header ---- */}
          <Header data={singleReportObject} title="Update Planning Report" />

          {/* ---- Editable Rich Text Sections ---- */}
          <Editors onContentChange={onContentChange} data={singleReportObject} />

          {/* ---- Save Button ---- */}
          <div className="d-flex justify-end">
            <button
              className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${updateLoading ? "disabled" : ""
                }`}
              onClick={handleUpdate}
            >
              {updateLoading ? "Loading..." : "Save Report"}
            </button>
          </div>

          <hr />

          {/* ---- Resource Tables ---- */}
          {resources?.length > 0 && (
            <>
              <ResourcesTables resources={resources} />
              <hr />
            </>
          )}

          {/* ---- File Upload Section ---- */}
          <PlanningReportFileUpload
            reportId={reportId}
            item={singleReportObject}
          />
        </>
      )}
    </div>
  );
};

export default UpdatePlanningReport;
