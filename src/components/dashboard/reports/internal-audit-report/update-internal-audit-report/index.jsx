import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  setupSaveInternalAuditReport,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { decryptString } from "../../../../../config/helper";
import Header from "../components/Header";
import InternalAuditReportBody from "../components/InternalAuditReportBody";
import { buildInternalAuditReportSavePayload } from "../components/reportPayload";

const UpdateInternalAuditReport = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const reportId = useMemo(() => decryptString(id), [id]);
  const { user } = useSelector((state) => state?.auth);
  const {
    loading,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    singleInternalAuditReport,
  } = useSelector((state) => state?.internalAuditReport);
  const [reportObject, setReportObject] = useState({});

  const handleChangeReportObject = useCallback((event) => {
    const { name, value } = event.target;
    setReportObject((current) => ({ ...current, [name]: value }));
  }, []);

  const handleChangeExtraFields = useCallback((event, fieldId) => {
    const { name, value } = event.target;
    setReportObject((current) => ({
      ...current,
      intAuditExtraFieldsList: current?.intAuditExtraFieldsList?.map((field) =>
        Number(field?.id) === Number(fieldId)
          ? { ...field, [name]: value }
          : field
      ),
    }));
  }, []);

  const onContentChange = useCallback((value, name) => {
    setReportObject((current) => ({ ...current, [name]: value }));
  }, []);

  const handleSaveInternalAuditReport = useCallback(async () => {
    if (addReportLoading) return;

    try {
      const response = await dispatch(
        setupSaveInternalAuditReport(
          buildInternalAuditReportSavePayload(reportObject)
        )
      ).unwrap();

      if (response?.status && response?.data?.id) {
        setReportObject((current) => ({ ...current, ...response.data }));
      }
    } catch {
      // The rejected thunk displays the API error.
    }
  }, [addReportLoading, dispatch, reportObject]);

  const handleAttachmentsChange = useCallback((annexureUploads) => {
    setReportObject((current) => ({ ...current, annexureUploads }));
  }, []);

  useEffect(() => {
    if (Object.keys(singleInternalAuditReport).length > 0) {
      setReportObject(singleInternalAuditReport);
    }
  }, [singleInternalAuditReport]);

  useEffect(() => {
    const extraFields =
      internalAuditReportExtraFieldsObject?.intAuditExtraFieldsList;

    if (Array.isArray(extraFields)) {
      setReportObject((current) => ({
        ...current,
        id: internalAuditReportExtraFieldsObject?.id || current?.id,
        intAuditExtraFieldsList: extraFields,
      }));
    }
  }, [internalAuditReportExtraFieldsObject]);

  useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-report");
    }
  }, [navigate, reportId]);

  useEffect(() => {
    if (user?.[0]?.token && reportId) {
      dispatch(
        setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`)
      );
    }
  }, [dispatch, reportId, user]);

  useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => dispatch(handleResetData());
  }, [dispatch]);

  const reportNotFound =
    singleInternalAuditReport?.[0]?.error === "Not Found" ||
    (Object.keys(singleInternalAuditReport).length === 0 && !loading);

  return (
    <div className="overflow-y-hidden">
      {loading ? (
        <CircularProgress />
      ) : reportNotFound ? (
        "Internal Audit Report Not Found"
      ) : (
        <div className="mb-4">
          <Header title="Update Internal Audit Report" />
          <InternalAuditReportBody
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            onContentChange={onContentChange}
            onAttachmentsChange={handleAttachmentsChange}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateInternalAuditReport;
