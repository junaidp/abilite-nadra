import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupGetAllAuditExceptions } from "../../../../global-redux/reducers/reports/audit-exception/slice";
import { CircularProgress } from "@mui/material";

const AuditExceptionReport = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state?.auditExceptionReport);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  let [data, setData] = React.useState({
    natureThrough: "",
    location: "",
    subLocation: "",
    stepNo: "",
  });

  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  }

  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    dispatch(
      setupGetAllAuditExceptions({
        companyId: companyId,
        natureThrough: data?.natureThrough !== "" ? data?.natureThrough : null,
        location: data?.location !== "" ? data?.location : null,
        subLocation: data?.subLocation !== "" ? data?.subLocation : null,
        stepNo: data?.stepNo !== "" ? data?.stepNo : -1,
      })
    );
  }, [dispatch, data]);

  console.log(jobs);

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
              value={data?.nature}
              name="nature"
              onChange={(event) => handleChange(event)}
            >
              <option value="">Select Nature</option>
              <option value="Business Objective">Business Objective</option>
              <option value="Compliance Checklist">Compliance Checklist</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Location:</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Sub-Location:</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Exception Status:</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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
                  <th>Location</th>
                  <th>Sub-Location</th>
                  <th>Step No</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td>
                      <CircularProgress />
                    </td>
                  </tr>
                ) : (
                  jobs?.map((job, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{job[1]} </td>
                        <td>{job[2]}</td>
                        <td>{job[3]}</td>
                        <td>{job[4]}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditExceptionReport;
