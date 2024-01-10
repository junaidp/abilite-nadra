import React from "react";

const UserManagement = ({ setUserManagementDialog }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-user"
      role="tabpanel"
      aria-labelledby="nav-user-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">User Management</div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-6">
          <label>User By User Name</label>
          <input className="form-control w-100" placeholder="Enter Text here" />
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
                  <th>Designation</th>
                  <th>Email ID</th>
                  <th>Skill Set</th>
                  <th>Role</th>
                  <th>Reporting </th>
                  <th>Comapny</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>xxxxxxxx</td>
                  <td>xxxxxxxx</td>
                  <td>xxxxxxxx</td>
                  <td>xxxxxxxx</td>
                  <td>
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Role 1</option>
                      <option value="2">Role 2</option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Repoting 1</option>
                      <option value="2">Reporting 2</option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Comapny 1</option>
                      <option value="2">Comapny 2</option>
                    </select>
                  </td>
                  <td>
                    <i className="fa fa-edit   f-18"></i>

                    <i className="fa fa-trash text-danger mx-2 f-18"></i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxx</td>
                  <td>
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Role 1</option>
                      <option value="2">Role 2</option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Repoting 1</option>
                      <option value="2">Reporting 2</option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Comapny 1</option>
                      <option value="2">Comapny 2</option>
                    </select>
                  </td>
                  <td>
                    <i className="fa fa-edit   f-18"></i>

                    <i className="fa fa-trash text-danger f-18 mx-2"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
