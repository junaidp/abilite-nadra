import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const FollowUp = () => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="mx-3">
        <div className="row pt-4">
          <div className="col-lg-7">
            <h2 className="mx-2 m-2 heading">Follow Up</h2>
          </div>

          <div className="col-lg-5 text-end">
            <div className="d-flex align-items-center">
              <label className="me-3 w-25">Status:</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option>
                  Exceptions To Be Sent To Management For Comments
                </option>
                <option value="2">Awaiting Management Comments</option>
                <option>Management Comments Received</option>
                <option>Implementation In Progress</option>
                <option>Exceptions Implemented</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row py-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered  table-hover rounded">
                <thead>
                  <tr>
                    <th className="sr-col">Sr. #</th>
                    <th>Particulars</th>
                    <th>Status</th>
                    <th>No. of Observations</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label>1</label>
                    </td>
                    <td>
                      <a
                        className=" text-primary  fw-bold f-12"
                        onClick={() => navigate("/audit/follow-up-particulars")}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </a>
                    </td>
                    <td>Exceptions To Be Sent To Management For Comments</td>
                    <td>10</td>
                    <td>Yet to be Respond</td>
                  </tr>
                  <tr>
                    <td>
                      <label>2</label>
                    </td>
                    <td>
                      <a
                        className=" text-primary  fw-bold f-12"
                        onClick={() => navigate("/audit/follow-up-particulars")}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </a>
                    </td>
                    <td>Exceptions To Be Sent To Management For Comments</td>
                    <td>4</td>
                    <td>Yet to be Respond</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUp;
