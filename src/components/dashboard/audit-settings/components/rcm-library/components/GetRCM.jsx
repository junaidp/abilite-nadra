import React from "react";

const GetRCM = ({
  processId,
  setProcessId,
  allProcess,
  subProcessId,
  setSubProcessId,
  allSubProcess,
  handleGetRCM
}) => {
  return (
    <>
      <div className="row mb-2">
        <div className="col-lg-3 label-text">Process</div>
        <div className="col-lg-9">
          <select
            className="form-select "
            aria-label="Default select example"
            value={processId}
            onChange={(event) => setProcessId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {allProcess?.map((item, index) => {
              return (
                <option value={item?.id} key={index}>
                  {item?.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-3 label-text">Sub Process</div>
        <div className="col-lg-9">
          <select
            className="form-select "
            aria-label="Default select example"
            value={subProcessId}
            onChange={(event) => setSubProcessId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {allSubProcess?.map((item, index) => {
              return (
                <option value={item?.id} key={index}>
                  {item?.description}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-lg-12">
          <div className="btn btn-labeled btn-primary px-3 shadow my-4" onClick={handleGetRCM}>Get RCM</div>
        </div>
      </div>
    </>
  );
};

export default GetRCM;
