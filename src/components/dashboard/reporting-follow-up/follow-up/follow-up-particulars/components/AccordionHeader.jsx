import React from "react";
import { Chip } from "@mui/material";

const getStatusColor = (item) => {
  const stepNo = Number(item?.stepNo);
  if (stepNo === 5) return "#b76e00";
  if (stepNo === 6 && item.followUp.recommendationsImplemented) return "#198754";
  if (stepNo === 6 && !item.followUp.recommendationsImplemented) return "#b76e00";
  if (stepNo >= 7) return "#6f42c1";
  return "#2A3547";
};

/**
 * AccordionHeader
 * Renders the accordion button/header with icon and status label.
 */
const AccordionHeader = ({
  index,
  item,
  isOpen,
  onToggle,
  subLocationLabel,
}) => {
  const statusLabel = (() => {
    if (Number(item?.stepNo) === 5) return "Exception To Be  Implemented";
    if (
      Number(item?.stepNo) === 6 &&
      item.followUp.recommendationsImplemented
    )
      return "Exceptions Implemented";
    if (
      Number(item?.stepNo) === 6 &&
      !item.followUp.recommendationsImplemented
    )
      return "Exception To Be  Implemented";
    if (Number(item?.stepNo) >= 7) return "Observation Completed";
    return "";
  })();

  return (
    <button
      className={`accordion-button ${isOpen ? "" : "collapsed"}`}
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`flush-collapse${index}`}
    >
      <div className="d-flex w-100 me-3 align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {Number(item?.stepNo) >= 7 && (
            <i className="fa fa-check-circle fs-3 text-success pe-3" />
          )}
          {item?.observationTitle} -----{" "}
          <span
            className="fw-semibold"
            style={{ color: getStatusColor(item) }}
          >
            {statusLabel}
          </span>
        </div>

        {subLocationLabel && (
          <div className="d-flex align-items-center ms-3">
            <Chip label={subLocationLabel} />
          </div>
        )}
      </div>
    </button>
  );
};

export default React.memo(AccordionHeader);
