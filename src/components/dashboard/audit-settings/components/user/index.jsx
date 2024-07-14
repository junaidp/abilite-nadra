import React from "react";
import {
  setupGetAllUsers,
  resetAddUserSuccess,
} from "../../../../../global-redux/reducers/settings/user-management/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import DeleteUserDialog from "./DeleteDialog";

const UserManagement = ({
  setUserManagementDialog,
  setUpdateUserDialog,
  setUpdateUserObject,
}) => {
  const dispatch = useDispatch();
  const { loading, addUserSuccess, allUsers } = useSelector(
    (state) => state?.settingsUserManagement
  );
  const [nameVal, setNameVal] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [currentUserId, setCurrentUserId] = React.useState("");
  const [userDeleteDialog, setUserDeleteDialog] = React.useState(false);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (addUserSuccess) {
      dispatch(resetAddUserSuccess());
      setPage(1);
      dispatch(setupGetAllUsers({ shareWith: true }));
    }
  }, [addUserSuccess]);

  return (
    <div
      className="tab-pane fade"
      id="nav-user"
      role="tabpanel"
      aria-labelledby="nav-user-tab"
    >
      {userDeleteDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteUserDialog
              setUserDeleteDialog={setUserDeleteDialog}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">User Management</div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-6">
          <label>User By User Name</label>
          <input
            className="form-control w-100"
            placeholder="Enter Text here"
            value={nameVal}
            onChange={(event) => setNameVal(event?.target?.value)}
          />
        </div>

        <div className="col-lg-6 text-end float-end align-self-end">
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => setUserManagementDialog(true)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            Add New
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-10">Sr No.</th>
                  <th>Username</th>
                  <th>User Hierarchy</th>
                  <th>Designation</th>
                  <th>Email ID</th>
                  <th>Skill Set</th>
                  <th>Role</th>
                  <th>Company</th>
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
                ) : allUsers?.length === 0 ||
                  allUsers[0]?.error === "Not Found" ? (
                  <tr>
                    <td className="w-300">No user to show!</td>
                  </tr>
                ) : (
                  allUsers
                    ?.filter((all) =>
                      all?.name?.toLowerCase().includes(nameVal?.toLowerCase())
                    )
                    ?.slice((page - 1) * 15, page * 15)
                    ?.map((userItem, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{userItem?.name || ""}</td>
                          <td>{userItem?.employeeid?.userHierarchy || ""}</td>
                          <td>{userItem?.employeeid?.designation || ""}</td>
                          <td>{userItem?.email || ""}</td>
                          <td>{userItem?.employeeid?.skillSet || ""}</td>
                          <td>{userItem?.role[0]?.name || ""}</td>
                          <td>{userItem?.company[0]?.companyName || ""}</td>
                          <td>
                            <i
                              className="fa fa-edit   f-18 cursor-pointer"
                              onClick={() => {
                                setUpdateUserObject(userItem);
                                setUpdateUserDialog(true);
                              }}
                            ></i>
                            <i
                              className="fa fa-trash text-danger mx-2 f-18 cursor-pointer"
                              onClick={() => {
                                setCurrentUserId(userItem?.id);
                                setUserDeleteDialog(true);
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(allUsers?.length / 15)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
