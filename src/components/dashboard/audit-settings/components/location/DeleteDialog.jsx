import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteLocation } from "../../../../../global-redux/reducers/settings/location/slice";

const DeleteLocationDialog = ({ setShowDeleteLocationDialog, LocationId }) => {
  const dispatch = useDispatch();
  const { loading, locationAddSuccess } = useSelector(
    (state) => state.setttingsLocation
  );

  function handleDeleteLocation() {
    if (!loading) {
      dispatch(setupDeleteLocation(LocationId));
    }
  }

  React.useEffect(() => {
    if (locationAddSuccess) {
      setShowDeleteLocationDialog(false);
    }
  }, [locationAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete this location?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteLocation}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteLocationDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLocationDialog;
