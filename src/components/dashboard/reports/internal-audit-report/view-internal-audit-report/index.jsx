import React from "react";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useSearchParams } from "react-router-dom";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import KeyFindings from "./components/KeyFindings";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "./components/Header";
import FollowUpItem from "./components/FollowUpItem";
import PDFGenerator from "./components/PDFGenerator";
import { PDFViewer } from "@react-pdf/renderer";
import FileUpload from "./components/FileUpload";

const ViewInternalAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const reportId = searchParams.get("reportId");
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleInternalAuditReport } = useSelector(
    (state) => state?.internalAuditReport
  );

  const [viewPdf, setViewPdf] = React.useState(false);

  React.useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-report");
    }
  }, [reportId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-report"));
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
  }, [dispatch]);

  return (
    <div className="overflow-y-hidden">
      {loading ? (
        <CircularProgress />
      ) : singleInternalAuditReport[0]?.error === "Not Found" ||
        (Object.keys(singleInternalAuditReport).length === 0 &&
          singleInternalAuditReport.constructor === Object) ? (
        "Interal Audit Report Not Found"
      ) : (
        <div className="mb-4">
          <Header singleInternalAuditReport={singleInternalAuditReport} />
          <ReportFirstLayout
            singleInternalAuditReport={singleInternalAuditReport}
          />

          <RichTextFields
            singleInternalAuditReport={singleInternalAuditReport}
          />
          <KeyFindings singleInternalAuditReport={singleInternalAuditReport} />
          <div>
            <div className="col-lg-12 mt-4">
              <div className="sub-heading  fw-bold">Reporting & Follow Up</div>
            </div>
            {singleInternalAuditReport?.reportingAndFollowUp?.reportingList?.map(
              (item, index) => {
                return <FollowUpItem key={index} item={item} />;
              }
            )}
          </div>
          <AuditExtraFields
            singleInternalAuditReport={singleInternalAuditReport}
          />
          <div className="mt-4">
            <FileUpload item={singleInternalAuditReport} />
          </div>
        </div>
      )}
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
  );
};

export default ViewInternalAuditReport;
