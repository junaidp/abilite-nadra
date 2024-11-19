import React from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { setupDeleteSubProcess } from "../../../../../global-redux/reducers/settings/process/slice";

const AccordionItem = ({
  index,
  setSubProcessText,
  setProcessId,
  userRole,
  userHierarchy,
  subProcessText,
  handleAddSubProcess,
  subLoading,
  loading,
  allSubProcess,
  item,
  setSubProcessId,
  setShowSubProcessDialog,
  setShowProcessDeleteDialog,
  setEditProcessDialog,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="accordion-item" key={index}>
      <h2 className="accordion-header" id={"c" + index}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${"c" + index}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${"c" + index}`}
          onClick={() => {
            setSubProcessText("");
            setProcessId(item?.id);
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
        id={`flush-collapse${"c" + index}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionProcessExample"
      >
        <div className="accordion-body">
          {(userRole === "ADMIN" || userHierarchy === "IAH") && (
            <div className="row">
              <div className="float-end  col-lg-12">
                <div
                  className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}
                  onClick={() => setEditProcessDialog(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle f-18"></i>
                  </span>
                  Edit
                </div>
                <div
                  className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                  onClick={() => setShowProcessDeleteDialog(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle f-18"></i>
                  </span>
                  Delete
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row  mb-3">
                  <div className="col-lg-6">
                    <label className="w-100 ">Add SubProcess:</label>
                    <input
                      className="form-control w-100"
                      placeholder="Enter"
                      type="text"
                      value={subProcessText}
                      onChange={(event) =>
                        setSubProcessText(event?.target?.value)
                      }
                    />
                  </div>
                  <div className="col-lg-6 text-end float-end align-self-end">
                    <div
                      className={`btn btn-labeled btn-primary px-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={handleAddSubProcess}
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-plus"></i>
                      </span>
                      {loading ? "Loading..." : "Add"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            {subLoading ? (
              <CircularProgress />
            ) : (
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="w-80">Sr No.</th>
                        <th>Particulars</th>
                        {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                          <th>Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {allSubProcess?.length === 0 ? (
                        <tr>
                          <td className="w-300">No Sub Process To Show.</td>
                        </tr>
                      ) : (
                        allSubProcess?.map((subItem, ind) => {
                          return (
                            <tr key={ind}>
                              <td>{ind + 1}</td>
                              <td>{subItem?.description}</td>
                              {(userRole === "ADMIN" ||
                                userHierarchy === "IAH") && (
                                <td>
                                  <div className="d-flex flex-wrap gap-4">
                                    <i
                                      className="fa fa-edit f-18 cursor-pointer"
                                      onClick={() => {
                                        setSubProcessId(subItem?.id);
                                        setShowSubProcessDialog(true);
                                      }}
                                    ></i>
                                    <i
                                      className="fa fa-trash text-danger f-18 cursor-pointer"
                                      onClick={() => {
                                        if (!subLoading) {
                                          dispatch(
                                            setupDeleteSubProcess(subItem?.id)
                                          );
                                        }
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
