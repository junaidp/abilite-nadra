import React from "react";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useSearchParams } from "react-router-dom";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import KeyFindings from "./components/KeyFindings";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "./components/Header";
import { PDFViewer } from "@react-pdf/renderer";
import FileUpload from "./components/FileUpload";
import PDFGenerator from "./components/PDFGenerator";

const ViewInternalAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const reportId = searchParams.get("reportId");
  const [viewPdf, setViewPdf] = React.useState(false);
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleInternalAuditReport } = useSelector(
    (state) => state?.consolidationReports
  );

  React.useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-consolidation-report");
    }
  }, [reportId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-consolidation-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleResetData());
    };
  }, []);

  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      dispatch(
        setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`)
      );
    }
  }, [reportId, user]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : singleInternalAuditReport[0]?.error === "Not Found" ||
        (Object.keys(singleInternalAuditReport).length === 0 &&
          singleInternalAuditReport.constructor === Object) ? (
        "Internal Audit Consolidation  Report Not Found"
      ) : (
        <div className="mb-4">
          <Header singleInternalAuditReport={singleInternalAuditReport} />
          <ReportFirstLayout
            singleInternalAuditReport={singleInternalAuditReport}
          />
          <div className="mt-4">
            <FileUpload item={singleInternalAuditReport} />
          </div>
          <RichTextFields
            singleInternalAuditReport={singleInternalAuditReport}
          />
          <KeyFindings singleInternalAuditReport={singleInternalAuditReport} />
          <AuditExtraFields
            singleInternalAuditReport={singleInternalAuditReport}
          />
          {singleInternalAuditReport?.approved === true && (
            <div className="row my-3">
              <div
                className="btn btn-labeled btn-primary px-3 shadow fitContent"
                onClick={() => setViewPdf((pre) => !pre)}
              >
                {viewPdf ? "Remove Pdf View" : "View Pdf"}
              </div>
            </div>
          )}
          {viewPdf && singleInternalAuditReport?.approved === true && (
            <PDFViewer style={{ width: "100%", height: "500px" }}>
              <PDFGenerator reportObject={singleInternalAuditReport} />
            </PDFViewer>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewInternalAuditReport;
