import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteEngagement } from "../../../../../global-redux/reducers/planing/engagement/slice";

const DeleteEngagementDialog = ({
  setShowDeleteEngagementDialog,
  currentEngagementId,
}) => {
  const dispatch = useDispatch();
  const { loading, engagementAddSuccess } = useSelector(
    (state) => state.planningEngagement
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
        <p>Are You Sure You Want To Delete Engagement?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"} `}
          onClick={handleDeleteEngagement}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowDeleteEngagementDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteEngagementDialog;
