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
              <div className="visibility-0 mb-2">
                <div>
                  <div className="col-lg-12 mb-2">
                    <select
                      className="form-select "
                      aria-label="Default select example"
                      value={1}
                      readOnly
                    >
                      <option value="">Select One</option>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>
                  <textarea
                    className={`form-control ${
                      userRole !== "ADMIN" && userHierarchy !== "IAH" && "mb-4"
                    }`}
                    value="some"
                    readOnly
                    id="exampleFormCon"
                    rows="3"
                  ></textarea>
                  <div>
                    {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                      <div className="btn btn-labeled btn-primary  shadow mt-2 float-end mb-2">
                        Get RCM
                      </div>
                    )}
                  </div>
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
                    ></textarea>
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
                                >
                                  <option value="">Select One</option>
                                  <option value={1}>High</option>
                                  <option value={2}>Medium</option>
                                  <option value={3}>Low</option>
                                </select>
                              </div>
                              <textarea
                                className={`form-control ${
                                  userRole !== "ADMIN" &&
                                  userHierarchy !== "IAH" &&
                                  "mb-4"
                                }`}
                                value="Some"
                                id="exampleFormCon"
                                rows="3"
                                readOnly
                              ></textarea>
                              {(userRole === "ADMIN" ||
                                userHierarchy === "IAH") && (
                                <div className="btn btn-labeled btn-primary  shadow mt-2 float-end mb-2 mt-2">
                                  Save
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
