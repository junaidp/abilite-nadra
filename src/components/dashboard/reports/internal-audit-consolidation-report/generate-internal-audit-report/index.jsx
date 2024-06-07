import React from "react";
import "./index.css";
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
import InternalAuditReportBody from "./components/InternalAuditReportBody";
import Header from "./components/Header";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const GenerateInternalAuditReport = () => {
  const dispatch = useDispatch();
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
  } = useSelector((state) => state?.consolidationReports);
  const [reportObject, setReportObject] = React.useState({});
  const [jobForInternalAuditReportId, setJobForInternalAuditReportId] =
    React.useState("");

  const handleChange = (event) => {
    setJobForInternalAuditReportId(event.target.value);
  };

  function handleGetInternalAuditReportObject() {
    if (!loading) {
      if (jobForInternalAuditReportId === "") {
        toast.error("Please Select Report");
      }
      if (jobForInternalAuditReportId !== "") {
        dispatch(
          setupCreateInternalAuditReportObject(
            `?reportingAndFollowUpId=${Number(jobForInternalAuditReportId)}`
          )
        );
      }
    }
  }

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
      if (internalAuditReportObject) {
        dispatch(
          setupGetSingleInternalAuditReportAfterSave(
            `?reportId=${Number(internalAuditReportObject?.id)}`
          )
        );
      }
    }
  }, [internalAuditReportAddSuccess]);

  React.useEffect(() => {
    if (consolidationFileUploadAddSuccess) {
      dispatch(resetFileUploadAddSuccess());
      dispatch(setupSaveInternalAuditReport(reportObject));
    }
  }, [consolidationFileUploadAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    let isNull =
      Object.keys(internalAuditReportObject).length === 0 &&
      internalAuditReportObject.constructor === Object;
    if (companyId && isNull) {
      dispatch(
        setupGetAllJobsForInternalAuditReport(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
  }, [user, year, company]);

  React.useEffect(() => {
    let isNotNull =
      Object.keys(internalAuditReportObject).length !== 0 &&
      internalAuditReportObject.constructor === Object;
    if (isNotNull) {
      setReportObject(internalAuditReportObject);
    }
  }, [internalAuditReportObject]);

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
    dispatch(changeActiveLink("li-consolidation-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleResetData());
    };
  }, []);

  return (
    <div className="overflow-y-hidden">
      <Header />
      {Object.keys(internalAuditReportObject).length === 0 &&
        internalAuditReportObject.constructor === Object && (
          <div className="row pt-4">
            <div className="col-lg-10">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Consolidation Report
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={jobForInternalAuditReportId}
                  label="Reporting And Follow Up"
                  onChange={handleChange}
                >
                  <MenuItem value="">Select One</MenuItem>
                  {jobsForInternalAuditReports?.map((item, index) => {
                    return (
                      <MenuItem value={item?.id} key={index}>
                        {item?.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-2">
              <div
                className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
                  loading && "disabled"
                }`}
                onClick={handleGetInternalAuditReportObject}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-check-circle f-18"></i>
                </span>
                {loading ? "Loading.." : "Create Report"}
              </div>
            </div>
          </div>
        )}
      {loading ? (
        <CircularProgress />
      ) : (
        Object.keys(internalAuditReportObject).length !== 0 &&
        internalAuditReportObject.constructor === Object && (
          <InternalAuditReportBody
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleChangeExcutiveSummary={handleChangeExcutiveSummary}
            handleChangeAuditPurpose={handleChangeAuditPurpose}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            handleChangeAnnexure={handleChangeAnnexure}
          />
        )
      )}
    </div>
  );
};

export default GenerateInternalAuditReport;
