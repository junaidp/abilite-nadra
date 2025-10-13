import React from "react";
import { useSelector } from "react-redux";
import FinanciallyQuantifiableNo from "../not-financially";
import FinanciallyQuantifiableYes from "../financially";

const BusinessObjectiveMapProcess = ({
  handleSaveBusinessObjectiveMapProcess,
  loading,
  domain,
  description,
  setDomain,
  setDescription,
  planingEngagementSingleObject,
  engagementId,
}) => {
  const { user } = useSelector((state) => state?.auth);
  const [check, setCheck] = React.useState(true);

  return (
    <div>
      <div>
        <div className="w-100 float-right"></div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed br-8"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse`}
              aria-expanded="false"
              aria-controls={`flush-collapse`}
            >
              <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                <div className="d-flex align-items-center w-100">
                  {description && domain && (
                    <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                  )}
                  <div>Define Business Objective</div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id={`flush-collapse`}
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="mb-4 w-100">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Business Objective
                </label>
                <textarea
                  placeholder="Enter Here"
                  id="ds"
                  rows="3"
                  name="mapProcessDescription"
                  value={description}
                  onChange={(event) => setDescription(event?.target?.value)}
                  disabled={
                    planingEngagementSingleObject?.locked === true ||
                    (planingEngagementSingleObject?.complete === true &&
                      planingEngagementSingleObject?.locked === false &&
                      user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                      ? true
                      : false
                  }
                  className={`form-control ${
                    description?.length >= 500 && "error-border"
                  }`}
                  maxLength="500"
                ></textarea>
                <p className="word-limit-info label-text mb-2">
                  Maximum 500 characters
                </p>
              </div>

              <div className="col-lg-12">
                <label className="form-label"> Select Domain</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="mapProcessDomain"
                  value={domain}
                  onChange={(event) => setDomain(event?.target?.value)}
                  disabled={
                    planingEngagementSingleObject?.locked === true ||
                    (planingEngagementSingleObject?.complete === true &&
                      planingEngagementSingleObject?.locked === false &&
                      user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                      ? true
                      : false
                  }
                >
                  <option value="">Select</option>
                  <option value="strategic">strategic</option>
                  <option value="operation">operation</option>
                  <option value="reporting">reporting</option>
                  <option value="compliance">compliance</option>
                </select>
              </div>

              {(planingEngagementSingleObject?.complete === false ||
                (planingEngagementSingleObject?.complete === true &&
                  planingEngagementSingleObject?.locked === false &&
                  user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
                <div className="d-flex flex-end">
                  <button
                    className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow ${
                      loading && "disabled"
                    }`}
                    onClick={handleSaveBusinessObjectiveMapProcess}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    {loading ? "loading..." : "Save"}
                  </button>
                </div>
              )}
              <hr />
              <div className="row mt-4 mb-4">
                <label className="form-label">Financially Quantifiable</label>
                <div className="form-check form-switch ml-12">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={check}
                    onChange={(event) => setCheck(event.target.checked)}
                  />
                </div>
              </div>
              {check ? (
                <FinanciallyQuantifiableYes
                  engagementId={engagementId}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                />
              ) : (
                <FinanciallyQuantifiableNo
                  engagementId={engagementId}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessObjectiveMapProcess;
