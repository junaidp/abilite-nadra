import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllJobsForConsolidatedReport,
  setupCreateInternalAuditReportObject,
  handleResetData,
  setupSaveInternalAuditReport,
  resetInternalAuditReportAddSuccess,
  setupGetDetailedReportSourceLite,
  setupGetDetailedReportSingleObservation,
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
import { buildDetailedAuditReportSavePayload } from "../components/reportPayload";

const GenerateDetailedAuditReport = () => {
  const dispatch = useDispatch();

  // Redux state
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const {
    jobsForConsolidatedReports,
    internalAuditReportObject,
    loading,
    internalAuditReportAddSuccess,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    detailedReportSource,
    detailedReportSourceLoading,
    detailedReportObservationLoading,
  } = useSelector((state) => state?.consolidationReport);

  // Local state
  const consolidatedObservations = React.useMemo(
    () =>
      detailedReportSource?.reportingList?.length
        ? groupObservationsBySubLocationAndArea(detailedReportSource.reportingList)
        : [],
    [detailedReportSource?.reportingList]
  );
  const [reportObject, setReportObject] = React.useState({});
  const [jobForInternalAuditReportId, setJobForInternalAuditReportId] = React.useState("");
  const [loadingObservationId, setLoadingObservationId] = React.useState(null);

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
      dispatch(setupSaveInternalAuditReport(buildDetailedAuditReportSavePayload(reportObject)));
    }
  };

  /** -------------------------------
   *  Effects
   *  ------------------------------- */

  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      dispatch(resetInternalAuditReportAddSuccess());
    }
  }, [dispatch, internalAuditReportAddSuccess]);


  // Initial load: fetch jobs for current company/year
  React.useEffect(() => {
    const companyId = user[0]?.company?.find((item) => item?.companyName === company)?.id;
    const isEmpty = Object.keys(internalAuditReportObject).length === 0;

    if (companyId && isEmpty) {
      dispatch(
        setupGetAllJobsForConsolidatedReport(
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

  // Merge the lightweight extra-field response without dropping report data.
  React.useEffect(() => {
    const extraFields =
      internalAuditReportExtraFieldsObject?.intAuditExtraFieldsList;

    if (Array.isArray(extraFields)) {
      setReportObject((prev) => ({
        ...prev,
        id: internalAuditReportExtraFieldsObject?.id || prev?.id,
        intAuditExtraFieldsList: extraFields,
      }));
    }
  }, [internalAuditReportExtraFieldsObject]);


  React.useEffect(() => {
    if (internalAuditReportObject?.reportingAndFollowUpId) {
      dispatch(
        setupGetDetailedReportSourceLite({
          reportingAndFollowUpId: Number(internalAuditReportObject.reportingAndFollowUpId),
        })
      );
    }
  }, [dispatch, internalAuditReportObject?.reportingAndFollowUpId]);

  const handleLoadObservation = React.useCallback(
    async (reportingId) => {
      const existingObservation = detailedReportSource?.reportingList?.find(
        (item) => Number(item?.id) === Number(reportingId)
      );

      if (existingObservation?.observationName || existingObservation?.implication) {
        return;
      }

      setLoadingObservationId(reportingId);
      try {
        const response = await dispatch(
          setupGetDetailedReportSingleObservation({ reportingId })
        ).unwrap();
        if (!response?.status) {
          throw new Error(response?.message || "Failed to load observation");
        }
        return response;
      } finally {
        setLoadingObservationId(null);
      }
    },
    [dispatch, detailedReportSource?.reportingList]
  );

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
                {jobsForConsolidatedReports?.map((item, index) => (
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
            consolidatedObservations={consolidatedObservations}
            observationsLoading={detailedReportSourceLoading}
            onContentChange={onContentChange}
            onLoadObservation={handleLoadObservation}
            loadingObservationId={detailedReportObservationLoading ? loadingObservationId : null}
          />
        )
      )}
    </div>
  );
};

export default GenerateDetailedAuditReport;
