import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Chip } from "@mui/material";

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
  isOpen,
  onToggle,
}) => {
  const { user } = useSelector((state) => state?.auth);

  const [currentItem, setCurrentItem] = useState({});

  /**
   * Update currentItem whenever `singleReport` or `reportingId` changes.
   * This ensures the component always reflects the latest reporting data.
   */
  useEffect(() => {
    if (singleReport && reportingId && isOpen) {
      const foundItem = singleReport?.reportingList?.find(
        (report) => Number(report?.id) === Number(item?.id)
      );
      setCurrentItem(foundItem || {});
    }
  }, [singleReport, reportingId, item?.id, isOpen]);

  const subLocationLabel = useMemo(() => {
    return (
      singleReport?.subLocationList?.find(
        (subLocation) => subLocation?.id === item?.subLocation
      )?.description || ""
    );
  }, [singleReport, item?.subLocation]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`flush-collapse${item?.id}`}
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {Number(item?.stepNo) >= 4 && (
                <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
              )}
              {item?.observationTitle} -----{" "}
              {getStepStatusLabel(Number(item?.stepNo), user[0])}
            </div>

            {subLocationLabel && (
              <div className="d-flex align-items-center ms-3">
                <Chip label={subLocationLabel} />
              </div>
            )}
          </div>
        </button>
      </h2>

      {isOpen && (
        <div
          id={`flush-collapse${item?.id}`}
          className="accordion-collapse collapse show"
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
      )}
    </div>
  );
};

export default React.memo(AccordianItem);