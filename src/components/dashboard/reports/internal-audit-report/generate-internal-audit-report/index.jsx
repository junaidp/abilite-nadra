import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllJobsForInternalAuditReport,
  setupCreateInternalAuditReportObject,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
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
  const { jobsForInternalAuditReports, internalAuditReportObject, loading } =
    useSelector((state) => state?.internalAuditReports);
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

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllJobsForInternalAuditReport(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
    return () => {
      dispatch(handleResetData());
    };
  }, [user, year, company]);

  return (
    <div>
      <Header />
      {Object.keys(internalAuditReportObject).length === 0 &&
        internalAuditReportObject.constructor === Object && (
          <div className="row pt-4">
            <div className="col-lg-10">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Reporting And Follow Up
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={jobForInternalAuditReportId}
                  label="Reporting And Follow Up"
                  onChange={handleChange}
                >
                  <MenuItem vlaue="">Select One</MenuItem>
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
            internalAuditReportObject={internalAuditReportObject}
          />
        )
      )}
    </div>
  );
};

export default GenerateInternalAuditReport;
