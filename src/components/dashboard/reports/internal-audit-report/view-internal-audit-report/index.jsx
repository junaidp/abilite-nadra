import React, { useEffect, useMemo } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  handleResetData,
  setupGetSingleInternalAuditReport,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { decryptString } from "../../../../../config/helper";
import FileUpload from "../components/FileUpload";
import Header from "../components/Header";
import InternalReportObservations from "../components/InternalReportObservations";
import AuditExtraFields from "./components/AuditExtraFields";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";

const ViewInternalAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = useMemo(() => decryptString(id), [id]);
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleInternalAuditReport } = useSelector(
    (state) => state?.internalAuditReport
  );

  useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-report");
    }
  }, [navigate, reportId]);

  useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => dispatch(handleResetData());
  }, [dispatch]);

  useEffect(() => {
    if (user?.[0]?.token && reportId) {
      dispatch(
        setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`)
      );
    }
  }, [dispatch, reportId, user]);

  const reportNotFound =
    singleInternalAuditReport?.[0]?.error === "Not Found" ||
    (Object.keys(singleInternalAuditReport).length === 0 && !loading);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <CircularProgress />
      </div>
    );
  }

  if (reportNotFound) {
    return <div>Internal Audit Report Not Found</div>;
  }

  return (
    <div className="overflow-y-hidden mb-4">
      <Header title="View Internal Audit Report" />
      <ReportFirstLayout singleInternalAuditReport={singleInternalAuditReport} />
      <RichTextFields singleInternalAuditReport={singleInternalAuditReport} />

      <InternalReportObservations reportObject={singleInternalAuditReport} />

      {singleInternalAuditReport?.intAuditExtraFieldsList?.length > 0 && (
        <AuditExtraFields singleInternalAuditReport={singleInternalAuditReport} />
      )}

      <div className="mt-4">
        <FileUpload item={singleInternalAuditReport} readOnly />
      </div>
    </div>
  );
};

export default ViewInternalAuditReport;
