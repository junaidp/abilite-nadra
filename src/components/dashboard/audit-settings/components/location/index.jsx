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

const Location = ({ userHierarchy, userRole }) => {
  const dispatch = useDispatch();
  const { loading, locationAddSuccess, allLocations } = useSelector(
    (state) => state.setttingsLocation
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [locationDescription, setLocationDescription] = React.useState("");
  const [subLocationText, setSubLocationText] = React.useState("");
  const [LocationId, setLocationId] = React.useState("");
  const [SubLocationId, setSubLocationId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [showEditLocationDialog, setShowEditLocationDialog] =
    React.useState(false);
  const [showEditSubLocationDialog, setShowEditSubLocationDialog] =
    React.useState(false);

  const handleChange = (event, value) => {
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
    }
  }, [locationAddSuccess]);

  return (
    <div
      className="tab-pane fade"
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      {showEditLocationDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <EditLocationDialog
              setShowEditLocationDialog={setShowEditLocationDialog}
              LocationId={LocationId}
            />
          </div>
        </div>
      )}
      {showEditSubLocationDialog && (
        <div className="dashboard-modal">
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
            ) : allLocations?.length === 0 ||
              allLocations[0]?.error === "Not Found" ? (
              <p>No Location to show!</p>
            ) : (
              allLocations
                ?.slice((page - 1) * 5, page * 5)
                ?.map((item, index) => {
                  return (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={"b" + index}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse${"b" + index}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse${"b" + index}`}
                          onClick={() => {
                            setLocationId(item?.id);
                            setSubLocationText("");
                          }}
                        >
                          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                            <div className=" d-flex align-items-center">
                              {item?.description}
                            </div>

                            <div
                              className=" d-flex align-items-center underline"
                              onClick={() => setShowEditLocationDialog(true)}
                            >
                              Rename Location
                            </div>
                          </div>
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse${"b" + index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionLocationExample"
                      >
                        <div className="accordion-body">
                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label className="w-100">Add SubLocation:</label>
                              <input
                                className="form-control w-100"
                                placeholder="Enter"
                                type="text"
                                value={subLocationText}
                                onChange={(event) =>
                                  setSubLocationText(event?.target?.value)
                                }
                              />
                            </div>
                            <div className="col-lg-6 text-end float-end align-self-end">
                              <div
                                className={`btn btn-labeled btn-primary px-3 shadow ${
                                  loading && "disabled"
                                }`}
                                onClick={handleAddSubLocation}
                              >
                                <span className="btn-label me-2">
                                  <i className="fa fa-plus"></i>
                                </span>
                                {loading ? "Loading.." : "Add"}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="table-responsive">
                                <table className="table table-bordered  table-hover rounded">
                                  <thead className="bg-secondary text-white">
                                    <tr>
                                      <th className="w-80">Sr No.</th>
                                      <th>Particulars</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item?.subLocations?.length === 0 ? (
                                      <tr>
                                        <td className="w-300">
                                          No sub location to show!
                                        </td>
                                      </tr>
                                    ) : (
                                      item?.subLocations?.map(
                                        (subItem, subIndex) => {
                                          return (
                                            <tr key={subIndex}>
                                              <td>{subItem?.id}</td>
                                              <td>{subItem?.description}</td>
                                              <td>
                                                <i
                                                  className="fa fa-edit  px-3 f-18 cursor-pointer"
                                                  onClick={() => {
                                                    setSubLocationId(
                                                      subItem?.id
                                                    );
                                                    setShowEditSubLocationDialog(
                                                      true
                                                    );
                                                  }}
                                                ></i>
                                                {(userRole === "ADMIN" ||
                                                  userHierarchy === "IAH") && (
                                                  <i
                                                    className="fa fa-trash text-danger f-18 cusrsor-pointer"
                                                    onClick={() => {
                                                      dispatch(
                                                        setupDeleteSubLocation(
                                                          `?deleteId=${subItem?.id}`
                                                        )
                                                      );
                                                    }}
                                                  ></i>
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
            <Pagination
              count={Math.ceil(allLocations?.length / 5)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
