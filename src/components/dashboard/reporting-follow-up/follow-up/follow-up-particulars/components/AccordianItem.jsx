import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import RichTextEditor from "../../../../../../components/common/rich-text";
import FollowUpFileUpload from "./FileUpload";

const AccordianItem = ({
  index,
  item,
  handleChange,
  handleSave,
  handleSaveToStep7,
  handleSaveToStep6,
  loading,
  singleReport,
  followUpId,
}) => {
  const { user } = useSelector((state) => state?.auth);
  const [curretItem, setCurrentItem] = React.useState({});
  React.useEffect(() => {
    if (singleReport && followUpId) {
      setCurrentItem(
        singleReport?.reportingList?.find(
          (all) => Number(all?.id) === Number(item?.id)
        )
      );
    }
  }, [singleReport, followUpId]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingeightt">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${index}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${index}`}
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {Number(item?.stepNo) === 7 && (
                <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
              )}
              {item?.observationTitle}
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
          <div className="row mb-3">
            <div className="col-lg-12">
              <label>Observation Title:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Observation Title here"
                type="text"
                value={item?.observationTitle}
                disabled
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Observation</label>
            <RichTextEditor
              initialValue={item?.observationName}
              editable="false"
              name="observation"
            />
          </div>

          <div className="mb-3 align-items-center">
            <label className="pe-4">Implication Rating:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={item?.implicationRating}
              disabled
            >
              <option value="">Select One</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Implication:</label>
            <textarea
              className="form-control "
              placeholder="Enter Reason"
              id="exampleFormControlTextarea1"
              rows="3"
              value={item?.implication}
              disabled
            ></textarea>
          </div>

          <div className="row mb-3">
            <div className="col-lg-12">
              <label>Auditee:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Observation Title here"
                type="text"
                value={item?.auditee?.name}
                disabled
              />
            </div>
          </div>

          {/*  */}
          <div className="mb-3">
            <label>Management Comments:</label>
            <textarea
              className="form-control "
              placeholder="Enter Reason"
              id="exampleFor"
              rows="3"
              value={item?.managementComments}
              name="managementComments"
              disabled
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 1500 words
            </label>
          </div>
          <div className="mb-3">
            <label className="py-1">Implementation Date:</label>
            <input
              type="date"
              className="form-control"
              id="exampleFormControlInput1"
              value={moment(item?.implementationDate).format("YYYY-MM-DD")}
              name="implementationDate"
              disabled
            />
          </div>
          <FollowUpFileUpload item={item} />
          <div className="mb-3 align-items-center">
            <label className="pe-4">Recommendations Implemented:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={item?.followUp?.recommendationsImplemented.toString()}
              name="recommendationsImplemented"
              onChange={(event) => handleChange(event, item?.id)}
              disabled={item?.stepNo === 6 || item?.stepNo === 7 ? true : false}
            >
              <option value="">Select One</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {item?.followUp?.recommendationsImplemented.toString() === "true" && (
            <div className="mb-3">
              <label>Final Comments:</label>
              <textarea
                className="form-control "
                placeholder="Enter Reason"
                id="exampleFor"
                rows="3"
                value={item?.followUp?.finalComments || ""}
                name="finalComments"
                onChange={(event) => handleChange(event, item?.id)}
                disabled={
                  item?.stepNo === 6 || item?.stepNo === 7 ? true : false
                }
              ></textarea>
              <label className="word-limit-info label-text">
                Maximum 1500 words
              </label>
            </div>
          )}

          <div className="mb-3 align-items-center">
            <label className="pe-4">Test In Next Year:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={item?.followUp?.testInNextYear.toString()}
              name="testInNextYear"
              onChange={(event) => handleChange(event, item?.id)}
              disabled={item?.stepNo === 6 || item?.stepNo === 7 ? true : false}
            >
              <option value="">Select One</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="row">
            <div className="col-lg-12 text-end ">
              <div className="d-flex align-items-center place-end">
                {item?.stepNo === 5 && (
                  <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                      loading && "disabled"
                    }`}
                    onClick={() => handleSave(item)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check"></i>
                    </span>
                    {loading ? "Loading..." : "Save"}
                  </button>
                )}
                {item?.stepNo === 5 &&
                  curretItem?.followUp?.recommendationsImplemented !== null &&
                  curretItem?.followUp?.testInNextYear !== null && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mx-2 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveToStep6(item)}
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-check"></i>
                      </span>
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  )}
                {item?.stepNo === 6 &&
                  (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
                    Number(user[0]?.userId?.id) ===
                      Number(
                        singleReport?.resourceAllocation
                          ?.backupHeadOfInternalAudit?.id
                      ) ||
                    Number(user[0]?.userId?.id) ===
                      Number(
                        singleReport?.resourceAllocation?.proposedJobApprover
                          ?.id
                      )) && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mx-2 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveToStep7(item)}
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-check"></i>
                      </span>
                      {loading ? "Loading..." : "Approve"}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianItem;
