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

const ResourceTimeAllocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resourceTimeAllocationJobs, loading, locations } = useSelector(
    (state) => state?.extraReport
  );
  const [page, setPage] = React.useState(1);
  const [subLocations, setSubLocations] = React.useState([]);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  let [data, setData] = React.useState({
    natureThrough: "Both",
    location: "",
    subLocation: "",
  });

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  function getUserString(job) {
    let string = "";
    string = job[3] + job[4] + job[5] + job[6] + job[7] + job[8] + " (";
    if (job[3] > 0) {
      string = string + job[3] + " (Business) ";
    }
    if (job[4] > 0) {
      string = string + job[4] + " (Fraud) ";
    }
    if (job[5] > 0) {
      string = string + job[5] + " (Finance) ";
    }
    if (job[6] > 0) {
      string = string + job[6] + " (IT) ";
    }
    if (job[7] > 0) {
      string = string + job[7] + " (Operations) ";
    }
    if (job[8] > 0) {
      string = string + job[8] + " (Others)";
    }
    string = string + " )";
    return string;
  }

  function handleChange(event) {
    if (event?.target?.name === "location") {
      setData((pre) => {
        return {
          ...pre,
          [event.target.name]: event.target.value,
          subLocation: "",
        };
      });
      return;
    }
    setData((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  }

  React.useEffect(() => {
    if (locations?.length !== 0) {
      let subLocations = locations?.find(
        (location) => location?.description === data?.location
      )?.subLocations;
      setSubLocations(subLocations);
    }
  }, [data?.location]);

  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    dispatch(
      setupGetAllTimeAllocation({
        companyId: companyId,
        natureThrough:
          data?.natureThrough !== "" && data?.natureThrough !== "Both"
            ? data?.natureThrough
            : null,
        location: data?.location !== "" ? data?.location : null,
        subLocation: data?.subLocation !== "" ? data?.subLocation : null,
      })
    );
  }, [dispatch, data]);

  React.useEffect(() => {
    if (resourceTimeAllocationJobs) {
      setPage(1);
    }
  }, [resourceTimeAllocationJobs]);

  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    setTimeout(() => {
      dispatch(
        setupGetAllLocations({
          companyId: companyId,
        })
      );
    }, 1200);
    return () => {
      dispatch(handleReset());
    };
  }, [dispatch]);

  return (
    <div>
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Job Time Allocation Report</div>
      </header>

      <div className="row mb-3">
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Nature Through:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={data?.natureThrough}
              name="natureThrough"
              onChange={(event) => handleChange(event)}
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
              aria-label="Default select example"
              value={data?.location}
              name="location"
              onChange={(event) => handleChange(event)}
            >
              <option value="">All</option>
              {locations?.map((location) => {
                return (
                  <option value={location?.description}>
                    {location?.description}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Sub Location:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={data?.subLocation}
              name="subLocation"
              onChange={(event) => handleChange(event)}
            >
              <option value="">select sub-location</option>
              {subLocations?.map((subLocation) => {
                return (
                  <option value={subLocation?.description}>
                    {subLocation?.description}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
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
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : resourceTimeAllocationJobs?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Job Time Allocations To Show.</td>
                  </tr>
                ) : (
                  resourceTimeAllocationJobs
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((job, index) => {
                      return (
                        <tr key={index}>
                          <td>{(page - 1) * 10 + index + 1}</td>
                          <td>{job[1]} </td>
                          <td>{job[2]}</td>
                          <td>{getUserString(job)}</td>
                          <td>
                            {job[9] +
                              `(
                            ${moment
                              .utc(job[10])
                              .format("DD-MM-YYYY")}--${moment
                                .utc(job[11])
                                .format("DD-MM-YYYY")}
                              )`}
                          </td>
                          <td>
                            <i
                              className="fa-eye fa f-18 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/audit/start-scheduling?jobScheduling=${job[0]}`
                                )
                              }
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(resourceTimeAllocationJobs?.length / 10)}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceTimeAllocation;
