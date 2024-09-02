import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setupGetAllAuditExceptions,
  setupGetAllLocations,
  handleReset,
} from "../../../../global-redux/reducers/reports/extra-report/slice";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const AuditExceptionReport = () => {
  const dispatch = useDispatch();
  const { auditExceptionJobs, loading, locations } = useSelector(
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
    stepNo: -1,
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

  function handleCalculateStatus(step) {
    if (Number(step) === 0 || Number(step) === 1) {
      return "Exceptions To Be Sent To Management For Comments";
    }
    if (Number(step) === 2) {
      return "Awaiting Management Comments";
    }
    if (Number(step) === 3) {
      return "Management Comments Received";
    }
    if (Number(step) === 4) {
      return "Exception To Be Implemented";
    }
    if (Number(step) === 5) {
      return "Exception To Be  Implemented";
    }
    if (Number(step) === 6) {
      return "Exceptions  Implemented";
    }
    return "Observation Completed";
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
      setupGetAllAuditExceptions({
        companyId: companyId,
        natureThrough:
          data?.natureThrough !== "" && data?.natureThrough !== "Both"
            ? data?.natureThrough
            : null,
        location: data?.location !== "" ? data?.location : null,
        subLocation: data?.subLocation !== "" ? data?.subLocation : null,
        stepNo: data?.stepNo !== "" ? data?.stepNo : -1,
      })
    );
  }, [dispatch, data]);

  React.useEffect(() => {
    setPage(1);
  }, [auditExceptionJobs]);

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
        <div className="mb-0 heading">Audit Exception Report</div>
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
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Step No:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={data?.stepNo}
              name="stepNo"
              onChange={(event) => handleChange(event)}
            >
              <option value={-1}>All</option>
              <option value={0}>
                Step-0 (Without Submitted Exceptions, To Be Sent to Management
                for Comments)
              </option>
              <option value={1}>
                Step-1 (Submitted Exceptions, To Be Sent to Management for
                Comments)
              </option>
              <option value={2}>Step-2 (Awaiting Management Comments)</option>
              <option value={3}>Step-3 (Management Comments Received)</option>
              <option value={4}>
                Step-4 (Without Submitted, Exception To Be Implemented)
              </option>
              <option value={5}>
                Step-5 (Submitted, Exception To Be Implemented)
              </option>
              <option value={6}>Step-6 (Implemented Exceptions)</option>
              <option value={7}>Step-7 (Completed Observations)</option>
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
                  <th>Reporting Name</th>
                  <th>Nature</th>
                  <th>Location</th>
                  <th>Sub-Location</th>
                  <th>Exception Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : auditExceptionJobs?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Audit Exceptions To Show.</td>
                  </tr>
                ) : (
                  auditExceptionJobs
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((job, index) => {
                      return (
                        <tr key={index}>
                          <td>{(page - 1) * 10 + index + 1}</td>
                          <td>{job[1]} </td>
                          <td>{job[3]}</td>
                          <td>{job[4]}</td>
                          <td>{job[5]}</td>
                          <td>{job[6]}</td>
                          <td>{handleCalculateStatus(job[7])}</td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(auditExceptionJobs?.length / 10)}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditExceptionReport;
