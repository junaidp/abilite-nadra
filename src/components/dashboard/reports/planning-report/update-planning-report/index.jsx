import React from "react";
import Headers from "./components/header/index";
import {
  handleCleanUp,
  setupGetSingleReport,
  resetReportAddSuccess,
  setupUpdateSingleReport,
  setupGetSingleUpdatedReport,
} from "../../../../../global-redux/reducers/reports/planing-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Editors from "./components/editors/index";
import HeadingTable from "./components/heading-table";
import PlanningReportFileUpload from "./components/file-upload";
import { decryptString } from "../../../../../config/helper";
import { useParams } from "react-router-dom";

const UpdatePlanningReport = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reportId = decryptString(id);
  const { user } = useSelector((state) => state?.auth);
  const { loading, updateLoading, singleReportObject, reportAddSuccess } =
    useSelector((state) => state?.planningReport);

  const [values, setValues] = React.useState({
    summary: "",
    methodology: "",
    riskAssesmentSummary: "",
    orgnizationStrategy: "",
    summaryRisk: "",
  });

  function handleEditorContentChange(name, value) {
    setValues((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  function handleUpdate() {
    if (!updateLoading) {
      dispatch(
        setupUpdateSingleReport({
          ...singleReportObject,
          ...values,
        })
      );
    }
  }

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

  React.useEffect(() => {
    if (reportAddSuccess) {
      dispatch(resetReportAddSuccess());
      dispatch(setupGetSingleUpdatedReport(Number(reportId)));
    }
  }, [reportAddSuccess]);

  React.useEffect(() => {
    if (!reportId) {
      navigate("/audit/planning-report");
    }
  }, [reportId]);

  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      dispatch(setupGetSingleReport(Number(reportId)));
    }
  }, [dispatch]);

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
          <Editors
            handleEditorContentChange={handleEditorContentChange}
            data={singleReportObject}
          />
          <div className="d-flex justify-end">
            <button
              className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${updateLoading && "disabled"
                }`}
              onClick={handleUpdate}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle f-18"></i>
              </span>
              {updateLoading ? "Loading..." : "Save Report"}
            </button>

          </div>
          <hr />
          <HeadingTable data={singleReportObject} reportId={reportId} />
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
