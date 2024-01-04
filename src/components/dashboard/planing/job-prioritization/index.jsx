import React from "react";
import "./index.css";

const JobPrioritization = () => {
  return (
    <div>
      <header className="section-header my-3 align-items-center justify-content-between text-start d-flex ">
        <div className="mb-0 heading">Job Prioritization</div>
        <div className="d-flex">
          <div className="d-flex me-3 align-items-center">
            <label className="me-2 label-text fw-bold">View:</label>
            <select className="form-select" aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="d-flex align-items-center">
            <label className="me-2 label-text fw-bold">Year:</label>
            <select className="form-select" aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </header>

      <div className="table-responsive overflow-x-hidden">
        <table className="table w-100 table-bordered table-hover rounded equal-columns">
          <thead>
            <tr>
              <th className="sr-col">Sr. #</th>
              <th>Auditable Unit:</th>
              <th>Business Objective</th>
              <th>Risk Rating</th>
              <th> for Audit</th>
              <th>Comments</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td className="w-200">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td className="w-200">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td className="moderate">Moderate</td>
              <td className="w-200">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  ></label>
                </div>
              </td>
              <td>
                <textarea
                  className="form-control"
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 1500 words
                </label>
              </td>
              <td style={{ width: "100px" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>2023</option>
                  <option value="1">2024</option>
                  <option value="2">2025</option>
                  <option value="3">2026</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="row">
          <div className="col-2 d-flex align-items-center">
            <label className="me-2 label-text fw-bold">View Entries</label>
            <select
              className="form-select w-70"
              aria-label="Default select example"
            >
              <option>10</option>
              <option value="1">20</option>
              <option value="2">30</option>
              <option value="3">40</option>
            </select>
          </div>

          <div className="col-10 d-flex align-items-center justify-content-end">
            <a href="#" className="text-secondary">
              <i className="fa fa-print me-3" style={{ width: "18px" }}></i>
            </a>

            <nav aria-label="Page navigation example">
              <ul className="pagination mb-0 justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-12 justify-content-end text-end">
            <div className="btn btn-labeled btn-primary px-3 shadow">
              <span className="btn-label me-2">
                <i className="fa fa-check-circle"></i>
              </span>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPrioritization;
