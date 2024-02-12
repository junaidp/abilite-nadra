import React from "react";

const ViewRiskControlMatrixLibraryDialog = ({
  setShowViewLibrary,
  currentAuditEngagement,
}) => {
  return (
    <div className="mx-5">
      <header className="section-header mt-3  px-4  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="mx-2 m-2 heading">Library</h2>
        </div>
      </header>

      <div className="row py-4 px-4">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead>
                <tr>
                  <th>Objective</th>
                  <th>Risk</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                {currentAuditEngagement?.riskControlMatrix?.objectives?.map(
                  (item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="width-50 mb-2">Objective</label>
                            <select
                              className="form-select w-80  mb-2"
                              aria-label="Default select example"
                              value={item?.rating}
                              readOnly
                            >
                              <option value="">Select One</option>
                              <option value={1}>High</option>
                              <option value={2}>Medium</option>
                              <option value={3}>Low</option>
                            </select>
                          </div>
                          <textarea
                            className="form-control"
                            value={item?.description}
                            id="exampleFo"
                            readOnly
                            rows="3"
                          ></textarea>
                        </td>

                        <td>
                          {item?.riskRatingList?.map((risk, index) => {
                            return (
                              <div key={index} className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                  <label className="width-100 mb-2">
                                    Rating
                                  </label>
                                  <select
                                    className="form-select w-80  mb-2"
                                    aria-label="Default select example"
                                    value={risk?.rating}
                                    readOnly
                                  >
                                    <option value="">Select One</option>
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                  </select>
                                </div>
                                <textarea
                                  className="form-control"
                                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                "
                                  id="example"
                                  value={risk?.description}
                                  readOnly
                                  rows="3"
                                ></textarea>
                              </div>
                            );
                          })}
                        </td>
                        <td>
                          {item?.riskRatingList?.map((rating) =>
                            rating?.controlRiskList?.map((control, index) => {
                              return (
                                <div key={index} className="mb-4">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <label className="mb-2">Control</label>
                                    <select
                                      className="form-select w-80  mb-2"
                                      aria-label="Default select example"
                                      value={control?.rating}
                                      readOnly
                                    >
                                      <option value="">Select One</option>
                                      <option value={1}>High</option>
                                      <option value={2}>Medium</option>
                                      <option value={3}>Low</option>
                                    </select>
                                  </div>
                                  <textarea
                                    className="form-control"
                                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    "
                                    id="example"
                                    value={control?.description}
                                    readOnly
                                    rows="3"
                                  ></textarea>
                                </div>
                              );
                            })
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row py-4 px-4">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => setShowViewLibrary(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRiskControlMatrixLibraryDialog;
