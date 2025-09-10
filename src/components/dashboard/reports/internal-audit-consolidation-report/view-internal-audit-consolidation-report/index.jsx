import React from "react";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import ConsolidatedObservations from "./components/ConsolidatedObservataion";
import { groupObservationsBySubLocationAndArea } from "../../../../../config/helper";
import { decryptString } from "../../../../../config/helper";
import { useParams } from "react-router-dom";

const ViewInternalAuditConsolidationReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = decryptString(id);
  const [consolidatedObservations, setConsolidatedObservations] =
    React.useState([]);
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleInternalAuditReport } = useSelector(
    (state) => state?.consolidationReport
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
  }, [dispatch]);

  React.useEffect(() => {
    if (singleInternalAuditReport?.reportingsList) {
      setConsolidatedObservations(
        groupObservationsBySubLocationAndArea(singleInternalAuditReport?.reportingsList)
      );
    }
  }, [singleInternalAuditReport]);

  return (
    <div className="overflow-y-hidden">
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

          <RichTextFields
            singleInternalAuditReport={singleInternalAuditReport}
          />
          {consolidatedObservations &&
            consolidatedObservations?.length !== 0 && (
              <ConsolidatedObservations
                consolidatedObservations={consolidatedObservations}
                reportObject={singleInternalAuditReport}
              />
            )}
          {singleInternalAuditReport?.intAuditExtraFieldsList &&
            singleInternalAuditReport?.intAuditExtraFieldsList?.length !==
            0 && (
              <AuditExtraFields
                singleInternalAuditReport={singleInternalAuditReport}
              />
            )}
          <div className="mt-4">
            <FileUpload item={singleInternalAuditReport} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInternalAuditConsolidationReport;
