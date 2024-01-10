import React from "react";

const Company = ({
  setCompanySearch,
  setAddCompantDialog,
  companySearch,
  companies,
}) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-com"
      role="tabpanel"
      aria-labelledby="nav-com-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Company Management</div>
          <label className="fw-light">Super user setting</label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Search Company:</label>
          <input
            className="form-control w-100"
            placeholder="Search Company here"
            type="text"
            onChange={(e) => setCompanySearch(e?.target?.value)}
          />
        </div>
        <div className="col-lg-6 text-end float-end align-self-end">
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => setAddCompantDialog(true)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            Add New
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive overflow-x-auto">
            <table className="table table-bordered overflow-x-auto table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Sr No.</th>
                  <th>Company Name</th>
                  <th>Legal Name</th>
                  <th>Company ID</th>
                  <th>Fiscal Year From:</th>
                  <th>Fiscal Year To:</th>
                  <th>Package</th>
                  <th className="w-180">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies?.map((item, i) => {
                  if (
                    item?.companyName
                      .toLowerCase()
                      .includes(companySearch.toLowerCase())
                  ) {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item?.companyName}</td>
                        <td>{item?.legalName}</td>
                        <td>{item?.id}</td>
                        <td>
                          {new Date(item?.fiscalYearForm).toLocaleString()}
                        </td>
                        <td>{new Date(item?.fiscalYearTo).toLocaleString()}</td>
                        <td>{item?.clientId?.clientpackage}</td>
                        <td>
                          <div>
                            <i className="fa fa-edit  px-3 f-18"></i>

                            <i className="fa fa-trash text-danger f-18"></i>
                          </div>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
