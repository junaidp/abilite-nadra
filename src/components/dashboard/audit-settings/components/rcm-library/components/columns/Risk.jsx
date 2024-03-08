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
              ></textarea>
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
              {/* Hidden  Only */}
              <div className="visibility-0">
                {risk?.rcmLibraryControlRisk
                  ?.slice(1)
                  ?.map((_, controlIndex) => {
                    return (
                      <div key={controlIndex}>
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
                        <div>
                          {(userRole === "ADMIN" ||
                            userHierarchy === "IAH") && (
                            <div className="btn btn-labeled btn-primary  shadow mt-2 float-end  mt-2 mb-2">
                              Save
                            </div>
                          )}
                        </div>
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
