import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupAddRiskAssessment } from "../../../global-redux/reducers/planing/risk-assessment/slice";
import { toast } from "react-toastify";

const AddRiskFactorDialog = ({ setShowAddRiskFactorDialog }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = React.useState("");
  const { performRiskAssessmentObject, loading, riskAssessmentSuccess } = useSelector(
    (state) => state?.planningRiskAssessment
  );

  function handleAddRiskAssessment() {
    if (description === "") {
      toast.error("Provide the description");
    }
    if (!loading && description !== "") {
      dispatch(
        setupAddRiskAssessment({
          riskFactorApproachId: performRiskAssessmentObject?.id,
          description,
        })
      );
    }
  }

  React.useEffect(() => {
    if (riskAssessmentSuccess) {
      setDescription("");
      setShowAddRiskFactorDialog(false);
    }
  }, [riskAssessmentSuccess]);

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between">
        <div className="heading fs-5 px-1" id="staticBackdropLabel">
          Risk Factor
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowAddRiskFactorDialog(false)}
        ></button>
      </div>

      <div className="my-3 px-2">
        <label htmlFor="labeltext" className="form-label label-text">
          Add New Risk Factor
        </label>
        <div className="d-flex">
          <input
            type="email"
            id="labeltext"
            placeholder="Enter Risk Factor"
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            maxLength="100"
            className={`form-control  ${description?.length >= 100 && "error-border"
              }`}
          />
          <button
            className={`btn btn-primary ms-2 ${loading && "disabled"}`}
            onClick={handleAddRiskAssessment}
          >
            {loading ? "Loading.." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRiskFactorDialog;
