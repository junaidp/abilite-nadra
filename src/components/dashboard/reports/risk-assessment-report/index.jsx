import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setupGetRiskAssessementReport,
    handleReset,
} from "../../../../global-redux/reducers/reports/extra-report/slice";
import {
    CircularProgress,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Chip,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import * as XLSX from "xlsx";

const poppinsStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "normal",
};

// ---------- Risk Score Calculator ----------
const handleCalculateRiskScore = (item) => {
    let num = 0;

    if (Array.isArray(item?.riskFactorValues) && item.riskFactorValues.length > 0) {
        item.riskFactorValues.forEach((element) => {
            const v1 = Number(element?.value1 ?? 0);
            const v2 = Number(element?.value2 ?? 0);
            if (!isNaN(v1) && !isNaN(v2)) {
                num += (v1 / 100) * v2;
            }
        });
    }

    const likelihood = Number(item?.likelihood ?? 0);
    const impact = Number(item?.impact ?? 0);
    const result = num * (impact / 100) * likelihood;

    return Number(result.toFixed(2));
};

const RiskAssessmentReport = () => {
    const dispatch = useDispatch();
    const mountedRef = React.useRef(false);

    // ---- Redux state ----
    const { riskAssessmentReport, loading } = useSelector(
        (state) => state?.extraReport || {}
    );
    const { user } = useSelector((state) => state?.auth || {});
    const { company } = useSelector((state) => state?.common || {});

    // ---- Company Id ----
    const companyId = React.useMemo(() => {
        return user?.[0]?.company?.find((all) => all?.companyName === company)?.id;
    }, [user, company]);

    // ---- Year (API-driven) ----
    const currentYear = React.useMemo(() => new Date().getFullYear(), []);
    const years = React.useMemo(() => {
        const span = [];
        for (let y = currentYear - 5; y <= currentYear + 5; y++) span.push(y);
        return span;
    }, [currentYear]);
    const [selectedYear, setSelectedYear] = React.useState(currentYear);

    // ---- Local pagination ----
    const [page, setPage] = React.useState(1);

    // ---- Local filters ----
    const [filters, setFilters] = React.useState({
        location: [],
        subLocation: [],
        department: [],
        subDepartment: [],
    });

    // ---- Initial fetch + cleanup ----
    React.useEffect(() => {
        if (!companyId || !selectedYear) return;

        dispatch(
            setupGetRiskAssessementReport({
                companyId,
                year: selectedYear,
            })
        );

        if (mountedRef.current) {
            // reset filters on year change
            setFilters({
                location: [],
                subLocation: [],
                department: [],
                subDepartment: [],
            });
            setPage(1);
        } else {
            mountedRef.current = true; // first mount
        }

        return () => {
            dispatch(handleReset());
        };
    }, [dispatch, companyId, selectedYear]);

    // ---- Flatten API response: 1 row per risk ----
    const rawData = Array.isArray(riskAssessmentReport)
        ? riskAssessmentReport
        : [];

    const rows = React.useMemo(() => {
        const out = [];
        rawData.forEach((item) => {
            const objective = item?.objective ?? "";

            const locations =
                item?.locations?.map((l) => l?.description).filter(Boolean) ?? [];
            const subLocations =
                item?.subLocations?.map((sl) => sl?.description).filter(Boolean) ?? [];
            const departments =
                item?.departments?.map((d) => d?.description).filter(Boolean) ?? [];
            const subDepartments =
                item?.subDepartments?.map((sd) => sd?.description).filter(Boolean) ?? [];

            const jobs = Array.isArray(item?.auditableJobs)
                ? item.auditableJobs
                : [];

            if (jobs.length === 0) {
                out.push({
                    objective,
                    auditJob: "",
                    risk: "",
                    riskScore: 0,
                    _locations: locations,
                    _subLocations: subLocations,
                    _departments: departments,
                    _subDepartments: subDepartments,
                });
                return;
            }

            jobs.forEach((job) => {
                const auditJob = job?.auditJob ?? "";
                const risks = Array.isArray(job?.riskAssessments)
                    ? job.riskAssessments
                    : [];

                if (risks.length === 0) {
                    out.push({
                        objective,
                        auditJob,
                        risk: "",
                        riskScore: 0,
                        _locations: locations,
                        _subLocations: subLocations,
                        _departments: departments,
                        _subDepartments: subDepartments,
                    });
                } else {
                    risks.forEach((riskItem) => {
                        const risk = riskItem?.risk ?? "";
                        const riskScore = handleCalculateRiskScore(riskItem);
                        out.push({
                            objective,
                            auditJob,
                            risk,
                            riskScore,
                            _locations: locations,
                            _subLocations: subLocations,
                            _departments: departments,
                            _subDepartments: subDepartments,
                        });
                    });
                }
            });
        });
        return out;
    }, [rawData]);

    // ---- Unique filter values ----
    const uniq = (arr = []) =>
        Array.from(
            new Set(arr.filter((v) => v !== null && v !== undefined && v !== ""))
        );

    const uniqueValues = React.useMemo(() => {
        return {
            location: uniq(rows.flatMap((r) => r._locations || [])),
            subLocation: uniq(rows.flatMap((r) => r._subLocations || [])),
            department: uniq(rows.flatMap((r) => r._departments || [])),
            subDepartment: uniq(rows.flatMap((r) => r._subDepartments || [])),
        };
    }, [rows]);

    // ---- Apply local filters ----
    const hasAny = (selected, values = []) =>
        selected.length === 0 || selected.some((s) => values.includes(s));

    const filteredData = React.useMemo(() => {
        return rows.filter((r) => {
            return (
                hasAny(filters.location, r._locations) &&
                hasAny(filters.subLocation, r._subLocations) &&
                hasAny(filters.department, r._departments) &&
                hasAny(filters.subDepartment, r._subDepartments)
            );
        });
    }, [rows, filters]);

    React.useEffect(() => {
        setPage(1);
    }, [filteredData, filters]);

    const handleChangePage = (_, value) => setPage(value);
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };
    const handleYearChange = (event) => setSelectedYear(event.target.value);

    // ---- Export to Excel ----
    const handleExportExcel = () => {
        const rowsForXlsx = filteredData.map((r, idx) => ({
            "Sr No.": idx + 1,
            Risk: r.risk,
            "Risk Score": r.riskScore,
            "Audit Job": r.auditJob,
            Objective: r.objective,
            Department: (r._departments || []).join(", "),
            "Sub Department": (r._subDepartments || []).join(", "),
            Location: (r._locations || []).join(", "),
            "Sub Location": (r._subLocations || []).join(", "),
        }));

        const worksheet = XLSX.utils.json_to_sheet(rowsForXlsx);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Risk Assessment");
        XLSX.writeFile(workbook, `Risk_Assessment_Report_${selectedYear}.xlsx`);
    };

    // ---- Pagination ----
    const paginatedData = React.useMemo(() => {
        const start = (page - 1) * 10;
        return filteredData.slice(start, start + 10);
    }, [filteredData, page]);

    return (
        <div>
            {/* Header + Export button */}
            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
                <div className="mb-0 heading">Risk Assessment Report</div>
                <Button variant="contained" onClick={handleExportExcel}>
                    Export to Excel
                </Button>
            </header>

            {/* Filters */}
            <div className="row mb-3">
                {/* Year Filter */}
                <div className="col-lg-3">
                    <FormControl fullWidth style={poppinsStyle}>
                        <InputLabel sx={{ fontSize: 12 }} style={poppinsStyle}>
                            Year
                        </InputLabel>
                        <Select
                            name="year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            style={poppinsStyle}
                            input={<OutlinedInput label="Year" />}
                            sx={{ height: 45 }}
                        >
                            {years.map((y) => (
                                <MenuItem key={y} value={y} style={poppinsStyle}>
                                    {y}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Local Filters */}
                {[
                    { key: "location", label: "Location" },
                    { key: "subLocation", label: "Sub Location" },
                    { key: "department", label: "Department" },
                    { key: "subDepartment", label: "Sub Department" },
                ].map(({ key, label }) => (
                    <div className="col-lg-2" key={key}>
                        <FormControl fullWidth style={poppinsStyle}>
                            <InputLabel sx={{ fontSize: 12 }} style={poppinsStyle}>
                                {label}
                            </InputLabel>
                            <Select
                                multiple
                                name={key}
                                value={filters[key]}
                                onChange={handleFilterChange}
                                style={poppinsStyle}
                                input={<OutlinedInput label={label} />}
                                renderValue={(selected) =>
                                    Array.isArray(selected) ? selected.join(", ") : ""
                                }
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
                                    <th>Risk</th>
                                    <th>Risk Score</th>
                                    <th>Audit Job</th>
                                    <th>Objective</th>
                                    <th>Department</th>
                                    <th>Sub Department</th>
                                    <th>Location</th>
                                    <th>Sub Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={9} className="text-center">
                                            <CircularProgress />
                                        </td>
                                    </tr>
                                ) : paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="text-center">
                                            No Risk Assessment Reports To Show.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData.map((r, index) => (
                                        <tr key={`${r.objective}-${r.auditJob}-${r.risk}-${index}`}>
                                            <td>{(page - 1) * 10 + index + 1}</td>
                                            <td>{r.risk || "-"}</td>
                                            <td>{r.riskScore ?? 0}</td>
                                            <td>{r.auditJob || "-"}</td>
                                            <td>{r.objective || "-"}</td>

                                            {/* Departments */}
                                            <td>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    {(r._departments?.length
                                                        ? r._departments.map((item, idx) => (
                                                            <Chip key={idx} label={item} />
                                                        ))
                                                        : ["-"])}
                                                </div>
                                            </td>

                                            {/* Sub Departments */}
                                            <td>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    {(r._subDepartments?.length
                                                        ? r._subDepartments.map((item, idx) => (
                                                            <Chip key={idx} label={item} />
                                                        ))
                                                        : ["-"])}
                                                </div>
                                            </td>

                                            {/* Locations */}
                                            <td>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    {(r._locations?.length
                                                        ? r._locations.map((item, idx) => (
                                                            <Chip key={idx} label={item} />
                                                        ))
                                                        : ["-"])}
                                                </div>
                                            </td>

                                            {/* Sub Locations */}
                                            <td>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    {(r._subLocations?.length
                                                        ? r._subLocations.map((item, idx) => (
                                                            <Chip key={idx} label={item} />
                                                        ))
                                                        : ["-"])}
                                                </div>
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

export default RiskAssessmentReport;
