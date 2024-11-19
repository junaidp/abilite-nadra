import React from "react";
import { useDispatch } from "react-redux";

const AccordionItem = ({
  index,
  setLocationId,
  setSubLocationText,
  item,
  subLocationText,
  handleAddSubLocation,
  loading,
  setSubLocationId,
  setShowEditLocationDialog,
  setShowEditSubLocationDialog,
  setupDeleteSubLocation,
  userRole,
  userHierarchy,
  setShowDeleteLocationDialog,
}) => {
  const dispatch = useDispatch();
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
          </div>
        </button>
      </h2>
      <div
        id={`flush-collapse${"b" + index}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionLocationExample"
      >
        <div className="accordion-body">
          {(userRole === "ADMIN" || userHierarchy === "IAH") && (
            <div className="row">
              <div className="float-end mb-2 col-lg-12">
                <div
                  className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}
                  onClick={() => setShowEditLocationDialog(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle f-18"></i>
                  </span>
                  Edit
                </div>
                {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                  <div
                    className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                    onClick={() => setShowDeleteLocationDialog(true)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle f-18"></i>
                    </span>
                    Delete
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-lg-6">
                  <label>Add Sub Location:</label>
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
                <div className="col-lg-6 text-end float-end align-self-end p-0 m-0">
                  <div
                    className={`btn btn-labeled btn-primary  shadow ${
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
            </div>
          )}

          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered  table-hover rounded">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th className="w-80">Sr No.</th>
                      <th>Sub Location</th>
                      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                        <th>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {item?.subLocations?.length === 0 ? (
                      <tr>
                        <td className="w-300">No Sub Locations To Show.</td>
                      </tr>
                    ) : (
                      item?.subLocations?.map((subItem, subIndex) => {
                        return (
                          <tr key={subIndex}>
                            <td>{subIndex + 1}</td>
                            <td>{subItem?.description}</td>
                            {(userRole === "ADMIN" ||
                              userHierarchy === "IAH") && (
                              <td>
                                <div className="d-flex flex-wrap gap-4">
                                  <i
                                    className="fa fa-edit f-18 cursor-pointer"
                                    onClick={() => {
                                      setSubLocationId(subItem?.id);
                                      setShowEditSubLocationDialog(true);
                                    }}
                                  ></i>
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
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })
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
};

export default AccordionItem;
