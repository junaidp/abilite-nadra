import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";
import { setupGetAllReporting } from "../../../../global-redux/reducers/reporting/slice";
import { encryptAndEncode } from "../../../../config/helper";

/**
 * Reporting Component
 * Displays the list of audit reporting items with pagination and filters.
 * Allows navigation to detailed reporting pages.
 */
const Reporting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialRender = React.useRef(true);

  // Redux states
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const { allReporting, loading, totalNoOfRecords } = useSelector(
    (state) => state?.reporting
  );

  // Local states
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  // ---- Pagination ----
  const handleChangePage = (_, value) => setPage(value);

  // ---- Determine reporting status ----
  const handleCalculateStatus = (item) => {
    const list = item?.reportingList || [];

    if (list.some((r) => Number(r?.stepNo) === 0 || Number(r?.stepNo) === 1)) {
      return "Exceptions To Be Sent To Management For Comments";
    }

    if (list.some((r) => Number(r?.stepNo) === 2)) {
      return "Awaiting Management Comments";
    }

    if (list.some((r) => Number(r?.stepNo) === 3)) {
      return user[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee"
        ? "Management Comments Sent"
        : "Management Comments Received";
    }

    return "Exception To Be Implemented";
  };

  // ---- Handle items per page change ----
  const handleChangeItemsPerPage = (event) => {
    const companyId = user[0]?.company?.find(
      (c) => c?.companyName === company
    )?.id;

    if (companyId) {
      const newLimit = Number(event.target.value);
      setPage(1);
      setItemsPerPage(newLimit);
      dispatch(
        setupGetAllReporting({
          companyId,
          page: 1,
          itemsPerPage: newLimit,
          year,
        })
      );
    }
  };

  // ---- Fetch data on page change ----
  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (c) => c?.companyName === company
    )?.id;

    if (companyId) {
      dispatch(setupGetAllReporting({ companyId, page, itemsPerPage, year }));
    }
  }, [dispatch, user, company, page, itemsPerPage, year]);

  // ---- Fetch data when year changes (skip initial render) ----
  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // skip first run
    }

    const companyId = user[0]?.company?.find(
      (c) => c?.companyName === company
    )?.id;

    if (companyId) {
      setPage(1);
      setItemsPerPage(5);
      dispatch(setupGetAllReporting({ companyId, page: 1, itemsPerPage: 5, year }));
    }
  }, [year, dispatch, user, company]);

  // ---- Helper for rendering unique chip lists ----
  const renderUniqueChips = (list, keyPath) => {
    const uniqueValues = [...new Set(list?.map((i) => keyPath(i)))];
    return (
      <div className="d-flex gap-1 flex-wrap">
        {uniqueValues.map((val, i) => (
          <Chip label={val} key={i} />
        ))}
      </div>
    );
  };

  // ---- Navigate to details ----
  const handleNavigateToDetails = (id) => {
    const encryptedId = encryptAndEncode(id.toString());
    navigate(`/audit/reporting-particulars/${encryptedId}`);
  };

  return (
    <div className="mx-3">
      {/* Header */}
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Reporting</div>
      </header>

      {/* Main Table */}
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            {loading ? (
              <CircularProgress />
            ) : allReporting?.length === 0 ||
              allReporting[0]?.error === "Not Found" ? (
              <p>No Reportings To Show.</p>
            ) : (
              <table className="table table-bordered table-hover rounded">
                <thead>
                  <tr>
                    <th className="sr-col">Sr. #</th>
                    <th>Particulars</th>
                    <th>Status</th>
                    <th>No. of Observations</th>
                    <th>Location</th>
                    <th>Sub Location</th>
                    <th>Department</th>
                    <th>Sub Department</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {allReporting.map((item, index) => (
                    <tr key={index}>
                      {/* Sr No */}
                      <td>
                        <label>{(page - 1) * itemsPerPage + index + 1}</label>
                      </td>

                      {/* Particulars */}
                      <td>
                        <a
                          className="text-primary fw-bold f-12"
                          onClick={() => handleNavigateToDetails(item?.id)}
                        >
                          {item?.title}
                        </a>
                      </td>

                      {/* Status */}
                      <td>{handleCalculateStatus(item)}</td>

                      {/* No. of Observations */}
                      <td>{item?.reportingList?.length}</td>

                      {/* Location */}
                      <td>
                        {renderUniqueChips(
                          item?.subLocationList,
                          (i) => i?.locationid?.description
                        )}
                      </td>

                      {/* Sub Location */}
                      <td>
                        <div className="d-flex gap-1 flex-wrap">
                          {item?.subLocationList?.map((sub, i) => (
                            <Chip label={sub?.description} key={i} />
                          ))}
                        </div>
                      </td>

                      {/* Department */}
                      <td>
                        {renderUniqueChips(
                          item?.subDepartments,
                          (i) => i?.department?.description
                        )}
                      </td>

                      {/* Sub Department */}
                      <td>
                        <div className="d-flex gap-1 flex-wrap">
                          {item?.subDepartments?.map((sub, i) => (
                            <Chip label={sub?.description} key={i} />
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <i
                          onClick={() => handleNavigateToDetails(item?.id)}
                          className="fa fa-eye f-18 cursor-pointer"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {allReporting?.length > 0 && (
            <div className="row">
              <div className="col-lg-6 mb-4">
                <Pagination
                  count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                />
              </div>

              <div className="col-lg-6 mb-4 d-flex justify-content-end">
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Items Per Page
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Items Per Page"
                    value={itemsPerPage}
                    onChange={handleChangeItemsPerPage}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reporting;
