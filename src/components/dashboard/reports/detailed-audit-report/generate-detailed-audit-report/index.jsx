import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllJobsForInternalAuditReport,
  setupCreateInternalAuditReportObject,
  handleResetData,
  setupSaveInternalAuditReport,
  resetInternalAuditReportAddSuccess,
  setupGetSingleInternalAuditReportAfterSave,
  resetFileUploadAddSuccess,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DetailedAuditReportLayout from "../components/DetailedAuditReportLayout";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { Chip, CircularProgress } from "@mui/material";
import { groupObservationsBySubLocationAndArea } from "../../../../../config/helper";

const GenerateDetailedAuditReport = () => {
  const dispatch = useDispatch();

  // Redux state
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const {
    jobsForInternalAuditReports,
    internalAuditReportObject,
    loading,
    internalAuditReportAddSuccess,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    consolidationFileUploadAddSuccess,
  } = useSelector((state) => state?.consolidationReport);

  // Local state
  const [consolidatedObservations, setConsolidatedObservations] = React.useState([]);
  const [reportObject, setReportObject] = React.useState({});
  const [jobForInternalAuditReportId, setJobForInternalAuditReportId] = React.useState("");
  const [deleteFileId, setDeleteFileId] = React.useState("");

  /** -------------------------------
   *  Handlers
   *  ------------------------------- */
  const handleChange = (event) => {
    setJobForInternalAuditReportId(event.target.value);
  };

  const handleGetInternalAuditReportObject = () => {
    if (!loading) {
      if (!jobForInternalAuditReportId) {
        toast.error("Please select a report");
      } else {
        dispatch(
          setupCreateInternalAuditReportObject(
            `?reportingAndFollowUpId=${Number(jobForInternalAuditReportId)}`
          )
        );
      }
    }
  };

  const handleChangeReportObject = (event) => {
    setReportObject((prev) => ({
      ...prev,
      [event?.target?.name]: event?.target?.value,
    }));
  };

  const handleChangeExtraFields = (event, id) => {
    setReportObject((prev) => ({
      ...prev,
      intAuditExtraFieldsList: prev?.intAuditExtraFieldsList?.map((field) =>
        Number(field?.id) === Number(id)
          ? { ...field, [event?.target?.name]: event?.target?.value }
          : field
      ),
    }));
  };

  const onContentChange = (value, name) => {
    setReportObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveInternalAuditReport = () => {
    if (!addReportLoading) {
      dispatch(setupSaveInternalAuditReport(reportObject));
    }
  };

  /** -------------------------------
   *  Effects
   *  ------------------------------- */

  // When report is successfully added, fetch the saved object
  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      dispatch(resetInternalAuditReportAddSuccess());
      if (internalAuditReportObject) {
        dispatch(
          setupGetSingleInternalAuditReportAfterSave(
            `?reportId=${Number(internalAuditReportObject?.id)}`
          )
        );
      }
    }
  }, [internalAuditReportAddSuccess]);

  // Handle file deletion from annexure uploads
  React.useEffect(() => {
    if (consolidationFileUploadAddSuccess) {
      dispatch(resetFileUploadAddSuccess());
      dispatch(
        setupSaveInternalAuditReport({
          ...reportObject,
          annexureUploads: reportObject?.annexureUploads?.filter(
            (file) => file?.id !== deleteFileId
          ),
        })
      );
      setDeleteFileId("");
    }
  }, [consolidationFileUploadAddSuccess]);

  // Initial load: fetch jobs for current company/year
  React.useEffect(() => {
    const companyId = user[0]?.company?.find((item) => item?.companyName === company)?.id;
    const isEmpty = Object.keys(internalAuditReportObject).length === 0;

    if (companyId && isEmpty) {
      dispatch(
        setupGetAllJobsForInternalAuditReport(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
  }, [dispatch, year]);

  // Sync Redux report object into local state
  React.useEffect(() => {
    const hasData = Object.keys(internalAuditReportObject).length !== 0;
    if (hasData) {
      setReportObject(internalAuditReportObject);
    }
  }, [internalAuditReportObject]);

  // Sync extra fields into report object
  React.useEffect(() => {
    const hasExtraFields = Object.keys(internalAuditReportExtraFieldsObject).length !== 0;
    if (hasExtraFields) {
      setReportObject((prev) => ({
        ...internalAuditReportExtraFieldsObject,
        // Keep certain properties from previous state
        reportName: prev?.reportName,
        reportDate: prev?.reportDate,
        executiveSummary: prev?.executiveSummary,
        auditPurpose: prev?.auditPurpose,
        annexure: prev?.annexure,
        consolidatedIARKeyFindingsList: prev?.consolidatedIARKeyFindingsList,
        annexureUploads: prev?.annexureUploads,
        summaryOfKeyFindingsList: prev?.summaryOfKeyFindingsList,
      }));
    }
  }, [internalAuditReportExtraFieldsObject]);

  // Build consolidated observations
  React.useEffect(() => {
    if (internalAuditReportObject?.reportingsList) {
      setConsolidatedObservations(
        groupObservationsBySubLocationAndArea(internalAuditReportObject?.reportingsList)
      );
    }
  }, [internalAuditReportObject]);

  // Sidebar active link + cleanup
  React.useEffect(() => {
    dispatch(changeActiveLink("li-consolidation-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleResetData());
    };
  }, []);

  /** -------------------------------
   *  Render
   *  ------------------------------- */
  return (
    <div className="overflow-y-hidden">
      <Header title="Detailed Audit Report" />

      {/* Step 1: Report selection dropdown */}
      {Object.keys(internalAuditReportObject).length === 0 && (
        <div className="row pt-4">
          <div className="col-lg-10">
            <FormControl fullWidth>
              <InputLabel id="report-select-label">Detailed Audit Report</InputLabel>
              <Select
                labelId="report-select-label"
                value={jobForInternalAuditReportId}
                label="Reporting And Follow Up"
                onChange={handleChange}
              >
                <MenuItem value="">Select One</MenuItem>
                {jobsForInternalAuditReports?.map((item, index) => (
                  <MenuItem
                    value={item?.id}
                    key={index}
                    sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {item?.title}
                    {item.subLocationList.map((location, locIndex) => (
                      <Chip key={locIndex} label={location.description} sx={{ ml: 2 }} />
                    ))}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="col-lg-2">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow my-4 ${loading ? "disabled" : ""
                }`}
              onClick={handleGetInternalAuditReportObject}
            >
              {loading ? "Loading.." : "Create Report"}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Report editor */}
      {loading ? (
        <CircularProgress />
      ) : (
        Object.keys(internalAuditReportObject).length !== 0 && (
          <DetailedAuditReportLayout
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            setDeleteFileId={setDeleteFileId}
            consolidatedObservations={consolidatedObservations}
            onContentChange={onContentChange}
          />
        )
      )}
    </div>
  );
};

export default GenerateDetailedAuditReport;
