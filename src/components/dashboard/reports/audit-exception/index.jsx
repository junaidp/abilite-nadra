import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupGetJobsBasedOnNatureThrough } from "../../../../global-redux/reducers/reports/audit-exception/slice";

const AuditExceptionReport = () => {
  const dispatch = useDispatch();
  const [nature, setNature] = React.useState("");
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);

  React.useEffect(() => {
    if (nature && nature !== "") {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      dispatch(
        setupGetJobsBasedOnNatureThrough({
          companyId: companyId,
          natureThrough: nature,
        })
      );
    }
  }, [nature]);

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
              value={nature}
              onChange={(event) => setNature(event.target.value)}
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
            <label className="me-2 label-text fw-bold">Job Name:</label>
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
                  <th>Recommendations</th>
                  <th>Location</th>
                  <th>Sub-Location</th>
                  <th>Exception Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td>XYZABC</td>
                  <td>Low</td>
                  <td>XYZABC</td>
                  <td>XYZABC</td>
                  <td>Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditExceptionReport;
