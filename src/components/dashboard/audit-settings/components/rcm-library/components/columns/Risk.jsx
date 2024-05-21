import React from "react";

const Risk = ({
  objective,
  handleChangeRisk,
  handleEditableRisk,
  handleSaveRisk,
  loading,
  rcmAddSuccess,
  userHierarchy,
  userRole,
  deleteRCMRisk,
}) => {
  const [currentButtonRiskId, setCurrentButtonRiskId] = React.useState("");
  React.useEffect(() => {
    if (rcmAddSuccess) {
      setCurrentButtonRiskId("");
    }
  }, [rcmAddSuccess]);
  return (
    <td>
      {objective?.rcmLibraryRiskRating?.map((risk, riskIndex) => {
        return (
          <div key={riskIndex}>
            <div>
              <div className="col-lg-12 mb-2">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  value={risk?.rating}
                  disabled={risk?.editable === false ? true : false}
                  onChange={(event) =>
                    handleChangeRisk(event, objective?.id, risk?.id)
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
                className="form-control"
                value={risk?.description}
                id="exampleFormCon"
                rows="3"
                onChange={(event) =>
                  handleChangeRisk(event, objective?.id, risk?.id)
                }
                name="description"
                disabled={risk?.editable === false ? true : false}
                maxlength="500"
              ></textarea>
              <label className="word-limit-info label-text">
                Maximum 500 characters
              </label>
              {risk?.editable === true ? (
                <div className="col-lg-12">
                  <div
                    className={`btn btn-labeled btn-primary  shadow mt-2 float-end mb-4 ${
                      loading && currentButtonRiskId === risk?.id && "disabled"
                    }  `}
                    onClick={() => {
                      setCurrentButtonRiskId(risk?.id);
                      handleSaveRisk(risk);
                    }}
                  >
                    {loading && currentButtonRiskId === risk?.id
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
                        handleEditableRisk(objective?.id, risk?.id)
                      }
                    >
                      <i className="fa fa-edit mb-4 f-18"></i>
                    </div>
                  )}
                </div>
              )}
              {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                <div className="float-end w-100 mb-2">
                  <i
                    className="fa fa-trash text-danger f-18 mb-2 cursor-pointer"
                    onClick={() => deleteRCMRisk(risk?.id)}
                  ></i>
                  <hr />
                </div>
              )}
              {/* Hidden  Only */}
              <div className="visibility-0">
                {risk?.rcmLibraryControlRisk
                  ?.slice(1)
                  ?.map((control, controlIndex) => {
                    return (
                      <div key={controlIndex}>
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
                          className="form-control "
                          value={control?.description}
                          id="exampleFormCon"
                          rows="3"
                          name="description"
                          maxlength="500"
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
                    );
                  })}
              </div>
              {/* Hidden  Only */}
            </div>
          </div>
        );
      })}
    </td>
  );
};

export default Risk;
