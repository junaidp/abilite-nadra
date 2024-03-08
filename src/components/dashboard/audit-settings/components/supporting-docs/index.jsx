import React from "react";

const SupportingDocs = ({ userHierarchy, userRole }) => {
  return (
    <div
      className="tab-pane fade active show"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div>
          <div className="row my-3">
            <div className="col-lg-12">
              <div className="sub-heading  fw-bold">Supporting Documents</div>
            </div>
          </div>
          <div className="row position-relative">
            <div className="col-lg-12 text-center settings-form">
              <form>
                <input type="file" />
                <p className="mb-0">
                  Drag your files here or click in this area.
                </p>
              </form>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-lg-12 text-end">
              <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="my-3">
        <div className="flex">
          <div className="row position-relative">
            <div className="col-lg-12 text-center settings-form h-0 border-none">
              <form>
                <input type="file" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6">
          <label className="w-100">Search File Name:</label>
          <input
            className="form-control w-100"
            placeholder="Enter"
            type="text"
          />
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered   rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr No.</th>
                  <th>File Name</th>
                  <th>File Location</th>
                  <th className="w-180">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>File Name here</td>
                  <td>File Location here</td>
                  <td>
                    <i className="fa-eye fa f-18"></i>

                    {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                      <i className="fa fa-trash text-danger f-18 px-3"></i>
                    )}
                    <i className="fa fa-download f-18 mx-2"></i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>File Name here</td>
                  <td>File Location here</td>
                  <td>
                    <i className="fa-eye fa f-18"></i>

                    {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                      <i className="fa fa-trash text-danger f-18 px-3"></i>
                    )}

                    <i className="fa fa-download f-18 mx-2"></i>
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

export default SupportingDocs;
