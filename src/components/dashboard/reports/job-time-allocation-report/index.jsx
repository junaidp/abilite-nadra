import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setupGetAllTimeAllocation,
  setupGetAllLocations,
  handleReset,
} from "../../../../global-redux/reducers/reports/extra-report/slice";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { encryptAndEncode } from "../../../../config/helper";


const PAGE_SIZE = 10;

const JobTimeAllocationReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors from the redux store
  const { resourceTimeAllocationJobs = [], loading, locations = [] } = useSelector(
    (state) => state?.extraReport ?? {}
  );
  const { user } = useSelector((state) => state?.auth ?? {});
  const { company } = useSelector((state) => state?.common ?? {});

  // Local UI state
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState({
    natureThrough: "Both", // default
    location: "",
    subLocation: "",
  });

  // Compute companyId once when user/company change. Keeps behaviour but avoids repeated array scans.
  const companyId = React.useMemo(() => {
    return user?.[0]?.company?.find((c) => c?.companyName === company)?.id ?? null;
  }, [user, company]);

  // We will perform one initial sequential fetch: locations first, then time allocation.
  // Use a ref to mark that the initial fetch finished so subsequent "data" changes trigger new time allocation calls.
  const initialFetchCompletedRef = React.useRef(false);

  // Compute sub-locations for the current selected location (derived from `locations` + `data.location`).
  const subLocations = React.useMemo(() => {
    if (!locations?.length || !data?.location) return [];
    return locations.find((loc) => loc?.description === data.location)?.subLocations ?? [];
  }, [locations, data.location]);

  // Memoize paginated items for the current page
  const paginatedJobs = React.useMemo(() => {
    const list = resourceTimeAllocationJobs || [];
    const start = (page - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  }, [resourceTimeAllocationJobs, page]);

  // first shows total then category breakdowns.
  const getUserString = React.useCallback((job) => {
    if (!Array.isArray(job)) return "";

    const categories = [
      { idx: 4, label: "Business" },
      { idx: 5, label: "Fraud" },
      { idx: 6, label: "Finance" },
      { idx: 7, label: "IT" },
      { idx: 8, label: "Operations" },
      { idx: 9, label: "Others" },
    ];

    // total as the sum of those indices (keeps original numeric addition semantics)
    const total = categories.reduce((sum, c) => sum + (Number(job[c.idx]) || 0), 0);

    // Build the readable string  (total + breakdown)
    let str = `${total} (`;
    categories.forEach((c) => {
      const val = Number(job[c.idx]) || 0;
      if (val > 0) {
        str += `${val} (${c.label}) `;
      }
    });
    str = str.trim() + ")";

    return str;
  }, []);

  // Stable handler for page changes
  const handleChangePage = React.useCallback((_, value) => {
    setPage(value);
  }, []);

  // Stable change handler for form/select inputs.
  const handleChange = React.useCallback((event) => {
    const name = event?.target?.name;
    const value = event?.target?.value;

    if (name === "location") {
      setData((prev) => ({
        ...prev,
        location: value,
        subLocation: "", // reset sub-location when location changes
      }));
      return;
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Initial mount: fetch locations first, then fetch initial time allocation.
  React.useEffect(() => {
    if (!companyId) return;

    let cancelled = false;

    const fetchInitialSequential = async () => {
      try {
        // 1) fetch locations
        await dispatch(setupGetAllLocations({ companyId }));

        // 2) once locations are fetched, fetch time allocations with the current filters
        // we map `Both` -> null to preserve old filter logic.
        await dispatch(
          setupGetAllTimeAllocation({
            companyId,
            natureThrough:
              data?.natureThrough !== "" && data?.natureThrough !== "Both"
                ? data?.natureThrough
                : null,
            location: data?.location !== "" ? data?.location : null,
            subLocation: data?.subLocation !== "" ? data?.subLocation : null,
          })
        );
      } catch (err) {
        console.error("Error during initial data fetch:", err);
      } finally {
        if (!cancelled) initialFetchCompletedRef.current = true;
      }
    };

    fetchInitialSequential();

    // Cleanup: dispatch handleReset on unmount.
    return () => {
      cancelled = true;
      dispatch(handleReset());
    };
  }, [dispatch, companyId, data?.natureThrough, data?.location, data?.subLocation]);

  // Effect for subsequent changes to the filters (`data`): fetch time allocation again.
  // We skip the first run if initial fetch already handled it (avoid duplicate request).
  React.useEffect(() => {
    if (!companyId) return;

    // Do not trigger on the very first render if initial fetch already handled time allocation.
    if (!initialFetchCompletedRef.current) return;

    let cancelled = false;
    const fetchFiltered = async () => {
      try {
        await dispatch(
          setupGetAllTimeAllocation({
            companyId,
            natureThrough:
              data?.natureThrough !== "" && data?.natureThrough !== "Both"
                ? data?.natureThrough
                : null,
            location: data?.location !== "" ? data?.location : null,
            subLocation: data?.subLocation !== "" ? data?.subLocation : null,
          })
        );

        // When new results arrive, original code resets page to 1 — we keep that behavior.
        if (!cancelled) setPage(1);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching filtered time allocation:", err);
      }
    };

    fetchFiltered();

    return () => {
      cancelled = true;
    };
    // Note: dependencies include `data` and `companyId` to ensure correct behavior when filters change.
  }, [dispatch, data, companyId]);

  // Keep the original behavior: when resourceTimeAllocationJobs change, reset page to 1.
  // This is redundant with the setPage call above, but preserves the original effect's intent.
  React.useEffect(() => {
    if (resourceTimeAllocationJobs) {
      setPage(1);
    }
  }, [resourceTimeAllocationJobs]);

  return (
    <div>
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Job Time Allocation Report</div>
      </header>

      {/* Filters row */}
      <div className="row mb-3">
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Nature Through:</label>
            <select
              className="form-select"
              aria-label="Nature Through"
              value={data?.natureThrough}
              name="natureThrough"
              onChange={handleChange}
            >
              <option value="Business Objective">Business Objective</option>
              <option value="Compliance Checklist">Compliance Checklist</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>

        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Location:</label>
            <select
              className="form-select"
              aria-label="Location"
              value={data?.location}
              name="location"
              onChange={handleChange}
            >
              <option value="">All</option>
              {locations?.map((location, index) => (
                <option value={location?.description} key={index}>
                  {location?.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Sub Location:</label>
            <select
              className="form-select"
              aria-label="Sub Location"
              value={data?.subLocation}
              name="subLocation"
              onChange={handleChange}
            >
              <option value="">select sub-location</option>
              {subLocations?.map((subLocation, idx) => (
                <option value={subLocation?.description} key={idx}>
                  {subLocation?.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="min-w-80">Sr No.</th>
                  <th>Job Name</th>
                  <th>Nature</th>
                  <th>Resources</th>
                  <th>Time</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : (resourceTimeAllocationJobs?.length ?? 0) === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No Job Time Allocations To Show.
                    </td>
                  </tr>
                ) : (
                  // Normal rows (paginated)
                  paginatedJobs.map((job, index) => {
                    return (
                      <tr key={index}>
                        <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                        <td>{job[3] === "Compliance Checklist" ? job[1] : job[2]}</td>
                        <td>{job[3]}</td>
                        <td>{getUserString(job)}</td>
                        <td>
                          {job[10]}
                          {` (`}
                          {job[11] ? moment.utc(job[11]).format("DD-MM-YYYY") : "--"}
                          {`--`}
                          {job[12] ? moment.utc(job[12]).format("DD-MM-YYYY") : "--"}
                          {`)`}
                        </td>
                        <td>
                          <i
                            className="fa-eye fa f-18 cursor-pointer"
                            onClick={() => {
                              const encryptedId = encryptAndEncode(job[0].toString());
                              navigate(`/audit/start-scheduling/${encryptedId}`);
                            }}
                            role="button"
                            aria-label={`View job ${job[1]}`}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Only render pagination when there's more than one page */}
            {(resourceTimeAllocationJobs?.length ?? 0) > PAGE_SIZE && (
              <Pagination
                count={Math.ceil((resourceTimeAllocationJobs?.length ?? 0) / PAGE_SIZE)}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTimeAllocationReport;
