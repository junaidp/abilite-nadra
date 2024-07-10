import React from "react";
import { useSelector } from "react-redux";

const BusinessObjectiveMapProcess = ({
  handleSumMapProcess,
  setShowObjectiveListDialog,
  object,
  description,
  domain,
  setDomain,
  setDescription,
  handleSaveBusinessObjectiveMapProcess,
  loading,
  planingEngagementSingleObject,
}) => {
  const { user } = useSelector((state) => state?.auth);
  return (
    <div>
      {(planingEngagementSingleObject?.complete === false ||
        (planingEngagementSingleObject?.complete === true &&
          planingEngagementSingleObject?.locked === false &&
          user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
        <header className="section-header my-3 align-items-center text-start d-flex">
          <div className="mb-0 sub-heading">
            Define Business Objective and Map Process
          </div>
          <div
            className="btn btn-labeled btn-primary ms-3 px-3 shadow"
            onClick={handleSumMapProcess}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus-circle"></i>
            </span>
            Add
          </div>
          <div
            className="btn btn-labeled btn-primary ms-3 px-3 shadow"
            onClick={() => setShowObjectiveListDialog(true)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-list"></i>
            </span>
            Objective List
          </div>
        </header>
      )}

      {object?.businessObjectiveAndMapProcessList?.map((item, index) => {
        return (
          <div key={index}>
            <div className="w-100 float-right"></div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed br-8"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${index}`}
                  onClick={() => {
                    setDescription(item?.description || "");
                    setDomain(item?.domain || "");
                  }}
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center w-100">
                      {item?.description && item?.domain && (
                        <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                      )}
                      <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                        <div>Define Business Objective and Map Process</div>
                      </div>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id={`flush-collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="mb-3 w-100">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Business Objective
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Here"
                      id="ds"
                      rows="3"
                      name="mapProcessDescription"
                      value={description}
                      onChange={(e) => setDescription(e?.target?.value)}
                      disabled={
                        planingEngagementSingleObject?.locked === true ||
                        (planingEngagementSingleObject?.complete === true &&
                          planingEngagementSingleObject?.locked === false &&
                          user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                          ? true
                          : false
                      }
                      maxLength="500"
                    ></textarea>
                    <p className="word-limit-info label-text mb-2">
                      Maximum 500 characters
                    </p>
                  </div>

                  <div className="col-lg-12">
                    <label> Select Domain</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="mapProcessDomain"
                      value={domain}
                      onChange={(e) => setDomain(e?.target?.value)}
                      disabled={
                        planingEngagementSingleObject?.locked === true ||
                        (planingEngagementSingleObject?.complete === true &&
                          planingEngagementSingleObject?.locked === false &&
                          user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                          ? true
                          : false
                      }
                    >
                      <option>Select</option>
                      <option value="strategic">strategic</option>
                      <option value="operation">operation</option>
                    </select>
                  </div>
                  {(planingEngagementSingleObject?.complete === false ||
                    (planingEngagementSingleObject?.complete === true &&
                      planingEngagementSingleObject?.locked === false &&
                      user[0]?.userId?.employeeid?.userHierarchy ===
                        "IAH")) && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() =>
                        handleSaveBusinessObjectiveMapProcess(item)
                      }
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-check-circle"></i>
                      </span>
                      {loading ? "loading..." : "Save"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessObjectiveMapProcess;
