import React from "react";

const Objective = ({
  objective,
  handleSaveObjective,
  handleChangeObjective,
  handleEditableObjective,
  loading,
  rcmAddSuccess,
  userHierarchy,
  userRole,
  deleteRCMObjective,
}) => {
  const [currentButtonObjectiveId, setCurrentButtonObjectiveId] =
    React.useState("");
  React.useEffect(() => {
    if (rcmAddSuccess) {
      setCurrentButtonObjectiveId("");
    }
  }, [rcmAddSuccess]);
  return (
    <td>
      <div>
        <div className="col-lg-12 mb-2">
          <select
            className="form-select "
            aria-label="Default select example"
            value={objective?.rating}
            disabled={objective?.editable === false ? true : false}
            name="rating"
            onChange={(event) => handleChangeObjective(event, objective?.id)}
          >
            <option value="">Select One</option>
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>
        <textarea
          value={objective?.description}
          id="exampleFormCon"
          rows="3"
          disabled={objective?.editable === false ? true : false}
          name="description"
          onChange={(event) => handleChangeObjective(event, objective?.id)}
          maxLength="5000"
          className={`form-control ${
            objective?.description?.length >= 5000 && "error-border"
          }`}
        ></textarea>
        <label className="word-limit-info label-text">
          Maximum 5000 characters
        </label>{" "}
        {objective?.editable === true ? (
          <div
            className="col-lg-12"
            onClick={() => {
              setCurrentButtonObjectiveId(objective?.id);
              handleSaveObjective(objective);
            }}
          >
            <div
              className={`btn btn-labeled btn-primary  shadow mt-2 float-end  mb-4 ${
                loading &&
                currentButtonObjectiveId === objective?.id &&
                "disabled"
              } `}
            >
              {loading && currentButtonObjectiveId === objective?.id
                ? "Loading..."
                : "Save"}
            </div>
          </div>
        ) : (
          <div className="mb-4 mt-2">
            {(userRole === "ADMIN" || userHierarchy === "IAH") && (
              <div
                className="float-end"
                onClick={() => handleEditableObjective(objective?.id)}
              >
                <i className="fa fa-edit  f-18"></i>
              </div>
            )}
          </div>
        )}
        {(userRole === "ADMIN" || userHierarchy === "IAH") && (
          <div className="float-end w-100">
            <i
              className="fa fa-trash text-danger f-18  cursor-pointer"
              onClick={() => deleteRCMObjective(objective?.id)}
            ></i>
          </div>
        )}
      </div>
    </td>
  );
};

export default Objective;
