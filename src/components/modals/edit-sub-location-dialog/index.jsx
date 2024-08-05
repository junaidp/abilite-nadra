import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setupUpdateSubLocation } from "../../../global-redux/reducers/settings/location/slice";

const EditSubLocationDialog = ({
  setShowEditSubLocationDialog,
  LocationId,
  SubLocationId,
}) => {
  const { locationAddSuccess, allLocations, loading } = useSelector(
    (state) => state.settingsLocation
  );
  const [SubLocationName, setSubLocationName] = React.useState("");
  const dispatch = useDispatch();
  function handleSubmit() {
    if (SubLocationName === "") {
      toast.error("Provide Sub Location name");
    }
    if (SubLocationName && !loading) {
      dispatch(
        setupUpdateSubLocation({
          id: SubLocationId,
          description: SubLocationName,
          locationId: LocationId,
        })
      );
    }
  }

  React.useEffect(() => {
    if (locationAddSuccess) {
      setTimeout(() => {
        setSubLocationName("");
        setShowEditSubLocationDialog(false);
      }, 500);
    }
  }, [locationAddSuccess]);

  React.useEffect(() => {
    const location = allLocations.find((item) => item?.id === LocationId);
    const subLocationText = location?.subLocations?.find(
      (all) => all?.id === SubLocationId
    );
    setSubLocationName(subLocationText?.description);
  }, [LocationId, SubLocationId]);

  return (
    <div className="p-4 min-h-170">
      <h4 className="mb-4 heading">Update Sub Location</h4>
      <div className="row mb-4 flex items-center">
        <div className="col-lg-12">
          <div className="form-group">
            <input
              type="description"
              id="description"
              name="description"
              className="form-control"
              value={SubLocationName}
              onChange={(e) => setSubLocationName(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className={`btn float-start btn-primary ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading" : "Edit"}
        </button>
      </div>
      <div>
        <button
          className="btn btn-danger float-end"
          onClick={() => {
            setShowEditSubLocationDialog(false);
            setSubLocationName("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditSubLocationDialog;
