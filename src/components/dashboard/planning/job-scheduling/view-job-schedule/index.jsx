import React from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { setupGetAllJobScheduling } from "../../../../../global-redux/reducers/planing/job-scheduling/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { encryptAndEncode } from "../../../../../config/helper";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import moment from "moment/moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ViewJobSchedule = () => {
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

  React.useEffect(() => {
    dispatch(changeActiveLink("li-job-scheduling"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
  }, []);

  return (
    <div>
      <div>
        <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
          <div className="mb-0 heading">
            <button
              className="btn btn-indigo me-2"
              onClick={() => navigate("/audit/job-scheduling")}
            >
              Back
            </button>
            Job Scheduling
          </div>
        </header>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered table-hover rounded equal-columns">
                <thead>
                  <tr>
                    <th className="sr-col">Sr. #</th>
                    <th>Auditable Unit</th>
                    <th>Year</th>
                    <th>Planned Start Date</th>
                    <th>Planned End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                    allJobScheduling?.map((item, index) => {
                      return (
                        <tr className="h-50" key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.auditableUnitTitle}</td>
                          <td>{item?.year}</td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              disabled
                              value={moment(
                                item?.jobScheduleList[0]?.plannedStartDate
                              ).format("YYYY-MM-DD")}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              disabled
                              value={moment(
                                item?.jobScheduleList[0]?.plannedJobEndDate
                              ).format("YYYY-MM-DD")}
                            />
                          </td>

                          <td>
                            {item?.locked === true
                              ? "Completed"
                              : "In-Progress"}
                          </td>
                          <td>
                            <span className="btn-label me-2">
                              <i
                                className="fa fa-edit  px-3 f-18 cursor-pointer"
                                onClick={() => {
                                  const encryptedId = encryptAndEncode(
                                    item?.id.toString()
                                  );
                                  navigate(
                                    `/audit/start-scheduling/${encryptedId}`
                                  );
                                }}
                              ></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
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

export default ViewJobSchedule;
