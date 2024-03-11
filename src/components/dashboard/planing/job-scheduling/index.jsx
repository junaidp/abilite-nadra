import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { setupGetAllJobScheduling } from "../../../../global-redux/reducers/planing/job-scheduling/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const JobScheduling = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allJobScheduling, loading } = useSelector(
    (state) => state?.planingJobScheduling
  );
  const { company, year } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };
  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllJobScheduling(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
  }, [user, year, company]);

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
            className="fa fa-info-circle ps-3 text-secondary cursor-pointer"
            title="Info"
          ></i>
        </div>
      </header>

      <div className="example-header">
        <div className="mb-2 w-100">
          <input
            placeholder="Filter"
            id="inputField"
            className="input-border-bottom"
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
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
                {loading ? (
                  <tr>
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : allJobScheduling?.length === 0 ? (
                  <tr>
                    <td className="w-300">No data to show</td>
                  </tr>
                ) : (
                  allJobScheduling
                    ?.filter((all) =>
                      all?.jobPrioritization?.unit?.reason
                        ?.toLowerCase()
                        .includes(searchValue?.toLowerCase())
                    )
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((item, index) => {
                      return (
                        <tr className="h-40" key={index}>
                          <td>{item?.id}</td>
                          <td>{item?.jobPrioritization?.unit?.reason}</td>
                          <td>{item?.jobPrioritization?.year}</td>
                          <td>
                            <div
                              className="btn btn-outline-light text-primary  px-3 shadow"
                              onClick={() =>
                                navigate(
                                  `/audit/start-scheduling?jobScheduling=${item?.id}`
                                )
                              }
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-play"></i>
                              </span>
                              Start Scheduling
                            </div>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          count={Math.ceil(allJobScheduling?.length / 10)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default JobScheduling;
