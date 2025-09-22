import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setupGetAllAuditExceptions,
  handleReset,
} from "../../../../global-redux/reducers/reports/extra-report/slice";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";

const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};

// Known job natures that backend may return
const KNOWN_NATURES = new Set([
  "Previous Observation",
  "Compliance Checklist",
  "Business Objective",
]);

const AuditExceptionReport = () => {
  const dispatch = useDispatch();

  // redux state
  const { auditExceptionJobs = [], loading } = useSelector(
    (state) => state?.extraReport || {}
  );
  const { user } = useSelector((state) => state?.auth || {});
  const { company } = useSelector((state) => state?.common || {});

  // local UI state
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState({
    natureThrough: [],
    location: [],
    subLocation: [],
    year: [],
    auditee: [],
    exceptionStatus: [],
  });

  // helper: determine exception status label from step number
  function handleCalculateStatus(step) {
    if (Number(step) === 0 || Number(step) === 1) {
      return "Exceptions To Be Sent To Management For Comments";
    }
    if (Number(step) === 2) return "Awaiting Management Comments";
    if (Number(step) === 3) return "Management Comments Received";
    if (Number(step) === 4 || Number(step) === 5)
      return "Exception To Be Implemented";
    if (Number(step) === 6) return "Exceptions Implemented";
    return "Observation Completed";
  }

  // fetch all audit exceptions once (on mount or when user/company become available)
  React.useEffect(() => {
    const companyId = user?.[0]?.company?.find((c) => c?.companyName === company)
      ?.id;

    dispatch(
      setupGetAllAuditExceptions({
        companyId: companyId,
        // keep previous semantics: send null when "Both"/empty
        natureThrough: null,
        location: null,
        subLocation: null,
        stepNo: -1,
      })
    );

    return () => {
      dispatch(handleReset());
    };
    // include user/company so fetch can run when they become available
  }, [dispatch, user, company]);

  // ---------- parsing logic ----------
  // backend sometimes shifts fields by inserting a "long" observation string
  // before the nature, so nature can appear at job[5] OR job[6].
  // This function normalizes the array into a friendly object.
  const parseJob = React.useCallback((jobArr) => {
    // default safe values
    const job = jobArr || [];
    // decide where the 'nature' lives: index 5 or 6
    const natAt5 = job[5] && KNOWN_NATURES.has(job[5]);
    const natAt6 = job[6] && KNOWN_NATURES.has(job[6]);

    // prefer explicit detection; fallback to index 5 if neither matches
    const natureIndex = natAt5 ? 5 : natAt6 ? 6 : 5;
    const nature = job[natureIndex] || "";

    // if the nature was found at index 6, then job[5] is the inserted long text (may be null)
    // when natureIndex===6 we treat job[5] as the "longObservation" for Previous Observation
    const longObservation =
      natureIndex === 6 && typeof job[5] === "string" ? job[5] : "";

    // job name tends to be at index 1 (fallback to index 2 if missing)
    const jobName = job[1] || job[2] || "";

    // the short/truncated observation remains at index 4 in both shapes
    const shortObservation = job[4] || "";

    // compute following fields relative to the nature index:
    // year = job[natureIndex + 1]
    // location = job[natureIndex + 2]
    // subLocation = job[natureIndex + 3]
    // stepNo = job[natureIndex + 4]
    // auditee = job[natureIndex + 5]
    const year = job[natureIndex + 1] ?? "";
    const location = job[natureIndex + 2] ?? "";
    const subLocation = job[natureIndex + 3] ?? "";
    const stepNo = job[natureIndex + 4] ?? "";
    const auditee = job[natureIndex + 5] ?? "";

    return {
      raw: job,
      jobName,
      shortObservation,
      longObservation, // may be empty string
      nature,
      year,
      location,
      subLocation,
      stepNo,
      auditee,
    };
  }, []);

  // parsed jobs memoized
  const parsedJobs = React.useMemo(() => {
    if (!Array.isArray(auditExceptionJobs)) return [];
    return auditExceptionJobs.map(parseJob);
  }, [auditExceptionJobs, parseJob]);

  // helper to remove falsy/empty values and keep unique items
  const uniq = (arr = []) =>
    Array.from(new Set(arr.filter((v) => v !== null && v !== undefined && v !== "")));

  // unique values used to populate multi-select options (derived from parsed jobs)
  const uniqueValues = React.useMemo(() => {
    return {
      natureThrough: uniq(parsedJobs.map((p) => p.nature)),
      location: uniq(parsedJobs.map((p) => p.location)),
      subLocation: uniq(parsedJobs.map((p) => p.subLocation)),
      year: uniq(parsedJobs.map((p) => p.year)),
      auditee: uniq(parsedJobs.map((p) => p.auditee)),
      exceptionStatus: uniq(parsedJobs.map((p) => handleCalculateStatus(p.stepNo))),
    };
  }, [parsedJobs]);

  // ---------- filtering ----------
  // compute filtered data from parsedJobs & filters (frontend-only filtering)
  const filteredData = React.useMemo(() => {
    if (!parsedJobs) return [];

    const result = parsedJobs.filter((p) => {
      return (
        (filters.natureThrough.length === 0 ||
          filters.natureThrough.includes(p.nature)) &&
        (filters.location.length === 0 ||
          filters.location.includes(p.location)) &&
        (filters.subLocation.length === 0 ||
          filters.subLocation.includes(p.subLocation)) &&
        (filters.year.length === 0 || filters.year.includes(p.year)) &&
        (filters.auditee.length === 0 ||
          filters.auditee.includes(p.auditee)) &&
        (filters.exceptionStatus.length === 0 ||
          filters.exceptionStatus.includes(handleCalculateStatus(p.stepNo)))
      );
    });

    return result;
  }, [parsedJobs, filters]);

  // keep page reset to 1 whenever filteredData changes (UX convenience)
  React.useEffect(() => {
    setPage(1);
  }, [filteredData]);

  // handle multi-select value changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Export current filtered data to Excel
  // IMPORTANT: For "Previous Observation" we export the LONG string if present,
  // otherwise an empty string (per your requirement). For other job types we export the short observation.
  const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

  const handleExportExcel = () => {
    const rows = filteredData.map((p, idx) => {
      const observationForExcel =
        p.nature === "Previous Observation" ? stripHtml(p.longObservation) || "" : p.shortObservation || "";

      return {
        "Sr No.": idx + 1,
        "Job Name": p.jobName,
        Observation: observationForExcel,
        Nature: p.nature,
        Location: p.location,
        "Sub-Location": p.subLocation,
        Year: p.year,
        Auditee: p.auditee,
        "Exception Status": handleCalculateStatus(p.stepNo),
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Exceptions");
    XLSX.writeFile(workbook, `Audit_Exception_Report.xlsx`);
  };

  // pagination handler
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <div>
      {/* Header + export button */}
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Audit Exception Report</div>
        <Button variant="contained" onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </header>

      {/* Filters (Material UI multi-selects) */}
      <div className="row mb-3">
        {/* Render filters in a fixed order */}
        {[
          { key: "natureThrough", label: "Nature Through" },
          { key: "location", label: "Location" },
          { key: "subLocation", label: "Sub-Location" },
          { key: "year", label: "Year" },
          { key: "auditee", label: "Auditee" },
          { key: "exceptionStatus", label: "Exception Status" },
        ].map(({ key, label }) => (
          <div className="col-lg-2" key={key}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: 12 }} style={poppinsStyle}>
                {label}
              </InputLabel>
              <Select
                multiple
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => (Array.isArray(selected) ? selected.join(", ") : "")}
                sx={{ height: 45 }}
              >
                {(uniqueValues[key] || []).map((val) => (
                  <MenuItem key={String(val)} value={val}>
                    <Checkbox checked={filters[key].indexOf(val) > -1} style={poppinsStyle} />
                    <ListItemText primary={val} style={poppinsStyle} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Sr No.</th>
                  <th>Job Name</th>
                  <th>Observation</th>
                  <th>Nature</th>
                  <th>Location</th>
                  <th>Sub-Location</th>
                  <th>Year</th>
                  <th>Auditee</th>
                  <th>Exception Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center">
                      No Audit Exceptions To Show.
                    </td>
                  </tr>
                ) : (
                  filteredData
                    .slice((page - 1) * 10, page * 10)
                    .map((p, idx) => (
                      <tr key={idx}>
                        <td>{(page - 1) * 10 + idx + 1}</td>
                        <td>{p.jobName}</td>
                        {/* For table view we show the short/truncated observation (keeps table compact).
                            Full/long observation is exported to Excel for Previous Observation rows. */}
                        <td>{p.shortObservation}</td>
                        <td>{p.nature}</td>
                        <td>{p.location}</td>
                        <td>{p.subLocation}</td>
                        <td>{p.year}</td>
                        <td>{p.auditee}</td>
                        <td>{handleCalculateStatus(p.stepNo)}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination
              count={Math.ceil(filteredData.length / 10) || 1}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditExceptionReport;
