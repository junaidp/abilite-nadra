import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { setupGetAllReporting } from "../../../../global-redux/reducers/reporting/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const Reporting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const { allReporting, loading } = useSelector((state) => state?.reporting);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  function handleCalculateStatus(item) {
    if (
      item?.reportingList?.find(
        (singleReportingItem) =>
          Number(singleReportingItem?.stepNo) === 0 ||
          Number(singleReportingItem?.stepNo) === 1
      )
    ) {
      return "Exceptions To Be Sent To Management For Comments";
    }
    if (
      item?.reportingList?.find(
        (singleReportingItem) => Number(singleReportingItem?.stepNo) === 2
      )
    ) {
      return "Awaiting Management Comments";
    }
    if (
      item?.reportingList?.find(
        (singleReportingItem) => Number(singleReportingItem?.stepNo) === 3
      )
    ) {
      return user[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee"
        ? "Management Comments Sent"
        : "Management Comments Received";
    }
    return "Exception To Be Implemented";
  }

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllReporting(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
  }, [user, year, company]);

  return (
    <div>
      <div className="mx-3">
        <div className="row pt-4">
          <div className="col-lg-7">
            <h2 className="heading">Reporting</h2>
          </div>

          {/* <div className="col-lg-5 text-end">
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
          </div> */}
        </div>

        <div className="row py-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              {loading ? (
                <CircularProgress />
              ) : allReporting?.length === 0 ||
                allReporting[0]?.error === "Not Found" ? (
                <p>No Reporting to Show</p>
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
                    {allReporting
                      ?.slice((page - 1) * 10, page * 10)
                      ?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <label>{index + 1}</label>
                            </td>
                            <td>
                              <a
                                className=" text-primary  fw-bold f-12"
                                onClick={() =>
                                  navigate(
                                    `/audit/reporting-particulars?reportingId=${item?.id}`
                                  )
                                }
                              >
                                {item?.title}
                              </a>
                            </td>
                            <td>{handleCalculateStatus(item)}</td>
                            <td>{item?.reportingList?.length}</td>
                            <td>
                              <i
                                onClick={() =>
                                  navigate(
                                    `/audit/reporting-particulars?reportingId=${item?.id}`
                                  )
                                }
                                className="fa fa-edit  px-3 f-18 cursor-pointer"
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
              <Pagination
                count={Math.ceil(allReporting?.length / 10)}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
