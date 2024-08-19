import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setupGetAllPlanSummaryReport,
  setupGetAllLocations,
  handleReset,
  setupGetAllUsers,
} from "../../../../global-redux/reducers/reports/extra-report/slice";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

const AuditPlanSummaryReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { planSummaryReports, loading, locations, users } = useSelector(
    (state) => state?.extraReport
  );
  const [page, setPage] = React.useState(1);
  const [subLocations, setSubLocations] = React.useState([]);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  let [data, setData] = React.useState({
    location: "",
    subLocation: "",
    riskRating: "",
    resource: "",
  });

  const handleChangePage = (_, value) => {
    setPage(value);
  };

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
      setupGetAllPlanSummaryReport({
        companyId: companyId,
        location: data?.location !== "" ? data?.location : null,
        subLocation: data?.subLocation !== "" ? data?.subLocation : null,
        riskRating: data?.riskRating !== "" ? data?.riskRating : null,
        resource: data?.resource !== "" ? data?.resource : null,
      })
    );
  }, [dispatch, data]);

  React.useEffect(() => {
    setPage(1);
  }, [planSummaryReports]);

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
    setTimeout(() => {
      dispatch(setupGetAllUsers());
    }, 1200);
    return () => {
      dispatch(handleReset());
    };
  }, [dispatch]);

  return (
    <div>
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Plan Summary Report</div>
      </header>

      <div className="row mb-3">
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

        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Risk Rating:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={data?.riskRating}
              name="riskRating"
              onChange={(event) => handleChange(event)}
            >
              <option value="">select rating</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Resource:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={data?.resource}
              name="resource"
              onChange={(event) => handleChange(event)}
            >
              <option value="">select resource</option>
              {users?.map((user, index) => {
                return (
                  <option value={user?.name} key={index}>
                    {user?.name}
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
                  <th>Auditable Unit</th>
                  <th>Risk Rating</th>
                  <th>Resource</th>
                  <th>Location</th>
                  <th>Sub Location</th>
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
                ) : planSummaryReports?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Jobs To Show!</td>
                  </tr>
                ) : (
                  planSummaryReports
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((job, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{job[1]} </td>
                          <td>{job[2]}</td>
                          <td>{job[3]}</td>
                          <td>{job[4]}</td>
                          <td>{job[5]}</td>
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
              count={Math.ceil(planSummaryReports?.length / 10)}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditPlanSummaryReport;
