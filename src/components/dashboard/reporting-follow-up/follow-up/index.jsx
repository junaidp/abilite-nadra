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
import { setupGetAllFollowUp } from "../../../../global-redux/reducers/reporting/slice";
import { encryptAndEncode } from "../../../../config/helper";

/**
 * FollowUp Component
 * Displays the list of audit follow-ups with pagination, status calculation,
 * and navigation to details. Fully read-only and controlled via Redux.
 */
const FollowUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialRender = React.useRef(true);

  // Redux states
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const { allFollowUp, loading, totalNoOfRecords } = useSelector(
    (state) => state?.reporting
  );

  // Local states
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  // ---- Pagination ----
  const handleChangePage = (_, value) => setPage(value);

  // ---- Determine Follow-up Status ----
  const handleCalculateStatus = (item) => {
    const list = item?.reportingList || [];

    if (list.some((r) => Number(r?.stepNo) === 5)) {
      return "Exception To Be Implemented";
    }

    if (list.some((r) => Number(r?.stepNo) === 6)) {
      return "Exceptions Implemented";
    }

    return "Observation Completed";
  };

  // ---- Handle Items per Page ----
  const handleChangeItemsPerPage = (event) => {
    const companyId = user[0]?.company?.find(
      (c) => c?.companyName === company
    )?.id;

    if (companyId) {
      const newLimit = Number(event.target.value);
      setPage(1);
      setItemsPerPage(newLimit);

      dispatch(
        setupGetAllFollowUp({
          companyId,
          page: 1,
          itemsPerPage: newLimit,
          year,
        })
      );
    }
  };

  // ---- Fetch on mount & page change ----
  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (c) => c?.companyName === company
    )?.id;

    if (companyId) {
      dispatch(setupGetAllFollowUp({ companyId, page, itemsPerPage, year }));
    }
  }, [dispatch, user, company, page, itemsPerPage, year]);

  // ---- Fetch again on year change (skip initial render) ----
  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // Skip initial mount
    }

    const companyId = user[0]?.company?.find(
      (c) => c?.companyName === company
    )?.id;

    if (companyId) {
      setPage(1);
      setItemsPerPage(5);
      dispatch(setupGetAllFollowUp({ companyId, page: 1, itemsPerPage: 5, year }));
    }
  }, [year, dispatch, user, company]);

  // ---- Helper for unique chips ----
  const renderUniqueChips = (list, keyPath) => {
    const uniqueValues = [...new Set(list?.map((i) => keyPath(i)))];
    return (
      <div className="d-flex gap-1 flex-wrap">
        {uniqueValues.map((val, idx) => (
          <Chip label={val} key={idx} />
        ))}
      </div>
    );
  };

  // ---- Navigation handler ----
  const handleNavigateToDetails = (id) => {
    const encryptedId = encryptAndEncode(id.toString());
    navigate(`/audit/follow-up-particulars/${encryptedId}`);
  };

  return (
    <div className="mx-3">
      {/* Header */}
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Follow Up</div>
      </header>

      {/* Table Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            {loading ? (
              <CircularProgress />
            ) : allFollowUp?.length === 0 ||
              allFollowUp[0]?.error === "Not Found" ? (
              <p>No Follow Ups To Show.</p>
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
                  {allFollowUp.map((item, index) => (
                    <tr key={index}>
                      {/* Sr # */}
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

                      {/* Observation count */}
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
                          className="fa fa-eye f-18 cursor-pointer"
                          onClick={() => handleNavigateToDetails(item?.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {allFollowUp?.length > 0 && (
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

export default FollowUp;
