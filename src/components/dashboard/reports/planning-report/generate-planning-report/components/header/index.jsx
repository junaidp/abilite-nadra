import React from "react";

const Header = ({
  navigate,
  setGeneratePlaningReportDialog,
  data,
  setData,
  editable,
}) => {
  return (
    <div>
      <header className="section-header my-3">
        <div className="row align-items-center mb-4">
          <div className="col-lg-12 d-flex align-items-center">
            <i
              className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
              onClick={() => navigate("/audit/planning-report")}
            ></i>

            <div className="mb-0 heading">Internal Audit Planning Report</div>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-8 d-flex">
              <div className="mb-3 d-flex me-3  align-items-end">
                <label className="form-label me-2">From</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                />
              </div>
              <div className="mb-3 d-flex me-3 align-items-end">
                <label className="form-label me-2">To</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                />
              </div>
            </div>
            {editable !== "false" && (
              <div className="col-lg-4 d-flex text-end justify-content-end">
                <div className="mb-3">
                  <div
                    className="btn btn-labeled btn-primary px-3 shadow fitContent"
                    onClick={() => setGeneratePlaningReportDialog(true)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-plus"></i>
                    </span>
                    Add Section
                  </div>
                </div>
                <i
                  className="fa fa-info-circle ps-3 text-secondary mt-2 cursor-pointer"
                  title="Info"
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="mb-4 col-lg-12">
          <div className="col-lg-2 label-text w-100 mb-2">Report Name</div>
          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="text"
                id="description"
                value={data?.reportName}
                onChange={(event) =>
                  setData((pre) => {
                    return {
                      ...pre,
                      reportName: event?.target?.value,
                    };
                  })
                }
                name="reportName"
                className="form-control h-40"
                placeholder="Enter"
                disabled={editable === "false" ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
