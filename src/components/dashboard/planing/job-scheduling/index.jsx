import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../common/pagination/Pagination";

const JobScheduling = () => {
  let navigate = useNavigate();
  let data = [
    {
      no: "1",
      objective: "Lorem Ipsum 1",
      year: "Year 1",
    },
    {
      no: "1",
      objective: "Lorem Ipsum 1",
      year: "Year 2",
    },
    {
      no: "1",
      objective: "Lorem Ipsum 1",
      year: "Year 3",
    },
    {
      no: "1",
      objective: "Lorem Ipsum 1",
      year: "Year 4",
    },
    {
      no: "1",
      objective: "Lorem Ipsum 1",
      year: "Year 5",
    },
    {
      no: "1",
      objective: "Lorem Ipsum 1",
      year: "Year 6",
    },
    {
      no: "1",
      objective: "Lorem Ipsum 1",
      year: "Year 7",
    },
  ];
  return (
    <div>
      <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Job Scheduling</div>

        <div className="">
          <div
            className="btn btn-labeled btn-primary px-3 shadow me-3"
            onClick={() => navigate("/audit/view-resource")}
          >
            <span className="btn-label me-2">
              <i className="fa fa-eye"></i>
            </span>
            View Resource
          </div>
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => navigate("/audit/view-job-scheduling")}
          >
            <span className="btn-label me-2">
              <i className="fa fa-eye"></i>
            </span>
            View Job schedule
          </div>
          <i
            className="fa fa-info-circle ps-3 text-secondary"
            style={{ cursor: "pointer" }}
            title="Info"
          ></i>
        </div>
      </header>

      <div className="example-header">
        <div className="mb-2 w-100">
          <input
            placeholder="Filter"
            id="inputField"
            style={{ borderBottom: "1px solid black" }}
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr style={{ height: "40px" }} key={index}>
                      <td>{item?.no}</td>
                      <td>{item?.objective}</td>
                      <td>{item?.year}</td>
                      <td>
                        <div
                          className="btn btn-outline-light text-primary  px-3 shadow"
                          onClick={() => navigate("/audit/start-scheduling")}
                        >
                          <span className="btn-label me-2">
                            <i className="fa fa-play"></i>
                          </span>
                          Start Scheduling
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default JobScheduling;
