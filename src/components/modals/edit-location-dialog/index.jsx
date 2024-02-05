import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setupUpdateLocation } from "../../../global-redux/reducers/settings/location/slice";

const EditLocationDialog = ({ setShowEditLocationDialog, LocationId }) => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const { locationAddSuccess, allLocations, loading } = useSelector(
    (state) => state.setttingsLocation
  );
  const [LocationName, setLocationName] = React.useState("");
  const dispatch = useDispatch();
  function handleSubmit() {
    if (LocationName === "") {
      toast.error("Provide Location name");
    }
    if (LocationName && !loading) {
      const selectedCompany = user[0]?.company?.find(
        (item) => item?.companyName === company
      );

      dispatch(
        setupUpdateLocation({
          id: LocationId,
          description: LocationName,
          companyObj: selectedCompany,
        })
      );
    }
  }

  React.useEffect(() => {
    if (locationAddSuccess) {
      setTimeout(() => {
        setLocationName("");
        setShowEditLocationDialog(false);
      }, 500);
    }
  }, [locationAddSuccess]);
  
  React.useEffect(() => {
    const { description } = allLocations.find(
      (item) => item?.id === LocationId
    );
    setLocationName(description);
  }, []);
  return (
    <div className="p-4">
      <h4 className="mb-4">Edit Location</h4>
      <div className="row mb-4 flex items-center">
        <div className="col-lg-2 label-text">Location Name:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <input
              type="description"
              id="description"
              name="description"
              className="form-control"
              value={LocationName}
              onChange={(e) => setLocationName(e?.target?.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 w-100">
          <button
            className={`btn btn-primary ${loading && "disabled"}`}
            onClick={handleSubmit}
          >
            {loading ? "Loading" : "Edit"}
          </button>
        </div>
        <div className="mb-4">
          <button
            className="btn btn-danger float-end"
            onClick={() => {
              setShowEditLocationDialog(false);
              setLocationName("");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLocationDialog;
