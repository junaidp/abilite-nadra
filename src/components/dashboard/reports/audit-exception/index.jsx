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
} from "@mui/material";
import * as XLSX from "xlsx";

const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};

const AuditExceptionReport = () => {
  const dispatch = useDispatch();
  const { auditExceptionJobs, loading } = useSelector(
    (state) => state?.extraReport
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);

  const [page, setPage] = React.useState(1);
  const data = {
    natureThrough: "Both",
    location: "",
    subLocation: "",
    stepNo: -1,
  }
  const [filters, setFilters] = React.useState({
    natureThrough: [],
    location: [],
    subLocation: [],
    year: [],
    auditee: [],
    exceptionStatus: [],
  });

  const [filteredData, setFilteredData] = React.useState([]);

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  function handleCalculateStatus(step) {
    if (Number(step) === 0 || Number(step) === 1) {
      return "Exceptions To Be Sent To Management For Comments";
    }
    if (Number(step) === 2) {
      return "Awaiting Management Comments";
    }
    if (Number(step) === 3) {
      return "Management Comments Received";
    }
    if (Number(step) === 4) {
      return "Exception To Be Implemented";
    }
    if (Number(step) === 5) {
      return "Exception To Be Implemented";
    }
    if (Number(step) === 6) {
      return "Exceptions Implemented";
    }
    return "Observation Completed";
  }

  // Call backend ONCE to get all audit exceptions
  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;

    dispatch(
      setupGetAllAuditExceptions({
        companyId: companyId,
        natureThrough:
          data?.natureThrough !== "" && data?.natureThrough !== "Both"
            ? data?.natureThrough
            : null,
        location: data?.location !== "" ? data?.location : null,
        subLocation: data?.subLocation !== "" ? data?.subLocation : null,
        stepNo: data?.stepNo !== "" ? data?.stepNo : -1,
      })
    );
    return () => {
      dispatch(handleReset());
    };
  }, [dispatch]);

  // When jobs change → reset filters + set filtered data
  React.useEffect(() => {
    setFilteredData(auditExceptionJobs || []);
  }, [auditExceptionJobs]);

  // Apply filters whenever filters state changes
  React.useEffect(() => {
    if (!auditExceptionJobs) return;

    let data = [...auditExceptionJobs];

    data = data.filter((job) => {
      const jobNature = job[5];
      const jobLocation = job[7];
      const jobSubLocation = job[8];
      const jobYear = job[6];
      const jobAuditee = job[10];
      const jobStatus = handleCalculateStatus(job[9]);

      return (
        (filters.natureThrough.length === 0 ||
          filters.natureThrough.includes(jobNature)) &&
        (filters.location.length === 0 ||
          filters.location.includes(jobLocation)) &&
        (filters.subLocation.length === 0 ||
          filters.subLocation.includes(jobSubLocation)) &&
        (filters.year.length === 0 || filters.year.includes(jobYear)) &&
        (filters.auditee.length === 0 ||
          filters.auditee.includes(jobAuditee)) &&
        (filters.exceptionStatus.length === 0 ||
          filters.exceptionStatus.includes(jobStatus))
      );
    });

    setFilteredData(data);
    setPage(1);
  }, [filters, auditExceptionJobs]);

  // Extract unique values for filter dropdowns
  const uniqueValues = React.useMemo(() => {
    if (!auditExceptionJobs) return {};

    return {
      natureThrough: [...new Set(auditExceptionJobs.map((job) => job[5]))],
      location: [...new Set(auditExceptionJobs.map((job) => job[7]))],
      subLocation: [...new Set(auditExceptionJobs.map((job) => job[8]))],
      year: [...new Set(auditExceptionJobs.map((job) => job[6]))],
      auditee: [...new Set(auditExceptionJobs.map((job) => job[10]))],
      exceptionStatus: [
        ...new Set(auditExceptionJobs.map((job) => handleCalculateStatus(job[9]))),
      ],
    };
  }, [auditExceptionJobs]);

  // Handle filter selection
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Export filtered data to Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((job, index) => ({
        "Sr No.": index + 1,
        "Job Name": job[5] === "Compliance Checklist" ? job[1] : job[5] === "Previous Observation" ? job[1] : job[2],
        Observation: job[4],
        Nature: job[5],
        Location: job[7],
        "Sub-Location": job[8],
        Year: job[6],
        Auditee: job[10],
        "Exception Status": handleCalculateStatus(job[9]),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Exceptions");
    XLSX.writeFile(workbook, "Audit_Exception_Report.xlsx");
  };

  return (
    <div>
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Audit Exception Report</div>
        <button className="btn btn-labeled btn-primary px-3 shadow"
          onClick={handleExportExcel}>
          Export to Excel
        </button>
      </header>

      {/* Filters */}
      <div className="row mb-3">
        {Object.keys(uniqueValues).map((key) => (
          <div className="col-lg-2" key={key}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: 12 }} style={poppinsStyle}
              >{key}</InputLabel>
              <Select
                multiple
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                input={<OutlinedInput label={key} />}
                renderValue={(selected) => selected.join(", ")}
                sx={{ height: 45 }}
              >
                {uniqueValues[key].map((val) => (
                  <MenuItem key={val} value={val}>
                    <Checkbox checked={filters[key].indexOf(val) > -1} style={poppinsStyle} sx={{ fontSize: 12 }} />
                    <ListItemText primary={val} style={poppinsStyle} sx={{ fontSize: 12 }} />
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
            <table className="table table-bordered  table-hover rounded">
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
                    <td colSpan="9" className="text-center">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No Audit Exceptions To Show.
                    </td>
                  </tr>
                ) : (
                  filteredData
                    .slice((page - 1) * 10, page * 10)
                    .map((job, index) => (
                      <tr key={index}>
                        <td>{(page - 1) * 10 + index + 1}</td>
                        <td>
                          {job[5] === "Compliance Checklist" ? job[1] : job[5] === "Previous Observation" ? job[1] : job[2]}
                        </td>
                        <td>{job[4]}</td>
                        <td>{job[5]}</td>
                        <td>{job[7]}</td>
                        <td>{job[8]}</td>
                        <td>{job[6]}</td>
                        <td>{job[10]}</td>
                        <td>{handleCalculateStatus(job[9])}</td>
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

export default AuditExceptionReport;