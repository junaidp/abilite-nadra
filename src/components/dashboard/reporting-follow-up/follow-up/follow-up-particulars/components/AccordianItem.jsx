import React from "react";
import { useSelector } from "react-redux";
import AccordionHeader from "./AccordionHeader";
import ObservationDetails from "./ObservationDetails";
import ImplicationSection from "./ImplicationSection";
import AuditeeSection from "./AuditeeSection";
import ManagementCommentsSection from "./ManagementCommentsSection";
import FollowUpSection from "./FollowUpSection";
import ActionButtons from "./ActionButtons";

const AccordianItem = ({
  index,
  item,
  handleChange,
  handleSave,
  handleSaveToStep7,
  handleSaveToStep5,
  loading,
  singleReport,
  setCurrentReportingAndFollowUpId,
  setFeedBackDialog,
  handleAllowEditLastSection,
  setViewThirdFeedBackDialog,
  setViewFeedBackItem,
  handleShowTestInNextYear,
  setShowSubmitDialog,
  setShowCurrentSubmittedItem,
  handleFinalCommentsChange,
  isOpen,
  onToggle,
}) => {
  const { user } = useSelector((state) => state?.auth);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingeightt">
        <AccordionHeader
          index={index}
          item={item}
          isOpen={isOpen}
          onToggle={onToggle}
        />
      </h2>

      {isOpen && (
        <div
          id={`flush-collapse${index}`}
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <ObservationDetails item={item} singleReport={singleReport} />

            <ImplicationSection item={item} />

            <AuditeeSection item={item} />

            <ManagementCommentsSection item={item} />

            <FollowUpSection
              item={item}
              handleChange={handleChange}
              handleAllowEditLastSection={handleAllowEditLastSection}
              handleFinalCommentsChange={handleFinalCommentsChange}
              singleReport={singleReport}
              handleShowTestInNextYear={handleShowTestInNextYear}
            />

            <ActionButtons
              item={item}
              user={user}
              singleReport={singleReport}
              loading={loading}
              handleSave={handleSave}
              handleSaveToStep7={handleSaveToStep7}
              handleSaveToStep5={handleSaveToStep5}
              setShowCurrentSubmittedItem={setShowCurrentSubmittedItem}
              setShowSubmitDialog={setShowSubmitDialog}
              setCurrentReportingAndFollowUpId={setCurrentReportingAndFollowUpId}
              setFeedBackDialog={setFeedBackDialog}
              setViewFeedBackItem={setViewFeedBackItem}
              setViewThirdFeedBackDialog={setViewThirdFeedBackDialog}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(AccordianItem);