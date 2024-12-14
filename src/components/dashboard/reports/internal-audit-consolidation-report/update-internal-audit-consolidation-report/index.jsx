import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
  setupSaveInternalAuditReport,
  resetInternalAuditReportAddSuccess,
  resetFileUploadAddSuccess,
  setupGetSingleInternalAuditReportAfterSave,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InternalAuditReportBody from "./components/InternalAuditReportBody";
import Header from "./components/Header";
import { groupObservationsByTitle } from "../../../../../config/helper"

const UpdateInternalAuditConsolidationReport = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const reportId = searchParams.get("reportId");
  const [consolidatedObservations, setConsolidatedObservations] =
    React.useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  const {
    loading,
    internalAuditReportAddSuccess,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    singleInternalAuditReport,
    consolidationFileUploadAddSuccess,
  } = useSelector((state) => state?.consolidationReport);
  const [reportObject, setReportObject] = React.useState({});
  const [deleteFileId, setDeleteFileId] = React.useState("");

  function handleChangeReportObject(event) {
    setReportObject((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleChangeExtraFields(event, id) {
    setReportObject((pre) => {
      return {
        ...pre,
        intAuditExtraFieldsList: pre?.intAuditExtraFieldsList?.map(
          (keyObject) =>
            Number(keyObject?.id) === Number(id)
              ? { ...keyObject, [event?.target?.name]: event?.target?.value }
              : keyObject
        ),
      };
    });
  }

  function handleChangeExcutiveSummary(value) {
    setReportObject((pre) => {
      return {
        ...pre,
        executiveSummary: value,
      };
    });
  }

  function handleChangeAuditPurpose(value) {
    setReportObject((pre) => {
      return {
        ...pre,
        auditPurpose: value,
      };
    });
  }
  function handleChangeAnnexure(value) {
    setReportObject((pre) => {
      return {
        ...pre,
        annexure: value,
      };
    });
  }

  function handleSaveInternalAuditReport() {
    if (!addReportLoading) {
      dispatch(setupSaveInternalAuditReport(reportObject));
    }
  }

  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      dispatch(resetInternalAuditReportAddSuccess());
      dispatch(
        setupGetSingleInternalAuditReportAfterSave(
          `?reportId=${Number(reportId)}`
        )
      );
    }
  }, [internalAuditReportAddSuccess]);

  React.useEffect(() => {
    if (consolidationFileUploadAddSuccess) {
      dispatch(resetFileUploadAddSuccess());
      dispatch(
        setupSaveInternalAuditReport({
          ...reportObject,
          annexureUploads: reportObject?.annexureUploads?.filter(
            (singleFileItem) => singleFileItem?.id !== deleteFileId
          ),
        })
      );
      setDeleteFileId("");
    }
  }, [consolidationFileUploadAddSuccess]);

  React.useEffect(() => {
    let isNotNull =
      Object.keys(singleInternalAuditReport).length !== 0 &&
      singleInternalAuditReport.constructor === Object;
    if (isNotNull) {
      setReportObject(singleInternalAuditReport);
    }
  }, [singleInternalAuditReport]);

  React.useEffect(() => {
    let isNotNull =
      Object.keys(internalAuditReportExtraFieldsObject).length !== 0 &&
      internalAuditReportExtraFieldsObject.constructor === Object;
    if (isNotNull) {
      setReportObject((pre) => {
        return {
          ...internalAuditReportExtraFieldsObject,
          reportName: pre?.reportName,
          reportDate: pre?.reportDate,
          executiveSummary: pre?.executiveSummary,
          auditPurpose: pre?.auditPurpose,
          annexure: pre?.annexure,
          consolidatedIARKeyFindingsList: pre?.consolidatedIARKeyFindingsList,
          annexureUploads: pre?.annexureUploads,
          summaryOfKeyFindingsList: pre?.summaryOfKeyFindingsList,
        };
      });
    }
  }, [internalAuditReportExtraFieldsObject]);

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
        groupObservationsByTitle(singleInternalAuditReport?.reportingsList)
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
        "Interal Audit Consolidation Report Not Found"
      ) : (
        <div className="mb-4">
          <Header />
          <InternalAuditReportBody
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleChangeExcutiveSummary={handleChangeExcutiveSummary}
            handleChangeAuditPurpose={handleChangeAuditPurpose}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            handleChangeAnnexure={handleChangeAnnexure}
            setDeleteFileId={setDeleteFileId}
            consolidatedObservations={consolidatedObservations}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateInternalAuditConsolidationReport;
