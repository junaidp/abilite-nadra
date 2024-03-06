import React from "react";

const Objective = ({
  objective,
  handleSaveObjective,
  handleChangeObjective,
  handleEditableObjective,
  loading,
  rcmAddSuccess
}) => {
  const [currentButtonObjectiveId, setCurrentButtonObjectiveId] =
    React.useState("");
    React.useEffect(()=>{
      if(rcmAddSuccess){
        setCurrentButtonObjectiveId("")
      }
    },[rcmAddSuccess])
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
          className="form-control"
          value={objective?.description}
          id="exampleFormCon"
          rows="3"
          disabled={objective?.editable === false ? true : false}
          name="description"
          onChange={(event) => handleChangeObjective(event, objective?.id)}
        ></textarea>
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
          <div
            className="float-end mt-2  mb-4"
            onClick={() => handleEditableObjective(objective?.id)}
          >
            <i className="fa fa-edit   f-18"></i>
          </div>
        )}
      </div>
    </td>
  );
};

export default Objective;
