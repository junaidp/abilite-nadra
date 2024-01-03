import React from "react";

const UserProfileDialog = ({setUpdateUserDialog}) => {
  return (
    <div className="px-4 py-4">
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Password:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <input
              type="password"
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
        <div className="col-lg-2 label-text">Email:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="john@gmail.com"
              required="required"
            />
          </div>
        </div>
      </div>

      
      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button  className="btn btn-primary float-end" onClick={()=>setUpdateUserDialog(false)}>
            Update
          </button>
        </div>
      </div>


    </div>
  );
};

export default UserProfileDialog;
