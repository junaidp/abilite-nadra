import React from "react";

const AccordionItem = ({ item, setUpdatedRCMId, setShowUpdateRCMDialog }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed br-8"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${item?.id}`}
          aria-expanded="false"
          aria-controls={`flush-collapseFive${item?.id}`}
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {item?.description}
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`flush-collapse${item?.id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div
            className="col-lg-12"
            onClick={() => {
              setShowUpdateRCMDialog(true);
              setUpdatedRCMId(item?.id);
            }}
          >
            <div className="btn btn-labeled btn-primary  shadow">
              Update RCM
            </div>
          </div>
          <div className="container">
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead>
                      <tr>
                        <th>Objective</th>
                        <th>Risk</th>
                        <th>Controls</th>
                        <th>Program</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item?.rcmLibraryObjectives?.map((objective, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <textarea
                                className="form-control"
                                value={objective?.description}
                                id="exampleFormCon"
                                rows="3"
                              ></textarea>
                            </td>
                            <td>
                              {objective?.rcmLibraryRiskRating?.map(
                                (risk, riskIndex) => {
                                  return (
                                    <div>
                                      <textarea
                                        key={riskIndex}
                                        className="form-control mb-4"
                                        value={risk?.description}
                                        id="exampleFormCon"
                                        rows="3"
                                      ></textarea>
                                      <div className="visibility-0">
                                        {risk?.rcmLibraryControlRisk
                                          ?.slice(1)
                                          ?.map((control, controlIndex) => {
                                            return (
                                              <textarea
                                                key={controlIndex}
                                                className="form-control mb-4"
                                                value={control?.description}
                                                id="exampleFormCon"
                                                rows="3"
                                              ></textarea>
                                            );
                                          })}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </td>
                            <td>
                              {objective?.rcmLibraryRiskRating?.map((risk) =>
                                risk?.rcmLibraryControlRisk?.map(
                                  (control, controlIndex) => {
                                    return (
                                      <div>
                                        {risk?.rcmLibraryControlRisk?.length ===
                                          0 && (
                                          <div className="visibility-0">
                                            <textarea
                                              key={controlIndex}
                                              className="form-control mb-4"
                                              value={control?.description}
                                              id="exampleFormCon"
                                              rows="3"
                                            ></textarea>
                                          </div>
                                        )}
                                        <textarea
                                          key={controlIndex}
                                          className="form-control mb-4"
                                          value={control?.description}
                                          id="exampleFormCon"
                                          rows="3"
                                        ></textarea>
                                        <div className="visibility-0">
                                          {control?.rcmLibraryAuditProgramsList
                                            ?.slice(1)
                                            ?.map((program, programIndex) => {
                                              return (
                                                <textarea
                                                  key={programIndex}
                                                  className="form-control mb-4"
                                                  value={program?.description}
                                                  id="exampleFormCon"
                                                  rows="3"
                                                ></textarea>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    );
                                  }
                                )
                              )}
                            </td>
                            <td>
                              {objective?.rcmLibraryRiskRating?.map((risk) =>
                                risk?.rcmLibraryControlRisk?.map((control) =>
                                  control?.rcmLibraryAuditProgramsList?.map(
                                    (program, programIndex) => {
                                      return (
                                        <div>
                                          <textarea
                                            key={programIndex}
                                            className="form-control mb-4"
                                            value={program?.description}
                                            id="exampleFormCon"
                                            rows="3"
                                          ></textarea>
                                        </div>
                                      );
                                    }
                                  )
                                )
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
