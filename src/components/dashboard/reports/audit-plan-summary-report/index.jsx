import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setupGetAllPlanSummaryReport,
  handleReset,
} from "../../../../global-redux/reducers/reports/extra-report/slice";
import { CircularProgress, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { encryptAndEncode } from "../../../../config/helper";
import * as XLSX from "xlsx";


const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};


const AuditPlanSummaryReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { planSummaryReports, loading } = useSelector(
    (state) => state?.extraReport
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);

  const [page, setPage] = React.useState(1);

  // Filters state
  const [filters, setFilters] = React.useState({
    location: [],
    subLocation: [],
    resource: [],
    auditableUnit: [],
  });

  // Derive companyId once
  const companyId = React.useMemo(() => {
    return user[0]?.company.find((all) => all?.companyName === company)?.id;
  }, [user, company]);

  // Initial fetch (send all props including nulls to preserve logic)
  React.useEffect(() => {
    dispatch(
      setupGetAllPlanSummaryReport({
        companyId,
        location: null,
        subLocation: null,
        riskRating: null,
        resource: null,
      })
    );
    return () => {
      dispatch(handleReset());
    };
  }, [dispatch, companyId]);

  // Helper: safely parse each job (array of values)
  const parseJob = React.useCallback((jobArr) => {
    if (!Array.isArray(jobArr)) return {};
    return {
      id: jobArr[0] ?? "",
      auditableUnit: jobArr[1] ?? "",
      riskRating: jobArr[2] ?? "",
      resource: jobArr[3] ?? "",
      location: jobArr[4] ?? "",
      subLocation: jobArr[5] ?? "",
    };
  }, []);

  // Parsed jobs
  const parsedJobs = React.useMemo(() => {
    if (!Array.isArray(planSummaryReports)) return [];
    return planSummaryReports.map(parseJob);
  }, [planSummaryReports, parseJob]);

  // Unique filter values
  const uniq = (arr = []) =>
    Array.from(new Set(arr.filter((v) => v !== null && v !== undefined && v !== "")));

  const uniqueValues = React.useMemo(() => {
    return {
      location: uniq(parsedJobs.map((p) => p.location)),
      subLocation: uniq(parsedJobs.map((p) => p.subLocation)),
      resource: uniq(parsedJobs.map((p) => p.resource)),
      auditableUnit: uniq(parsedJobs.map((p) => p.auditableUnit)),
    };
  }, [parsedJobs]);

  // Apply filters on frontend
  const filteredData = React.useMemo(() => {
    return parsedJobs.filter((p) => {
      return (
        (filters.location.length === 0 || filters.location.includes(p.location)) &&
        (filters.subLocation.length === 0 || filters.subLocation.includes(p.subLocation)) &&
        (filters.resource.length === 0 || filters.resource.includes(p.resource)) &&
        (filters.auditableUnit.length === 0 || filters.auditableUnit.includes(p.auditableUnit))
      );
    });
  }, [parsedJobs, filters]);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [filters, filteredData]);

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Export filtered data to Excel
  const handleExportExcel = () => {
    const rows = filteredData.map((p, idx) => ({
      "Sr No.": idx + 1,
      "Audit Job": p.auditableUnit,
      Resource: p.resource,
      Location: p.location,
      "Sub Location": p.subLocation,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Plan Summary Report");
    XLSX.writeFile(workbook, `Audit_Plan_Summary_Report.xlsx`);
  };

  // Paginated data
  const paginatedData = React.useMemo(() => {
    const start = (page - 1) * 10;
    return filteredData.slice(start, start + 10);
  }, [filteredData, page]);

  return (
    <div>
      {/* Header + Export button */}
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Audit Plan Summary Report</div>
        <Button variant="contained" onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </header>

      {/* Filters */}
      <div className="row mb-3">
        {[{ key: "location", label: "Location" },
        { key: "subLocation", label: "Sub Location" },
        { key: "resource", label: "Resource" },
        { key: "auditableUnit", label: "Auditable Unit" },
        ].map(({ key, label }) => (
          <div className="col-lg-3" key={key}>
            <FormControl fullWidth style={poppinsStyle}>
              <InputLabel sx={{ fontSize: 12 }} style={poppinsStyle}>{label}</InputLabel>
              <Select
                multiple
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                style={poppinsStyle}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => (Array.isArray(selected) ? selected.join(", ") : "")}
                sx={{ height: 45 }}
              >
                {(uniqueValues[key] || []).map((val) => (
                  <MenuItem key={String(val)} value={val} style={poppinsStyle}>
                    <Checkbox checked={filters[key].indexOf(val) > -1} />
                    <ListItemText primary={val} />
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
                  <th className="min-w-80">Sr No.</th>
                  <th>Audit Job</th>
                  <th>Resource</th>
                  <th>Location</th>
                  <th>Sub Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No Audit Plan Summary Reports To Show.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((job, index) => (
                    <tr key={index}>
                      <td>{(page - 1) * 10 + index + 1}</td>
                      <td>{job.auditableUnit}</td>
                      <td>{job.resource}</td>
                      <td>{job.location}</td>
                      <td>{job.subLocation}</td>
                      <td>
                        <i
                          className="fa-eye fa f-18 cursor-pointer"
                          onClick={() => {
                            const encryptedId = encryptAndEncode(job.id.toString());
                            navigate(`/audit/start-scheduling/${encryptedId}`);
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(filteredData.length / 10)}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditPlanSummaryReport;