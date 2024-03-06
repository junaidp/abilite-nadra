import React from "react";

const Program = ({ objective }) => {
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
                    disabled
                  ></textarea>
                </div>
              </div>
            )}
            {/* Hidden Only */}
            {risk?.rcmLibraryControlRisk?.map((control, controlIndex) => {
              return (
                <div key={controlIndex}>
                  {/* Hidden Only */}
                  {control?.rcmLibraryAuditProgramsList?.length === 0 && (
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
                          disabled
                          id="exampleFormCon"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  )}
                  {/* Hidden Only */}

                  {control?.rcmLibraryAuditProgramsList?.map(
                    (program, programIndex) => {
                      return (
                        <div key={programIndex}>
                          <div className="col-lg-12 mb-2">
                            <select
                              className="form-select "
                              aria-label="Default select example"
                              value={program?.rating}
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
                            className="form-control mb-4"
                            value={program?.description}
                            disabled
                            readOnly
                            id="exampleFormCon"
                            name="description"
                            rows="3"
                          ></textarea>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </td>
  );
};

export default Program;
