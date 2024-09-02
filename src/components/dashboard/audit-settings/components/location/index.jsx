import React from "react";
import {
  setupAddLocation,
  setupGetAllLocations,
  resetLocationAddSuccess,
  setupSaveSubLocation,
  setupDeleteSubLocation,
} from "../../../../../global-redux/reducers/settings/location/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import EditLocationDialog from "../../../../modals/edit-location-dialog";
import EditSubLocationDialog from "../../../../modals/edit-sub-location-dialog";
import AccordionItem from "./AccordionItem";
import DeleteLocationDialog from "./DeleteDialog";

const Location = ({ userHierarchy, userRole, currentSettingOption }) => {
  const dispatch = useDispatch();
  const { loading, locationAddSuccess, allLocations } = useSelector(
    (state) => state.settingsLocation
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [locationDescription, setLocationDescription] = React.useState("");
  const [deleteLocationDialog, setShowDeleteLocationDialog] =
    React.useState(false);
  const [subLocationText, setSubLocationText] = React.useState("");
  const [LocationId, setLocationId] = React.useState("");
  const [SubLocationId, setSubLocationId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [showEditLocationDialog, setShowEditLocationDialog] =
    React.useState(false);
  const [showEditSubLocationDialog, setShowEditSubLocationDialog] =
    React.useState(false);

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleSaveLocation() {
    if (!loading) {
      if (locationDescription === "") {
        toast.error("Provide the location");
      } else {
        const selectedCompany = user[0]?.company?.find(
          (item) => item?.companyName === company
        );
        dispatch(
          setupAddLocation({
            description: locationDescription,
            companyObj: selectedCompany,
          })
        );
      }
    }
  }

  function handleAddSubLocation() {
    if (!loading) {
      if (subLocationText === "") {
        toast.error("Provide Sub Location");
      } else {
        dispatch(
          setupSaveSubLocation({
            description: subLocationText,
            locationId: LocationId,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    if (locationAddSuccess) {
      setLocationDescription("");
      dispatch(setupGetAllLocations(`?companyId=${companyId}`));
      dispatch(resetLocationAddSuccess());
      setPage(1);
    }
  }, [locationAddSuccess]);

  React.useEffect(() => {
    setPage(1);
    setLocationDescription("");
    setSubLocationId("");
    setLocationId("");
    setSubLocationText("");
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade"
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      {deleteLocationDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <DeleteLocationDialog
              setShowDeleteLocationDialog={setShowDeleteLocationDialog}
              LocationId={LocationId}
            />
          </div>
        </div>
      )}
      {showEditLocationDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <EditLocationDialog
              setShowEditLocationDialog={setShowEditLocationDialog}
              LocationId={LocationId}
            />
          </div>
        </div>
      )}
      {showEditSubLocationDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <EditSubLocationDialog
              setShowEditSubLocationDialog={setShowEditSubLocationDialog}
              LocationId={LocationId}
              SubLocationId={SubLocationId}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">
            Location & Departments Management
          </div>
          <label className="fw-light">
            Create and manage your dropdown list for your organisation Location
            Division / Department
          </label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label className="w-100">Add Location:</label>
          <input
            className="form-control w-100"
            placeholder="Enter"
            type="text"
            name="locationDescription"
            value={locationDescription}
            onChange={(e) => setLocationDescription(e?.target?.value)}
          />
        </div>
        <div
          className={`col-lg-6 text-end float-end align-self-end ${
            loading && "disabled"
          }`}
          onClick={handleSaveLocation}
        >
          <div className="btn btn-labeled btn-primary px-3 shadow">
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            {loading ? "Loading" : "Add"}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="accordion" id="accordionLocationExample">
            {loading ? (
              <CircularProgress />
            ) : allLocations?.length === 0 ? (
              <p>No Locations To Show.</p>
            ) : (
              allLocations
                ?.slice((page - 1) * 10, page * 10)
                ?.map((item, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      index={index}
                      setLocationId={setLocationId}
                      setSubLocationText={setSubLocationText}
                      item={item}
                      subLocationText={subLocationText}
                      handleAddSubLocation={handleAddSubLocation}
                      loading={loading}
                      setSubLocationId={setSubLocationId}
                      setShowEditLocationDialog={setShowEditLocationDialog}
                      setShowEditSubLocationDialog={
                        setShowEditSubLocationDialog
                      }
                      setupDeleteSubLocation={setupDeleteSubLocation}
                      userRole={userRole}
                      userHierarchy={userHierarchy}
                      setShowDeleteLocationDialog={setShowDeleteLocationDialog}
                    />
                  );
                })
            )}
            {allLocations && allLocations?.length > 0 && (
              <Pagination
                count={Math.ceil(allLocations?.length / 10)}
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
