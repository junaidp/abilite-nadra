import React from "react";

const Modules = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-mod"
      role="tabpanel"
      aria-labelledby="nav-mod-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Modules Management</div>
          <label className="fw-light">Super Admin view</label>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr No.</th>
                  <th>Name of Company</th>
                  <th>Audit Planning & Scheduling</th>
                  <th>Audit Engagement</th>
                  <th>Compliance Checklist</th>
                  <th>RCM Library</th>
                  <th>Reporting & Follow-up</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>xxxxxxxxxx</td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>xxxxxxxxxx</td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="checkbox-cell">
                    <input type="checkbox" className="checkbox" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12 text-end">
          <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
            <span className="btn-label me-2">
              <i className="fa fa-save"></i>
            </span>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modules;
