import React from "react";

const AddButtons = ({
  userRole,
  userHierarchy,
  handleShowObjective,
  handleShowRisk,
  handleShowControl,
  handleShowProgram,
}) => {
  return (
    <div>
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div className="row my-4">
          <div className="col-lg-3">
            <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
              <a className="text-white add-btn" onClick={handleShowObjective}>
                <span className="float-end f-10">
                  <i className="fa fa-plus me-2"></i>Add Objective
                </span>
              </a>
            </p>
          </div>
          <div className="col-lg-3">
            <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
              <a className="text-white add-btn" onClick={handleShowRisk}>
                <span className="float-end f-10">
                  <i className="fa fa-plus me-2"></i>Add Risk
                </span>
              </a>
            </p>
          </div>
          <div className="col-lg-3">
            <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
              <a className="text-white add-btn" onClick={handleShowControl}>
                <span className="float-end f-10">
                  <i className="fa fa-plus me-2"></i>Add Control
                </span>
              </a>
            </p>
          </div>
          <div className="col-lg-3">
            <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
              <a className="text-white add-btn" onClick={handleShowProgram}>
                <span className="float-end f-10">
                  <i className="fa fa-plus me-2"></i>Add Program
                </span>
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButtons;
