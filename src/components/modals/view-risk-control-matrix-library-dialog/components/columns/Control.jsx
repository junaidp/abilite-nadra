import React from "react";

const Control = ({ objective }) => {
  return (
    <td>
      {objective?.rcmLibraryRiskRating?.map((risk, riskIndex) => {
        return (
          <div key={riskIndex}>
            {/* Hidden Only */}
            {risk?.rcmLibraryControlRisk?.length === 0 && (
              <div className="visibility-0 mb-2">
                <div>
                  <div className="col-lg-12 mb-2">
                    <select
                      className="form-select "
                      aria-label="Default select example"
                      value={1}
                      readOnly
                      disabled
                    >
                      <option value="">Select One</option>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>
                  <textarea
                    className="form-control mb-4"
                    value="some"
                    readOnly
                    id="exampleFormCon"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            )}
            {/* Hidden Only */}
            <div>
              {risk?.rcmLibraryControlRisk?.map((control, controlIndex) => {
                return (
                  <div>
                    <div className="col-lg-12 mb-2">
                      <select
                        className="form-select "
                        aria-label="Default select example"
                        value={control?.rating}
                        disabled
                        readOnly
                        name="rating"
                      >
                        <option value="">Select One</option>
                        <option value={1}>High</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Low</option>
                      </select>
                    </div>
                    <textarea
                      key={controlIndex}
                      className="form-control mb-4"
                      value={control?.description}
                      id="exampleFormCon"
                      rows="3"
                      disabled
                      readOnly
                      name="description"
                    ></textarea>

                    {/* Hidden Only */}
                    <div className="visibility-0">
                      {control?.rcmLibraryAuditProgramsList
                        ?.slice(1)
                        ?.map((_, programIndex) => {
                          return (
                            <div key={programIndex}>
                              <div className="col-lg-12 mb-2">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={1}
                                  readOnly
                                  disabled
                                >
                                  <option value="">Select One</option>
                                  <option value={1}>High</option>
                                  <option value={2}>Medium</option>
                                  <option value={3}>Low</option>
                                </select>
                              </div>
                              <textarea
                                className="form-control mb-4"
                                value="Some"
                                id="exampleFormCon"
                                rows="3"
                                readOnly
                                disabled
                              ></textarea>
                            </div>
                          );
                        })}
                    </div>
                    {/* Hidden Only */}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </td>
  );
};

export default Control;
