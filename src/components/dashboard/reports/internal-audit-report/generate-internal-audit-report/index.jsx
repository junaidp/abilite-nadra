import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  handleResetData,
  setupCreateInternalAuditReportObject,
  setupGetAllJobsForInternalAuditReport,
  setupSaveInternalAuditReport,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import Header from "../components/Header";
import InternalAuditReportBody from "../components/InternalAuditReportBody";
import { buildInternalAuditReportSavePayload } from "../components/reportPayload";
import SelectJob from "./components/SelectJob";

const GenerateInternalAuditReport = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const {
    jobsForInternalAuditReports,
    internalAuditReportObject,
    loading,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
  } = useSelector((state) => state?.internalAuditReport);

  const [reportObject, setReportObject] = useState({});
  const [jobForInternalAuditReportId, setJobForInternalAuditReportId] =
    useState("");

  const handleChange = useCallback((event) => {
    setJobForInternalAuditReportId(event.target.value);
  }, []);

  const handleGetInternalAuditReportObject = useCallback(() => {
    if (loading) return;
    if (!jobForInternalAuditReportId) {
      toast.error("Please select a report");
      return;
    }

    const [reportingAndFollowUpId, subLocationId] =
      jobForInternalAuditReportId.split(" ");
    dispatch(
      setupCreateInternalAuditReportObject(
        `?reportingAndFollowUpId=${Number(
          reportingAndFollowUpId
        )}&subLocationId=${Number(subLocationId)}`
      )
    );
  }, [dispatch, jobForInternalAuditReportId, loading]);

  const handleChangeReportObject = useCallback((event) => {
    const { name, value } = event.target;
    setReportObject((current) => ({ ...current, [name]: value }));
  }, []);

  const handleChangeExtraFields = useCallback((event, id) => {
    const { name, value } = event.target;
    setReportObject((current) => ({
      ...current,
      intAuditExtraFieldsList: current?.intAuditExtraFieldsList?.map((field) =>
        Number(field?.id) === Number(id) ? { ...field, [name]: value } : field
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
    const companyId = user?.[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    const isReportEmpty = Object.keys(internalAuditReportObject).length === 0;

    if (companyId && isReportEmpty) {
      dispatch(
        setupGetAllJobsForInternalAuditReport(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
  }, [company, dispatch, internalAuditReportObject, user, year]);

  useEffect(() => {
    if (Object.keys(internalAuditReportObject).length > 0) {
      setReportObject(internalAuditReportObject);
    }
  }, [internalAuditReportObject]);

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
    dispatch(changeActiveLink("li-internal-audit-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => dispatch(handleResetData());
  }, [dispatch]);

  const isReportAvailable = Object.keys(internalAuditReportObject).length > 0;

  return (
    <div className="overflow-y-hidden">
      <Header title="Generate Internal Audit Report" />
      <SelectJob
        internalAuditReportObject={internalAuditReportObject}
        jobForInternalAuditReportId={jobForInternalAuditReportId}
        handleChange={handleChange}
        jobsForInternalAuditReports={jobsForInternalAuditReports}
        handleGetInternalAuditReportObject={handleGetInternalAuditReportObject}
        loading={loading}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        isReportAvailable && (
          <InternalAuditReportBody
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            onContentChange={onContentChange}
            onAttachmentsChange={handleAttachmentsChange}
          />
        )
      )}
    </div>
  );
};

export default GenerateInternalAuditReport;
