import React from "react";
import {
  setupAddLocation,
  setupGetAllLocations,
  resetLocationAddSuccess,
} from "../../../../../global-redux/reducers/settings/location/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Location = () => {
  const [locationDescription, setLoginDescription] = React.useState("");
  const { loading, locationAddSuccess } = useSelector(
    (state) => state.setttingsLocation
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

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

  React.useEffect(() => {
    if (locationAddSuccess) {
      setLoginDescription("");
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
            onChange={(e) => setLoginDescription(e?.target?.value)}
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
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading1">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      1. Show Department/Division/ Location
                    </div>
                    <div>
                      <i className="fa fa-edit  px-3 f-18"></i>

                      <i className="fa fa-trash text-danger f-18"></i>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
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
                      />
                    </div>
                    <div className="col-lg-6 text-end float-end align-self-end">
                      <div className="btn btn-labeled btn-primary px-3 shadow">
                        <span className="btn-label me-2">
                          <i className="fa fa-plus"></i>
                        </span>
                        Add
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
                            <tr>
                              <td>1</td>
                              <td>
                                Show Sub-Department/Sub-Division/Sub-Location
                              </td>
                              <td>
                                <i className="fa fa-edit  px-3 f-18"></i>

                                <i className="fa fa-trash text-danger f-18"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                Show Sub-Department/Sub-Division/Sub-Location
                              </td>
                              <td>
                                <i className="fa fa-edit  px-3 f-18"></i>

                                <i className="fa fa-trash text-danger f-18"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="heading2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      2. Show Department/Division/ Location
                    </div>
                    <div>
                      <i className="fa fa-edit  px-3 f-18"></i>

                      <i className="fa fa-trash text-danger f-18"></i>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
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
                      />
                    </div>
                    <div className="col-lg-6 text-end float-end align-self-end">
                      <div className="btn btn-labeled btn-primary px-3 shadow">
                        <span className="btn-label me-2">
                          <i className="fa fa-plus"></i>
                        </span>
                        Add
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
                            <tr>
                              <td>1</td>
                              <td>
                                Show Sub-Department/Sub-Division/Sub-Location
                              </td>
                              <td>
                                <i className="fa fa-edit  px-3 f-18"></i>

                                <i className="fa fa-trash text-danger f-18"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                Show Sub-Department/Sub-Division/Sub-Location
                              </td>
                              <td>
                                <i className="fa fa-edit  px-3 f-18"></i>
                                <i className="fa fa-trash text-danger f-18"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
