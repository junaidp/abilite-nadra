import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { getStepStatusLabel } from "../../../../../../../config/helper";

import ReportingFileUpload from "../file-upload/FileUpload";
import ActionButtons from "../action-buttons/ActionButtons";
import ObservationSection from "../observation/Observation";

/**
 * AccordianItem
 * Represents a single reporting item inside the accordion.
 * Handles observation, management comments, file uploads, and feedback dialogs.
 */
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

  const [currentItem, setCurrentItem] = useState({});

  /**
   * Update currentItem whenever `singleReport` or `reportingId` changes.
   * This ensures the component always reflects the latest reporting data.
   */
  useEffect(() => {
    if (singleReport && reportingId) {
      const foundItem = singleReport?.reportingList?.find(
        (report) => Number(report?.id) === Number(item?.id)
      );
      setCurrentItem(foundItem || {});
    }
  }, [singleReport, reportingId, item?.id]);

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
            <div className="d-flex align-items-center">
              {Number(item?.stepNo) >= 4 && (
                <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
              )}
              {item?.observationTitle} ----- {getStepStatusLabel(Number(item?.stepNo), user[0])}
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
          <ObservationSection
            item={item}
            user={user}
            currentItem={currentItem}
            singleReport={singleReport}
            allUsers={allUsers}
            setReport={setReport}
            handleChange={handleChange}
            handleObservationChange={handleObservationChange}
            handleManagementCommentsChange={handleManagementCommentsChange}
            handleAllowEditSection1={handleAllowEditSection1}
          />


          <ReportingFileUpload item={item} setDeleteFileId={setDeleteFileId} />

          {/* Action Buttons */}
          <ActionButtons
            item={item}
            user={user[0]}
            loading={loading}
            singleReport={singleReport}
            currentItem={currentItem}
            handleSaveStep1={handleSaveStep1}
            handleSaveToStep1={handleSaveToStep1}
            handleSaveStep2={handleSaveStep2}
            handleSaveToStep2={handleSaveToStep2}
            handleSaveToStep4={handleSaveToStep4}
            setCurrentReportingAndFollowUpId={setCurrentReportingAndFollowUpId}
            setFeedBackDialog={setFeedBackDialog}
            setShowCurrentSubmittedItem={setShowCurrentSubmittedItem}
            setShowSubmitDialog={setShowSubmitDialog}
            setViewFeedBackItem={setViewFeedBackItem}
            setViewFirstFeedBackDialog={setViewFirstFeedBackDialog}
            setViewSecondFeedBackDialog={setViewSecondFeedBackDialog}
            handleAllowEditSection1={handleAllowEditSection1}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AccordianItem);
