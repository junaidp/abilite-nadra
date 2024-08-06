import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitJobScheduling } from "../../../../../../global-redux/reducers/planing/job-scheduling/slice";

const SubmitDialog = ({
  currentJobSchedulingObject,
  setShowSubmitDialog,
  allLocations,
  allSubLocations,
}) => {
  const dispatch = useDispatch();
  const { jobSchedulingAddSuccess, loading } = useSelector(
    (state) => state?.planningJobScheduling
  );

  function handleSubmit() {
    if (!loading) {
      const filteredLocationArray = allLocations.filter((item) =>
        currentJobSchedulingObject?.locationList.includes(item?.description)
      );
      const filteredSubLocationArray = allSubLocations.filter((item) =>
        currentJobSchedulingObject?.subLocation.includes(item?.description)
      );
      let object;
      object = {
        ...currentJobSchedulingObject,
        locationList: filteredLocationArray.map((list) => {
          return {
            id: list?.id,
            description: list?.description,
            companyid: list?.companyid,
          };
        }),
        subLocation: filteredSubLocationArray,
        complete: true,
      };
      dispatch(setupSubmitJobScheduling(object));
    }
  }

  React.useEffect(() => {
    if (jobSchedulingAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [jobSchedulingAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Job Scheduling?</p>
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
