import React from "react";
import Select from "../select/Select";
import moment from "moment";
import { useSelector } from "react-redux";
import RichTextEditor from "../rich-text/RichText";
import ReportingFileUpload from "../file-upload/FileUpload";

const AccordianItem = ({
  item,
  handleChange,
  loading,
  allUsers,
  setReport,
  handleSaveToStep1,
  handleSaveToStep2,
  handleSaveStep2,
  handleSaveToStep3,
  handleSaveToStep4,
  singleReport,
  reportingId,
  handleObservationChange,
  setCurrentReportingAndFollowUpId,
  setFeedBackDialog,
  setCurrentOpenItem,
  handleAllowEditSection1,
  handleAllowEditSection2,
}) => {
  const { user } = useSelector((state) => state?.auth);
  const [currentItem, setCurrentItem] = React.useState({});

  React.useEffect(() => {
    if (singleReport && reportingId) {
      setCurrentItem(
        singleReport?.reportingList?.find(
          (all) => Number(all?.id) === Number(item?.id)
        )
      );
    }
  }, [singleReport, reportingId]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${item?.id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${item?.id}`}
          onClick={() => setCurrentOpenItem(item)}
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {Number(item?.stepNo) >= 4 && (
                <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
              )}
              {item?.observationTitle} -----
              {Number(item?.stepNo) === 0
                ? "Implementation In Progress"
                : Number(item?.stepNo) === 1
                ? "Exceptions To Be Sent To Management For Comments"
                : Number(item?.stepNo) === 2
                ? "Awaiting Management Comments"
                : Number(item?.stepNo) === 3
                ? "Management Comments Received"
                : Number(item?.stepNo) >= 4
                ? "Exceptions Implemented"
                : ""}
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`flush-collapse${item?.id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {user[0]?.userId?.employeeid?.userHierarchy !==
            "Management_Auditee" && <ReportingFileUpload item={item} />}
          <div className="row mb-3">
            <div className="col-lg-6">
              <label>Observation Title:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Observation Title here"
                type="text"
                value={item?.observationTitle}
                name="observationTitle"
                onChange={(event) => handleChange(event, item?.id)}
                disabled={handleAllowEditSection1(item) === true ? false : true}
              />
            </div>
          </div>
          <label>Observation:</label>
          <div className="mb-4">
            <RichTextEditor
              onContentChange={handleObservationChange}
              initialValue={item?.observationName}
              id={item?.id}
              editable={
                handleAllowEditSection1(item) === false ? "false" : "true"
              }
              singleReport={singleReport}
              item={item}
            />
          </div>

          <div className="d-flex mb-3 align-items-center">
            <label className="pe-4">Implication Rating:</label>
            <select
              className="form-select mb-2 w-150"
              aria-label="Default select example"
              value={item?.implicationRating}
              name="implicationRating"
              onChange={(event) => handleChange(event, item?.id)}
              disabled={handleAllowEditSection1(item) === true ? false : true}
            >
              <option value="">Select One</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>

          <br />

          <label>Implication:</label>
          <textarea
            className="form-control "
            placeholder="Enter Reason"
            id="exampleFormControlTextarea1"
            rows="3"
            value={item?.implication || ""}
            name="implication"
            onChange={(event) => handleChange(event, item?.id)}
            disabled={handleAllowEditSection1(item) === true ? false : true}
          ></textarea>
          <label className="word-limit-info label-text mb-3">
            Maximum 1500 words
          </label>
          <br />

          <label>Recommended Action Step:</label>
          <textarea
            className="form-control "
            placeholder="Enter Reason"
            id="exampleFormControlTextarea1"
            rows="3"
            value={item?.recommendedActionStep || ""}
            name="recommendedActionStep"
            onChange={(event) => handleChange(event, item?.id)}
            disabled={handleAllowEditSection1(item) === true ? false : true}
          ></textarea>
          <label className="word-limit-info label-text mb-3">
            Maximum 1500 words
          </label>
          <br />

          <div className="col-lg-12 mb-4">
            <Select
              label="Auditee"
              value={item?.auditee?.name || ""}
              setReport={setReport}
              list={allUsers?.map((all) => all?.name)}
              id={item?.id}
              allUsers={allUsers}
              disabled={handleAllowEditSection1(item) === true ? false : true}
            />
          </div>
          {item?.stepNo === 2 &&
            Number(user[0]?.userId?.id) ===
              Number(currentItem?.auditee?.id) && (
              <div className="mb-4">
                <label>Management Comments:</label>
                <textarea
                  className="form-control "
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={item?.managementComments || ""}
                  name="managementComments"
                  onChange={(event) => handleChange(event, item?.id)}
                ></textarea>
                <label className="word-limit-info label-text mb-3">
                  Maximum 1500 words
                </label>
                <br />
                <label className="py-1">Implementation Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={moment(item?.implementationDate).format("YYYY-MM-DD")}
                  name="implementationDate"
                  onChange={(event) => handleChange(event, item?.id)}
                />
              </div>
            )}
          {item?.stepNo !== 0 && item?.stepNo !== 1 && item?.stepNo !== 2 && (
            <div className="mb-4">
              <label>Management Comments:</label>
              <textarea
                className="form-control "
                placeholder="Enter Reason"
                id="exampleFormControlTextarea1"
                rows="3"
                value={item?.managementComments || ""}
                name="managementComments"
                onChange={(event) => handleChange(event, item?.id)}
                disabled={handleAllowEditSection2(item) === true ? false : true}
              ></textarea>
              <label className="word-limit-info label-text mb-3">
                Maximum 1500 words
              </label>
              <br />
              <label className="py-1">Implementation Date:</label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                value={moment(item?.implementationDate).format("YYYY-MM-DD")}
                name="implementationDate"
                onChange={(event) => handleChange(event, item?.id)}
                disabled={handleAllowEditSection2(item) === true ? false : true}
              />
            </div>
          )}

          <div>
            <div className="d-flex flex-end w-100 gap-4">
              {item?.stepNo === 0 && (
                <div className="d-flex align-items-center place-end">
                  <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                      loading && "disabled"
                    }`}
                    onClick={() => handleSaveToStep1(item)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check"></i>
                    </span>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              )}
              {handleAllowEditSection1(item) === true && item?.stepNo === 1 && (
                <div className="d-flex align-items-center place-end">
                  <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                      loading && "disabled"
                    }`}
                    onClick={() => handleSaveStep2(item)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check"></i>
                    </span>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              )}
              {item?.stepNo === 1 &&
                (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation
                        ?.backupHeadOfInternalAudit?.id
                    ) ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation?.proposedJobApprover?.id
                    )) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveToStep2(item)}
                    >
                      {loading ? "Loading..." : "Approve"}
                    </button>
                  </div>
                )}
              {item?.stepNo === 1 &&
                (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation
                        ?.backupHeadOfInternalAudit?.id
                    ) ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation?.proposedJobApprover?.id
                    )) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => {
                        setCurrentReportingAndFollowUpId(item?.id);
                        setFeedBackDialog(true);
                      }}
                    >
                      First FeedBack
                    </button>
                  </div>
                )}
              {item?.stepNo === 2 &&
                Number(user[0]?.userId?.id) ===
                  Number(currentItem?.auditee?.id) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveStep2(item)}
                    >
                      {loading ? "Loading..." : "Save"}
                    </button>
                  </div>
                )}
              {item?.stepNo === 2 &&
                Number(user[0]?.userId?.id) ===
                  Number(currentItem?.auditee?.id) &&
                currentItem?.managementComments !== "" &&
                currentItem?.managementComments &&
                currentItem?.implementationDate !== "" &&
                currentItem?.implementationDate && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveToStep3(item)}
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                )}

              {handleAllowEditSection2(item) === true && item?.stepNo === 3 && (
                <div className="d-flex align-items-center place-end">
                  <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                      loading && "disabled"
                    }`}
                    onClick={() => handleSaveStep2(item)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check"></i>
                    </span>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              )}

              {item?.stepNo === 3 &&
                (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation
                        ?.backupHeadOfInternalAudit?.id
                    ) ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation?.proposedJobApprover?.id
                    )) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleSaveToStep4(item)}
                    >
                      {loading ? "Loading..." : "Approve"}
                    </button>
                  </div>
                )}
              {item?.stepNo === 3 &&
                (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation
                        ?.backupHeadOfInternalAudit?.id
                    ) ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      singleReport?.resourceAllocation?.proposedJobApprover?.id
                    )) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => {
                        setCurrentReportingAndFollowUpId(item?.id);
                        setFeedBackDialog(true);
                      }}
                    >
                      Second FeedBack
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianItem;
