import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteLocation } from "../../../../../global-redux/reducers/settings/location/slice";

const DeleteLocationDialog = ({ setShowDeleteLocationDialog, LocationId }) => {
  const dispatch = useDispatch();
  const { loading, locationAddSuccess } = useSelector(
    (state) => state.settingsLocation
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
        <p>Are You Sure You Want To Delete Location?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"} `}
          onClick={handleDeleteLocation}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowDeleteLocationDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteLocationDialog;
