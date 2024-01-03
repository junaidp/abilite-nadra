import React from "react";

const AddCompanyDialog = ({ setAddCompantDialog }) => {
  return (
    <div className="px-4 py-4">
      <header className="section-header mt-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="mx-2 m-2 heading">Add New Company</h2>
        </div>
      </header>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Company ID:</label>
          <input
            className="form-control w-100"
            placeholder="xxxx"
            type="text"
          />
        </div>
        <div className="col-lg-6">
          <label>Company Name:</label>
          <input
            className="form-control w-100"
            placeholder="xxxxxxxx"
            type="text"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Contact Person Name:</label>
          <input
            className="form-control w-100"
            placeholder="xxxxxxxx"
            type="text"
          />
        </div>
        <div className="col-lg-6">
          <label>Email ID: </label>
          <input
            className="form-control w-100"
            placeholder="xxxx@gmail.com"
            type="email"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-center">
            <label>Reset password:</label>
            <a href="#" className="">
              Reset
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-center">
            <label>User Profile:</label>
            <a href="#" className="text-primary fw-bolder">
              Admin
            </a>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Date of Joining:</label>
          <input
            className="form-control w-100"
            placeholder="Enter Text here"
            type="date"
          />
        </div>
        <div className="col-lg-6">
          <label>Package: </label>
          <select className="form-select" aria-label="Default select example">
            <option>Trial</option>
            <option value="2">Standard</option>
            <option value="3">Premium</option>
          </select>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Fiscal Year From:</label>
          <input
            className="form-control w-100"
            placeholder="Enter Text here"
            type="date"
          />
        </div>
        <div className="col-lg-6">
          <label>Fiscal Year To:</label>
          <input
            className="form-control w-100"
            placeholder="Enter Text here"
            type="date"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Company Status:</label>
          <select className="form-select" aria-label="Default select example">
            <option>Active</option>
            <option value="2">Deactive</option>
            <option value="3">Remove</option>
          </select>
        </div>
        <div className="col-lg-6"></div>
      </div>

      <div className="row py-4 px-4">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => setAddCompantDialog(false)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyDialog;
