import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setupGetAllAuditExceptionsLight,
  setupGetAuditExceptionFilterOptions,
  setupExportAuditExceptions,
  handleReset,
} from "../../../../global-redux/reducers/reports/extra-report/slice";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
} from "@mui/material";

const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};

const FILTER_CONFIG = [
  { key: "natureThrough", label: "Nature Through" },
  { key: "location", label: "Location" },
  { key: "subLocation", label: "Sub-Location" },
  { key: "year", label: "Year" },
  { key: "auditee", label: "Auditee" },
  { key: "exceptionStatus", label: "Exception Status" },
];

const DEFAULT_FILTERS = {
  natureThrough: [],
  location: [],
  subLocation: [],
  year: [],
  auditee: [],
  exceptionStatus: [],
};

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

const toFilterParam = (values) =>
  Array.isArray(values) && values.length > 0 ? values.join(",") : "null";

const PaginatedAuditExceptionReport = () => {
  const dispatch = useDispatch();
  const {
    auditExceptionJobs = [],
    auditExceptionFilterOptions = {},
    auditExceptionTotalNoOfRecords = 0,
    loading,
    subLoading,
    exportLoading,
  } = useSelector((state) => state?.extraReport || {});
  const { user } = useSelector((state) => state?.auth || {});
  const { company } = useSelector((state) => state?.common || {});

  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = React.useState(DEFAULT_FILTERS);

  const companyId = React.useMemo(
    () => user?.[0]?.company?.find((c) => c?.companyName === company)?.id,
    [user, company]
  );

  const buildRequestPayload = React.useCallback(
    (pageNo, noOfRecords, filterValues) => ({
      companyId,
      page: pageNo,
      itemsPerPage: noOfRecords,
      natureThrough: toFilterParam(filterValues.natureThrough),
      location: toFilterParam(filterValues.location),
      subLocation: toFilterParam(filterValues.subLocation),
      year: toFilterParam(filterValues.year),
      auditee: toFilterParam(filterValues.auditee),
      exceptionStatus: toFilterParam(filterValues.exceptionStatus),
    }),
    [companyId]
  );

  const fetchAuditExceptions = React.useCallback(
    (pageNo, noOfRecords, filterValues) => {
      if (!companyId) return;
      dispatch(setupGetAllAuditExceptionsLight(buildRequestPayload(pageNo, noOfRecords, filterValues)));
    },
    [buildRequestPayload, companyId, dispatch]
  );

  React.useEffect(() => {
    if (!companyId) return;

    dispatch(setupGetAuditExceptionFilterOptions({ companyId }));
    fetchAuditExceptions(1, 10, DEFAULT_FILTERS);

    return () => {
      dispatch(handleReset());
    };
  }, [companyId, dispatch, fetchAuditExceptions]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: Array.isArray(value) ? value : value.split(","),
    }));
  };

  const handleApplyFilters = () => {
    setPage(1);
    setAppliedFilters(filters);
    fetchAuditExceptions(1, itemsPerPage, filters);
  };

  const handleChangePage = (_, value) => {
    setPage(value);
    fetchAuditExceptions(value, itemsPerPage, appliedFilters);
  };

  const handleChangeItemsPerPage = (event) => {
    const newLimit = Number(event.target.value);
    setPage(1);
    setItemsPerPage(newLimit);
    fetchAuditExceptions(1, newLimit, appliedFilters);
  };

  const handleExportExcel = () => {
    if (!companyId || exportLoading) return;

    dispatch(setupExportAuditExceptions(buildRequestPayload(1, itemsPerPage, appliedFilters)))
      .unwrap()
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Audit_Exception_Report.xlsx";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      });
  };

  const getFilterOptions = (key) => auditExceptionFilterOptions?.[key] || [];

  return (
    <div>
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Audit Exception Report</div>
        <Button
          variant="contained"
          onClick={handleExportExcel}
          disabled={exportLoading || loading}
          sx={{
            backgroundColor: "#0b7f91",
            color: "#fff",
            "&:hover": { backgroundColor: "#096f7f" },
            "&.Mui-disabled": {
              backgroundColor: "#0b7f91",
              color: "#fff",
              opacity: 0.75,
            },
          }}
        >
          {exportLoading ? "Exporting..." : "Export to Excel"}
        </Button>
      </header>

      <div className="row mb-3">
        {FILTER_CONFIG.map(({ key, label }) => (
          <div className="col-lg-2 mb-3" key={key}>
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
                disabled={subLoading}
              >
                {getFilterOptions(key).map((val) => (
                  <MenuItem key={String(val)} value={val}>
                    <Checkbox checked={filters[key].indexOf(val) > -1} style={poppinsStyle} />
                    <ListItemText primary={val} style={poppinsStyle} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
        <div className="col-lg-2 mb-3 d-flex align-items-center">
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            disabled={loading || subLoading}
            className="w-100"
            sx={{
              backgroundColor: "#0b7f91",
              color: "#fff",
              "&:hover": { backgroundColor: "#096f7f" },
              "&.Mui-disabled": {
                backgroundColor: "#0b7f91",
                color: "#fff",
                opacity: 0.75,
              },
            }}
          >
            {loading ? "Loading..." : "Filter"}
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive" style={{ overflowX: "hidden" }}>
            <table
              className="table table-bordered table-hover rounded"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead className="bg-secondary text-white">
                <tr>
                  <th style={{ width: 55 }}>Sr No.</th>
                  <th>Job Name</th>
                  <th>Observation</th>
                  <th>Nature</th>
                  <th>Location</th>
                  <th>Sub-Location</th>
                  <th style={{ width: 70 }}>Year</th>
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
                ) : auditExceptionJobs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center">
                      No Audit Exceptions To Show.
                    </td>
                  </tr>
                ) : (
                  auditExceptionJobs.map((item, idx) => (
                    <tr key={`${item?.reportingListId || idx}-${idx}`}>
                      <td className="text-break">{(page - 1) * itemsPerPage + idx + 1}</td>
                      <td className="text-break">{item?.jobName}</td>
                      <td className="text-break">{item?.shortObservation}</td>
                      <td className="text-break">{item?.nature}</td>
                      <td className="text-break">{item?.location}</td>
                      <td className="text-break">{item?.subLocation}</td>
                      <td className="text-break">{item?.year}</td>
                      <td className="text-break">{item?.auditee}</td>
                      <td className="text-break">{handleCalculateStatus(item?.stepNo)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {auditExceptionTotalNoOfRecords > 0 && (
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <Pagination
                    count={Math.ceil(auditExceptionTotalNoOfRecords / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                  />
                </div>
                <div className="col-lg-6 mb-4 d-flex justify-content-end">
                  <div>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                      <InputLabel id="items-per-page-label">Items Per Page</InputLabel>
                      <Select
                        labelId="items-per-page-label"
                        id="items-per-page"
                        label="Items Per Page"
                        value={itemsPerPage}
                        onChange={handleChangeItemsPerPage}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginatedAuditExceptionReport;
