import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitJobPrioritization } from "../../../../global-redux/reducers/planing/job-prioritization/slice";

const SubmitDialog = ({ currentItemId, setShowSubmitDialog }) => {
  const dispatch = useDispatch();
  const { jobPrioritizationAddSuccess, loading, allJobPrioritization } =
    useSelector((state) => state?.planningJobPrioritization);

  function handleSubmit() {
    if (!loading) {
      let object = allJobPrioritization?.find(
        (item) => item?.id === currentItemId
      );
      object = {
        ...object,
        year: Number(object?.year),
        completed: true,
      };
      dispatch(setupSubmitJobPrioritization(object));
    }
  }

  React.useEffect(() => {
    if (jobPrioritizationAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [jobPrioritizationAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Job Prioritization?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-danger  float-end mx-2`}
          onClick={() => setShowSubmitDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitDialog;
