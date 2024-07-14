import React from "react";
import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";

const ViewResource = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, allUsers } = useSelector(
    (state) => state?.settingsUserManagement
  );
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const handleChange = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (user[0]?.token) {
      dispatch(setupGetAllUsers({ shareWith: true }));
    }
  }, [user]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-job-scheduling"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
  }, []);

  return (
    <div>
      <header className="section-header my-3 text-start d-flex align-items-center">
        <button
          className="btn btn-indigo me-4"
          onClick={() => navigate("/audit/job-scheduling")}
        >
          Back
        </button>

        <div className="mb-0 heading">Resources</div>
      </header>

      <div className="row mb-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Jan</th>
                  <th>Feb</th>
                  <th>Mar</th>
                  <th>Apr</th>
                  <th>May</th>
                  <th>Jun</th>
                  <th>Jul</th>
                  <th>Aug</th>
                  <th>Sep</th>
                  <th>Oct</th>
                  <th>Nov</th>
                  <th>Dec</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : allUsers?.length === 0 ||
                  allUsers[0]?.error === "Not Found" ? (
                  <tr>
                    <td className="w-300">No user to show!</td>
                  </tr>
                ) : (
                  allUsers
                    ?.filter(
                      (all) =>
                        all?.employeeid?.userHierarchy !== "Management_Auditee"
                    )
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((userItem, index) => {
                      return (
                        <tr key={index}>
                          <td>{userItem?.name}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            count={Math.ceil(allUsers?.length / 10)}
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewResource;
