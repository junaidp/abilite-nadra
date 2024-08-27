import { CircularProgress } from "@mui/material";
import React from "react";
import { setupDeleteSubCheckList } from "../../../../../../global-redux/reducers/settings/check-list/slice";

const AccordionItem = ({
  item,
  index,
  handleChangeCurrentCheckListId,
  setShowEditCheckListDialog,
  handleChangeCheckListRemarks,
  setCheckListManagementDialog,
  checkListItems,
  setShowEditCheckListItemDialog,
  changeCurrentSubListItem,
  dispatch,
  subLoading,
  userHierarchy,
  userRole,
  setShowViewCheckListDialog,
  setShowDeleteCheckListDialog,
}) => {
  return (
    <div className="accordion-item" id={"a" + index}>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${"a" + index}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${"a" + index}`}
          onClick={() => handleChangeCurrentCheckListId(item?.id)}
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {item?.description}
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`flush-collapse${"a" + index}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionCheckListExample"
      >
        <div>
          {(userRole === "ADMIN" || userHierarchy === "IAH") && (
            <div className="row">
              <div className="col-lg-12 mt-4">
                <div
                  className={`btn btn-labeled btn-primary  mx-4  shadow`}
                  onClick={() => {
                    setShowEditCheckListDialog(true);
                    handleChangeCurrentCheckListId(item?.id);
                  }}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle f-18"></i>
                  </span>
                  Edit
                </div>
                <div
                  className={`btn btn-labeled btn-danger mx-2 shadow`}
                  onClick={() => {
                    setShowDeleteCheckListDialog(true);
                    handleChangeCurrentCheckListId(item?.id);
                  }}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle f-18"></i>
                  </span>
                  Delete
                </div>
              </div>
              <div className="col-lg-12">
                <div className="rows mt-4 mb-4 px-4">
                  <label>
                    choose you checklist default remark for user display
                  </label>
                  <select
                    className="col-lg-6 form-select px-3"
                    value={item?.defaultRemarks}
                    onChange={(e) => {
                      handleChangeCurrentCheckListId(item?.id);
                      handleChangeCheckListRemarks(e);
                    }}
                  >
                    <option value="">Select One</option>
                    <option value={1}>Yes</option>
                    <option value={2}>Partially Applicable</option>
                    <option value={3}>No</option>
                    <option value={4}>Not Applicable</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="accordion-body">
            <div className=" mt-3 bg-white p-3">
              {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                <div
                  className="btn btn-labeled btn-primary px-3 shadow col-lg-4"
                  onClick={() => {
                    setCheckListManagementDialog(true);
                    handleChangeCurrentCheckListId(item?.id);
                  }}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle f-18"></i>
                  </span>
                  Add CheckList Item
                </div>
              )}

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <table className="table table-bordered  table-hover rounded">
                      <thead className="bg-secondary text-white">
                        <tr>
                          <th className="w-80">Sr No.</th>
                          <th>Area</th>
                          <th>Subject</th>
                          <th>Particulars</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subLoading ? (
                          <tr>
                            <td className="w-300">
                              <CircularProgress />
                            </td>
                          </tr>
                        ) : checkListItems &&
                          checkListItems[0]?.error !== "Not Found" ? (
                          checkListItems?.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item?.area}</td>
                                <td>{item?.subject}</td>
                                <td>{item?.particulars}</td>
                                <td>
                                  <i
                                    className="fa-eye fa f-18 cursor-pointer"
                                    onClick={() => {
                                      dispatch(changeCurrentSubListItem(item));
                                      setShowViewCheckListDialog(true);
                                    }}
                                  ></i>
                                  {(userRole === "ADMIN" ||
                                    userHierarchy === "IAH") && (
                                    <i
                                      className="fa fa-edit  px-3 f-18"
                                      onClick={() => {
                                        setShowEditCheckListItemDialog(true);
                                        dispatch(
                                          changeCurrentSubListItem(item)
                                        );
                                      }}
                                    ></i>
                                  )}
                                  {(userRole === "ADMIN" ||
                                    userHierarchy === "IAH") && (
                                    <i
                                      className="fa fa-trash text-danger f-18"
                                      onClick={() => {
                                        dispatch(
                                          setupDeleteSubCheckList(item?.id)
                                        );
                                      }}
                                    ></i>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td className="w-300">
                              No Sub CheckLists To Show.
                            </td>
                          </tr>
                        )}
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
  );
};

export default AccordionItem;
