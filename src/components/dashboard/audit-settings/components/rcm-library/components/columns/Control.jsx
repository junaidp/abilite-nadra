import React from "react";

const Control = ({
  objective,
  handleChangeControl,
  handleSaveControl,
  handleEditableControl,
  loading,
  rcmAddSuccess,
  userHierarchy,
  userRole,
  deleteRCMControl,
}) => {
  const [currentButtonControlId, setCurrentButtonControlId] =
    React.useState("");
  React.useEffect(() => {
    if (rcmAddSuccess) {
      setCurrentButtonControlId("");
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
                    maxlength="500"
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
            <div>
              {risk?.rcmLibraryControlRisk?.map((control, controlIndex) => {
                return (
                  <div key={controlIndex}>
                    <div className="col-lg-12 mb-2">
                      <select
                        className="form-select "
                        aria-label="Default select example"
                        value={control?.rating}
                        onChange={(event) =>
                          handleChangeControl(
                            event,
                            objective?.id,
                            risk?.id,
                            control?.id
                          )
                        }
                        name="rating"
                        disabled={control?.editable === false ? true : false}
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
                      onChange={(event) =>
                        handleChangeControl(
                          event,
                          objective?.id,
                          risk?.id,
                          control?.id
                        )
                      }
                      name="description"
                      disabled={control?.editable === false ? true : false}
                      maxlength="500"
                    ></textarea>
                    <label className="word-limit-info label-text">
                      Maximum 500 characters
                    </label>
                    {control?.editable === true ? (
                      <div className="col-lg-12  ">
                        <div
                          className={`btn btn-labeled btn-primary  shadow mt-2 float-end mb-4 ${
                            loading &&
                            currentButtonControlId === control?.id &&
                            "disabled"
                          } `}
                          onClick={() => {
                            setCurrentButtonControlId(control?.id);
                            handleSaveControl(control);
                          }}
                        >
                          {loading && currentButtonControlId === control?.id
                            ? "Loading..."
                            : "Save"}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 mb-4">
                        {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                          <div
                            className="float-end"
                            onClick={() =>
                              handleEditableControl(
                                objective?.id,
                                risk?.id,
                                control?.id
                              )
                            }
                          >
                            <i className="fa fa-edit mb-4 f-18"></i>
                          </div>
                        )}
                      </div>
                    )}
                    {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                      <div className="float-end w-100">
                        <i
                          className="fa fa-trash text-danger f-18 mb-2 cursor-pointer"
                          onClick={() => deleteRCMControl(control?.id)}
                        ></i>
                        <hr />
                      </div>
                    )}
                    {/* Hidden Only */}
                    <div className="visibility-0">
                      {control?.rcmLibraryAuditProgramsList
                        ?.slice(1)
                        ?.map((program, programIndex) => {
                          return (
                            <div key={programIndex}>
                              <div className="col-lg-12 mb-2">
                                <select
                                  className="form-select "
                                  aria-label="Default select example"
                                  value={program?.rating}
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
                                value={program?.description}
                                id="exampleFormCon"
                                name="description"
                                rows="3"
                                maxlength="500"
                              ></textarea>
                              <label className="word-limit-info label-text">
                                Maximum 500 characters
                              </label>
                              {program?.editable === true ? (
                                <div className="col-lg-12">
                                  <div
                                    className={`btn btn-labeled btn-primary  shadow mt-2 float-end  mb-4`}
                                  >
                                    Save
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-2 mb-4">
                                  {(userRole === "ADMIN" ||
                                    userHierarchy === "IAH") && (
                                    <div className="float-end">
                                      <i className="fa fa-edit mb-4  f-18"></i>
                                    </div>
                                  )}
                                </div>
                              )}
                              {(userRole === "ADMIN" ||
                                userHierarchy === "IAH") && (
                                <div className="float-end w-100">
                                  <i className="fa fa-trash text-danger f-18 mb-2 cursor-pointer"></i>
                                  <hr />
                                </div>
                              )}
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
