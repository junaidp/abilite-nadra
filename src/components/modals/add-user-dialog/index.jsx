import React from "react";

const UserManagementDialog = ({setUserManagementDialog}) => {
  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Add New User</h2>
        </div>
      </header>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">User Name:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Email ID:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Password:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Confirm Password:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Designation:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">User Profile:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Reporting To:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Date of Joining:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="date"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Availability during the year:</div>
        <div className="col-lg-5">
          <div className="form-group">
            <input
              type="date"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="form-group">
            <input
              type="date"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-2 label-text">Skill Set:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fnamef"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button  className="btn btn-primary float-end" onClick={()=>setUserManagementDialog(false)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDialog;
