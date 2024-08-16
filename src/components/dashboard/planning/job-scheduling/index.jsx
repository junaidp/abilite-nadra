import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { setupGetAllJobScheduling } from "../../../../global-redux/reducers/planing/job-scheduling/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};

const JobScheduling = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialRender = React.useRef(true);
  const { allJobScheduling, loading, totalNoOfRecords } = useSelector(
    (state) => state?.planningJobScheduling
  );
  const { company, year } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllJobScheduling({
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
        setupGetAllJobScheduling({ companyId, page, itemsPerPage, year })
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
        setupGetAllJobScheduling({ companyId, page: 1, itemsPerPage: 10, year })
      );
    }
  }, [year]);

  return (
    <div>
      <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Job Scheduling</div>
        <div>
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => navigate("/audit/view-job-scheduling")}
          >
            <span className="btn-label me-2">
              <i className="fa fa-eye"></i>
            </span>
            View Job schedule
          </div>
          <Tooltip
            title={
              <React.Fragment>
                <Typography
                  color="inherit"
                  className="mb-2"
                  style={poppinsStyle}
                >
                  Users can schedule jobs by allocating available resources,
                  specifying the location, and setting the time for each task.
                </Typography>
              </React.Fragment>
            }
            arrow
          >
            <i className="fa fa-info-circle ps-3 text-secondary cursor-pointer"></i>
          </Tooltip>
        </div>
      </header>

      <div className="example-header">
        <div className="mb-2">
          <input
            placeholder="Filter"
            id="inputField"
            className="input-border-bottom form-control"
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered table-hover rounded equal-columns">
              <thead>
                <tr>
                  <th className="sr-col">Sr. #</th>
                  <th>Auditable Unit</th>
                  <th>Audit Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : allJobScheduling?.length === 0 ? (
                  <tr>
                    <td className="w-300">No data to show</td>
                  </tr>
                ) : (
                  allJobScheduling
                    ?.filter((all) =>
                      all?.auditableUnitTitle
                        ?.toLowerCase()
                        .includes(searchValue?.toLowerCase())
                    )
                    ?.map((item, index) => {
                      return (
                        <tr className="h-40" key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.auditableUnitTitle}</td>
                          <td>{item?.year}</td>
                          <td>
                            <div
                              className="btn btn-outline-light text-primary  px-3 shadow"
                              onClick={() =>
                                navigate(
                                  `/audit/start-scheduling?jobScheduling=${item?.id}`
                                )
                              }
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-play"></i>
                              </span>

                              {item?.locked === true ||
                              (item?.complete === true &&
                                item?.locked === false &&
                                user[0]?.userId?.employeeid?.userHierarchy !==
                                  "IAH")
                                ? "View Job Scheduling"
                                : "Start Scheduling"}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
        {allJobScheduling?.length > 0 && (
          <div className="row p-0 m-0">
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
  );
};

export default JobScheduling;
