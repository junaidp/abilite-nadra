import React from "react";
import {
  setupAddLocation,
  setupGetAllLocations,
  resetLocationAddSuccess,
  setupSaveSubLocation,
  setupDeleteSubLocation,
  setupUploadLocation
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
  const fileInputRef = React.useRef(null);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [locationDescription, setLocationDescription] = React.useState("");
  const [deleteLocationDialog, setShowDeleteLocationDialog] =
    React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
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

  const handleDownload = () => {
    const fileUrl = "/sample-file-location.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "sample-file-location.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  const onApiCall = async (file) => {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      const formData = new FormData();
      formData.append("file", file);
      dispatch(setupUploadLocation({ formData, companyId }));
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  function handleSaveLocation() {
    if (!loading) {
      if (locationDescription.trim() === "") {
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
      if (subLocationText.trim() === "") {
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
      setSelectedFile(null);
      fileInputRef.current.value = "";
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
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <DeleteLocationDialog
              setShowDeleteLocationDialog={setShowDeleteLocationDialog}
              LocationId={LocationId}
            />
          </div>
        </div>
      )}
      {showEditLocationDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <EditLocationDialog
              setShowEditLocationDialog={setShowEditLocationDialog}
              LocationId={LocationId}
            />
          </div>
        </div>
      )}
      {showEditSubLocationDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <EditSubLocationDialog
              setShowEditSubLocationDialog={setShowEditSubLocationDialog}
              LocationId={LocationId}
              SubLocationId={SubLocationId}
            />
          </div>
        </div>
      )}
      {/*  */}
      <div>
        <div className="row mb-3">
          <div className="col-lg-6">
            <div className="sub-heading mb-4 fw-bold">File Upload</div>
          </div>
          <div className="col-lg-6 d-flex h-40 flex-end">
            <button
              className="btn btn-labeled btn-primary shadow"
              onClick={handleDownload}
            >
              Download Sample Location/ Sub Location Upload File
            </button>
          </div>
        </div>
        <div className="row position-relative mx-1 pointer">
          <div className="col-lg-12 text-center settings-form">
            <form>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx, .xls, .pdf, .txt"
              />
              <p className="mb-0">Click in this area.</p>
            </form>
          </div>
        </div>
        <p className="my-2">
          {selectedFile?.name ? selectedFile?.name : "Select file"}
        </p>
        <div className="row my-3">
          <div className="col-lg-12 text-end">
            <button
              className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                }`}
              onClick={handleFileUpload}
            >
              <span className="btn-label me-2">
                <i className="fa fa-save"></i>
              </span>
              {loading ? "Loading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
      <hr />
      {/*  */}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Location Management</div>
          <label className="fw-light">
            Create and manage your dropdown list for your organisation Location
          </label>
        </div>
      </div>
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div className="mt-3 d-flex flex-wrap gap-4">
          <div className="flex-1 w-100">
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
            className={`col-lg-6 text-end float-end align-self-end ${loading && "disabled"
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
      )}

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
