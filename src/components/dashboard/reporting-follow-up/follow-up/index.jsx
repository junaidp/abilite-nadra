import React from "react";
import { useNavigate } from "react-router-dom";
import { setupGetAllFollowUp } from "../../../../global-redux/reducers/reporting/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Chip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FollowUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialRender = React.useRef(true);
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const { allFollowUp, loading, totalNoOfRecords } = useSelector(
    (state) => state?.reporting
  );
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleCalculateStatus(item) {
    if (
      item?.reportingList?.find(
        (singleReportingItem) => Number(singleReportingItem?.stepNo) === 5
      )
    ) {
      return "Exception To Be  Implemented";
    }
    if (
      item?.reportingList?.find(
        (singleReportingItem) => Number(singleReportingItem?.stepNo) === 6
      )
    ) {
      return "Exceptions  Implemented";
    }
    return "Observation Completed";
  }

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllFollowUp({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
          year,
        })
      );
    }
  }

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllFollowUp({
          companyId,
          page,
          itemsPerPage,
          year,
        })
      );
    }
  }, [dispatch, page]);

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // Skip the initial render
    }

    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;

    if (companyId) {
      setPage(1);
      setItemsPerPage(10);
      dispatch(
        setupGetAllFollowUp({ companyId, page: 1, itemsPerPage: 10, year })
      );
    }
  }, [year]);

  return (
    <div>
      <div className="mx-3">
        <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
          <div className="mb-0 heading">Follow Up</div>
        </header>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              {loading ? (
                <CircularProgress />
              ) : allFollowUp?.length === 0 ||
                allFollowUp[0]?.error === "Not Found" ? (
                <p>No Follow Ups To Show.</p>
              ) : (
                <table className="table table-bordered  table-hover rounded">
                  <thead>
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th>Particulars</th>
                      <th>Status</th>
                      <th>No. of Observations</th>
                      <th>Location</th>
                      <th>Sub Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFollowUp?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <label>
                              {(page - 1) * itemsPerPage + index + 1}
                            </label>
                          </td>
                          <td>
                            <a
                              className=" text-primary  fw-bold f-12"
                              onClick={() =>
                                navigate(
                                  `/audit/follow-up-particulars?followUpId=${item?.id}`
                                )
                              }
                            >
                              {item?.title}
                            </a>
                          </td>
                          <td>{handleCalculateStatus(item)}</td>
                          <td>{item?.reportingList?.length}</td>
                          <td>
                            <div className="d-flex gap-1">
                              {[
                                ...new Set(
                                  item?.subLocationList?.map(
                                    (item) => item?.locationid?.description
                                  )
                                ),
                              ]?.map((locationItem, index) => {
                                return (
                                  <Chip label={locationItem} key={index} />
                                );
                              })}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              {item?.subLocationList?.map((item, index) => {
                                return (
                                  <Chip label={item?.description} key={index} />
                                );
                              })}
                            </div>
                          </td>
                          <td>
                            <i
                              onClick={() =>
                                navigate(
                                  `/audit/follow-up-particulars?followUpId=${item?.id}`
                                )
                              }
                              className="fa fa-eye f-18 cursor-pointer"
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            {allFollowUp?.length > 0 && (
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <Pagination
                    count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 mb-4 d-flex justify-content-end">
                  <div>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Items Per Page
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Age"
                        value={itemsPerPage}
                        onChange={(event) => handleChangeItemsPerPage(event)}
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

export default FollowUp;
