import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { setupGetAllReporting } from "../../../../global-redux/reducers/reporting/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const Reporting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const { allReports, loading } = useSelector((state) => state?.reporting);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllReporting(
          `?companyId=${companyId}&currentYear=2024&userId=${user[0]?.userId?.id}`
        )
      );
    }
  }, [user]);

  return (
    <div>
      <div className="mx-3">
        <div className="row pt-4">
          <div className="col-lg-7">
            <h2 className="mx-2 m-2 heading">Reporting</h2>
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
              {loading ? (
                <CircularProgress />
              ) : allReports[0]?.reportingList?.filter(
                  (item) => item?.followUp !== null
                )?.length === 0 ? (
                <p>No Reports to Show</p>
              ) : (
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
                    {allReports[0]?.reportingList
                      ?.filter((item) => item?.followUp !== null)
                      ?.map((report, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <label>{report?.id}</label>
                            </td>
                            <td>
                              <a
                                className=" text-primary  fw-bold f-12"
                                onClick={() =>
                                  navigate(`/audit/follow-up-particulars`)
                                }
                              >
                                {report?.observationTitle}
                              </a>
                            </td>
                            <td>null</td>
                            <td>{allReports[0]?.reportingList?.length}</td>
                            <td>null</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
