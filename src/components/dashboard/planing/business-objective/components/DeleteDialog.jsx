import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteEngagement } from "../../../../../global-redux/reducers/planing/engagement/slice";

const DeleteEngagementDialog = ({
  setShowDeleteEngagementDialog,
  currentEngagementId,
}) => {
  const dispatch = useDispatch();
  const { loading, engagementAddSuccess } = useSelector(
    (state) => state.planingEngagements
  );

  function handleDeleteEngagement() {
    if (!loading) {
      dispatch(setupDeleteEngagement(currentEngagementId));
    }
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      setShowDeleteEngagementDialog(false);
    }
  }, [engagementAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete the engagement?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteEngagement}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteEngagementDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEngagementDialog;
