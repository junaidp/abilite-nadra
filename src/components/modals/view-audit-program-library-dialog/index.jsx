import React from "react";

const index = ({ setViewAuditProgramLibraryDialog }) => {
  return (
    <div className="mx-5">
      <header className="section-header mt-3  px-4  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="mx-2 m-2 heading">Audit Program Library</h2>
        </div>
      </header>
      <div className="row py-4 px-4">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead>
                <tr>
                  <th className="sr-col">Sr. #</th>
                  <th>Controls</th>
                  <th>Audit Programs</th>
                  <th>
                    <input
                      id="rememberMe"
                      type="checkbox"
                      formControlName="rememberMe"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label>1</label>
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              "
                      rows="3"
                    />
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                      rows="3"
                    ></textarea>
                  </td>
                  <td>
                    <input
                      id="rememberMe"
                      type="checkbox"
                      formControlName="rememberMe"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>2</label>
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              "
                      rows="3"
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              "
                      rows="3"
                    ></textarea>
                  </td>
                  <td>
                    <input
                      id="rememberMe"
                      type="checkbox"
                      formControlName="rememberMe"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row py-4 px-4">
        <div className="col-lg-12 text-end">
          <button
            mat-dialog-close
            className="btn btn-danger float-end"
            onClick={()=>setViewAuditProgramLibraryDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
