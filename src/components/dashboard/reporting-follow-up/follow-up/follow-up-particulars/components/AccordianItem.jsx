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
  setCurrentReportingAndFollowUpId,
  setFeedBackDialog,
  handleAllowEditLastSection,
  setViewThirdFeedBackDialog,
  setViewFeedBackItem,
  handleShowTestInNextYear,
}) => {
  const { user } = useSelector((state) => state?.auth);

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
              {Number(item?.stepNo) >= 7 && (
                <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
              )}
              {item?.observationTitle} -----
              {Number(item?.stepNo) === 5
                ? "Exception To Be  Implemented"
                : Number(item?.stepNo) === 6
                ? "Exceptions Implemented"
                : Number(item?.stepNo) >= 7
                ? "Observation Completed"
                : ""}
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
          <FollowUpFileUpload item={item} />
          <div className="mb-3">
            <label className="py-1">Implementation Date:</label>
            <input
              type="date"
              className="form-control"
              id="exampleFormControlInput1"
              value={moment(item?.implementationDate).format("YYYY-MM-DD")}
              disabled
            />
          </div>
          <div className="mb-3 align-items-center">
            <label className="pe-4">Recommendations Implemented:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={item?.followUp?.recommendationsImplemented.toString()}
              name="recommendationsImplemented"
              onChange={(event) => handleChange(event, item?.id)}
              disabled={
                handleAllowEditLastSection(item) === true ? false : true
              }
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
                  handleAllowEditLastSection(item) === true ? false : true
                }
                maxlength="500"
              ></textarea>
              <p className="word-limit-info label-text mb-2">
                Maximum 500 characters
              </p>
            </div>
          )}
          {item?.stepNo >= 6 && (
            <div className="mb-3 align-items-center">
              <label className="pe-4">Test In Next Year:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={item?.followUp?.testInNextYear.toString()}
                name="testInNextYear"
                onChange={(event) => handleChange(event, item?.id)}
                disabled={
                  handleShowTestInNextYear(item) === true ? false : true
                }
              >
                <option value="">Select One</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          )}

          <div className="row">
            <div className="col-lg-12 text-end ">
              <div className="d-flex align-items-center place-end">
                {item?.stepNo === 5 &&
                  Number(user[0]?.userId?.id) === Number(item?.auditee?.id) && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSave(item)}
                    >
                      {loading ? "Loading..." : "Save"}
                    </button>
                  )}
                {item?.stepNo === 5 &&
                  Number(user[0]?.userId?.id) === Number(item?.auditee?.id) && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mx-2 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveToStep6(item)}
                    >
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
                      ) ||
                    singleReport?.resourceAllocation?.resourcesList?.find(
                      (singleResource) =>
                        Number(singleResource?.id) ===
                        Number(user[0]?.userId?.id)
                    )) && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mx-2 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveToStep7(item)}
                    >
                      {loading ? "Loading..." : "Approve"}
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
                      ) ||
                    singleReport?.resourceAllocation?.resourcesList?.find(
                      (singleResource) =>
                        Number(singleResource?.id) ===
                        Number(user[0]?.userId?.id)
                    )) && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mx-2 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => {
                        setCurrentReportingAndFollowUpId(item?.id);
                        setFeedBackDialog(true);
                      }}
                    >
                      FeedBack
                    </button>
                  )}
                {item?.thirdFeedback?.description && (
                  <button
                    className={`btn btn-labeled btn-primary px-3 mx-2 mt-3 shadow ${
                      loading && "disabled"
                    }`}
                    onClick={() => {
                      setViewFeedBackItem(item);
                      setViewThirdFeedBackDialog(true);
                    }}
                  >
                    View FeedBack
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
