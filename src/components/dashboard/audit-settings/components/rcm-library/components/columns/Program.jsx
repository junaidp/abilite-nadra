import React from "react";

const Program = ({
  objective,
  handleChangeProgram,
  handleSaveProgram,
  handleEditableProgram,
  loading,
  rcmAddSuccess,
  userHierarchy,
  userRole,
  deleteRCMProgram,
}) => {
  const [currentButtonProgramId, setCurrentButtonProgramId] =
    React.useState("");
  React.useEffect(() => {
    if (rcmAddSuccess) {
      setCurrentButtonProgramId("");
    }
  }, [rcmAddSuccess]);
  return (
    <td>
      {objective?.rcmLibraryRiskRating?.map((risk, riskIndex) => {
        return (
          <div key={riskIndex}>
            {/* Hidden Only */}
            {risk?.rcmLibraryControlRisk?.length === 0 && (
              <div className="visibility-0">
                <div>
                  <div className="col-lg-12 mb-2">
                    <select
                      className="form-select "
                      aria-label="Default select example"
                      value={risk?.rating}
                      name="rating"
                    >
                      <option value="">Select One</option>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>
                  <textarea
                    className="form-control"
                    value={risk?.description}
                    id="exampleFormCon"
                    rows="3"
                    name="description"
                    maxLength="500"
                  ></textarea>
                  <label className="word-limit-info label-text">
                    Maximum 500 characters
                  </label>
                  {risk?.editable === true ? (
                    <div className="col-lg-12">
                      <div
                        className={`btn btn-labeled btn-primary  shadow mt-2 float-end mb-4`}
                      >
                        Save
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 mb-4">
                      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                        <div className="float-end">
                          <i className="fa fa-edit mb-4 f-18"></i>
                        </div>
                      )}
                    </div>
                  )}
                  {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                    <div className="float-end w-100 mb-2">
                      <i className="fa fa-trash text-danger f-18 mb-2 cursor-pointer"></i>
                      <hr />
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Hidden Only */}
            {risk?.rcmLibraryControlRisk?.map((control, controlIndex) => {
              return (
                <div key={controlIndex}>
                  {/* Hidden Only */}
                  {control?.rcmLibraryAuditProgramsList?.length === 0 && (
                    <div className="visibility-0">
                      <div>
                        <div className="col-lg-12 mb-2">
                          <select
                            className="form-select "
                            aria-label="Default select example"
                            value={control?.rating}
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
                          className="form-control "
                          value={control?.description}
                          id="exampleFormCon"
                          rows="3"
                          name="description"
                          maxLength="500"
                        ></textarea>
                        <label className="word-limit-info label-text">
                          Maximum 500 characters
                        </label>
                        {control?.editable === true ? (
                          <div className="col-lg-12  ">
                            <div
                              className={`btn btn-labeled btn-primary  shadow mt-2 float-end mb-4`}
                            >
                              Save
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 mb-4">
                            {(userRole === "ADMIN" ||
                              userHierarchy === "IAH") && (
                              <div className="float-end">
                                <i className="fa fa-edit mb-4 f-18"></i>
                              </div>
                            )}
                          </div>
                        )}
                        {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                          <div className="float-end w-100">
                            <i className="fa fa-trash text-danger f-18 mb-2 cursor-pointer"></i>
                            <hr />
                          </div>
                        )}
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
                              disabled={
                                program?.editable === false ? true : false
                              }
                              onChange={(event) =>
                                handleChangeProgram(
                                  event,
                                  objective?.id,
                                  risk?.id,
                                  control?.id,
                                  program?.id
                                )
                              }
                              name="rating"
                            >
                              <option value="">Select One</option>
                              <option value={1}>High</option>
                              <option value={2}>Medium</option>
                              <option value={3}>Low</option>
                            </select>
                          </div>
                          <textarea
                            value={program?.description}
                            disabled={
                              program?.editable === false ? true : false
                            }
                            id="exampleFormCon"
                            onChange={(event) =>
                              handleChangeProgram(
                                event,
                                objective?.id,
                                risk?.id,
                                control?.id,
                                program?.id
                              )
                            }
                            name="description"
                            rows="3"
                            maxLength="500"
                            className={`form-control ${
                              program?.description?.length >= 500 &&
                              "error-border"
                            }`}
                          ></textarea>
                          <label className="word-limit-info label-text">
                            Maximum 500 characters
                          </label>{" "}
                          {program?.editable === true ? (
                            <div className="col-lg-12">
                              <div
                                className={`btn btn-labeled btn-primary  shadow mt-2 float-end  mb-4 ${
                                  loading &&
                                  currentButtonProgramId === program?.id &&
                                  "disabled"
                                }`}
                                onClick={() => {
                                  setCurrentButtonProgramId(program?.id);
                                  handleSaveProgram(program);
                                }}
                              >
                                {loading &&
                                currentButtonProgramId === program?.id
                                  ? "Loading..."
                                  : "Save"}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 mb-4">
                              {(userRole === "ADMIN" ||
                                userHierarchy === "IAH") && (
                                <div
                                  className="float-end"
                                  onClick={() =>
                                    handleEditableProgram(
                                      objective?.id,
                                      risk?.id,
                                      control?.id,
                                      program?.id
                                    )
                                  }
                                >
                                  <i className="fa fa-edit mb-4  f-18"></i>
                                </div>
                              )}
                            </div>
                          )}
                          {(userRole === "ADMIN" ||
                            userHierarchy === "IAH") && (
                            <div className="float-end w-100">
                              <i
                                className="fa fa-trash text-danger f-18 mb-2 cursor-pointer"
                                onClick={() => deleteRCMProgram(program?.id)}
                              ></i>
                              <hr />
                            </div>
                          )}
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
