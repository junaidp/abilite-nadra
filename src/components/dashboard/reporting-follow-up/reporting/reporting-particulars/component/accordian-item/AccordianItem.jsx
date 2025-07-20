import React from "react";
import Select from "../select/Select";
import moment from "moment";
import { useSelector } from "react-redux";
import RichTextEditor from "../rich-text/RichText";
import ReportingFileUpload from "../file-upload/FileUpload";
import { Chip } from "@mui/material";

const AccordianItem = ({
  item,
  handleChange,
  loading,
  allUsers,
  setReport,
  handleSaveToStep1,
  handleSaveToStep2,
  handleSaveStep2,
  handleSaveToStep4,
  singleReport,
  reportingId,
  handleObservationChange,
  handleManagementCommentsChange,
  setCurrentReportingAndFollowUpId,
  setFeedBackDialog,
  setCurrentOpenItem,
  handleAllowEditSection1,
  setViewFirstFeedBackDialog,
  setViewSecondFeedBackDialog,
  setViewFeedBackItem,
  handleSaveStep1,
  setDeleteFileId,
  setShowSubmitDialog,
  setShowCurrentSubmittedItem,
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
                ? "Exceptions To Be Sent To Management For Comments"
                : Number(item?.stepNo) === 1
                  ? "Exceptions To Be Sent To Management For Comments"
                  : Number(item?.stepNo) === 2
                    ? "Awaiting Management Comments"
                    : Number(item?.stepNo) === 3
                      ? user[0]?.userId?.employeeid?.userHierarchy ===
                        "Management_Auditee"
                        ? "Management Comments Sent"
                        : "Management Comments Received"
                      : Number(item?.stepNo) >= 4
                        ? "Exception To Be Implemented"
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
          <div className="d-flex items-center mb-3 justify-content-between">
            <div className="flex-1">
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
            <div className="flex-1 d-flex flex-end">
              <Chip
                label={
                  singleReport?.subLocationList?.find(
                    (subLocation) => subLocation?.id === item?.subLocation
                  )?.description
                }
              />
            </div>
          </div>
          <div className="d-flex items-center mb-3">
            <div className="flex-1">
              <label>Area:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Observation Area here"
                type="text"
                value={item?.area}
                name="area"
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
            placeholder="Enter Reason"
            id="exampleFormControlTextarea1"
            rows="3"
            value={item?.implication || ""}
            name="implication"
            onChange={(event) => handleChange(event, item?.id)}
            disabled={handleAllowEditSection1(item) === true ? false : true}
            maxLength="1500"
            className={`form-control  ${item?.implication?.length >= 1500 && "error-border"
              }`}
          ></textarea>
          <p className="word-limit-info label-text mb-2">
            Maximum 1500 characters
          </p>
          <br />

          <label>Recommended Action Step:</label>
          <textarea
            placeholder="Enter Reason"
            id="exampleFormControlTextarea1"
            rows="3"
            value={item?.recommendedActionStep || ""}
            name="recommendedActionStep"
            onChange={(event) => handleChange(event, item?.id)}
            disabled={handleAllowEditSection1(item) === true ? false : true}
            maxLength="1500"
            className={`form-control  ${item?.recommendedActionStep?.length >= 1500 && "error-border"
              }`}
          ></textarea>
          <p className="word-limit-info label-text mb-2">
            Maximum 1500 characters
          </p>
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
                <div className="mb-4">
                  <RichTextEditor
                    onContentChange={handleManagementCommentsChange}
                    initialValue={item?.managementComments}
                    id={item?.id}
                    editable="true"
                    singleReport={singleReport}
                    item={item}
                  />
                </div>
                <p className="word-limit-info label-text mb-2">
                  Maximum 1500 characters
                </p>
                <br />
                <label className="py-1">Implementation Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={moment
                    .utc(item?.implementationDate)
                    .format("YYYY-MM-DD")}
                  name="implementationDate"
                  onChange={(event) => handleChange(event, item?.id)}
                />
              </div>
            )}

          {item?.stepNo !== 0 && item?.stepNo !== 1 && item?.stepNo !== 2 && (
            <div className="mb-4">
              <label>Management Comments:</label>
              <RichTextEditor
                initialValue={item?.managementComments}
                editable="false"
              />
              <br />
              <label className="py-1">Implementation Date:</label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                value={moment
                  .utc(item?.implementationDate)
                  .format("YYYY-MM-DD")}
                name="implementationDate"
                disabled
              />
            </div>
          )}

          <ReportingFileUpload item={item} setDeleteFileId={setDeleteFileId} />

          <div>
            <div className="d-flex flex-end w-100 gap-4">
              {item?.stepNo === 0 && (
                <div className="d-flex align-items-center place-end">
                  <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                      }`}
                    onClick={() => handleSaveStep1(item)}
                  >
                    {loading ? "Loading..." : "Save"}
                  </button>
                </div>
              )}
              {item?.stepNo === 0 && (
                <div className="d-flex align-items-center place-end">
                  <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                      }`}
                    onClick={() => handleSaveToStep1(item)}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              )}
              {handleAllowEditSection1(item) === true && item?.stepNo === 1 && (
                <div className="d-flex align-items-center place-end">
                  <button
                    className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                      }`}
                    onClick={() => handleSaveStep2(item)}
                  >
                    {loading ? "Loading..." : "Save"}
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
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
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
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                        }`}
                      onClick={() => {
                        setCurrentReportingAndFollowUpId(item?.id);
                        setFeedBackDialog(true);
                      }}
                    >
                      FeedBack
                    </button>
                  </div>
                )}
              {item?.stepNo === 2 &&
                Number(user[0]?.userId?.id) ===
                Number(currentItem?.auditee?.id) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
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
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                        }`}
                      onClick={() => {
                        setShowCurrentSubmittedItem(item);
                        setShowSubmitDialog(true);
                      }}
                    >
                      Submit
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
                  ) ||
                  singleReport?.resourceAllocation?.resourcesList?.find(
                    (singleResource) =>
                      Number(singleResource?.id) === Number(user[0]?.userId?.id)
                  )) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
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
                  ) ||
                  singleReport?.resourceAllocation?.resourcesList?.find(
                    (singleResource) =>
                      Number(singleResource?.id) === Number(user[0]?.userId?.id)
                  )) && (
                  <div className="d-flex align-items-center place-end">
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                        }`}
                      onClick={() => {
                        setCurrentReportingAndFollowUpId(item?.id);
                        setFeedBackDialog(true);
                      }}
                    >
                      FeedBack
                    </button>
                  </div>
                )}
              {item?.firstFeedback?.description && (
                <button
                  className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                    }`}
                  onClick={() => {
                    setViewFeedBackItem(item);
                    setViewFirstFeedBackDialog(true);
                  }}
                >
                  View First FeedBack
                </button>
              )}
              {item?.secondFeedback?.description && (
                <button
                  className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                    }`}
                  onClick={() => {
                    setViewFeedBackItem(item);
                    setViewSecondFeedBackDialog(true);
                  }}
                >
                  View Second FeedBack
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianItem;
