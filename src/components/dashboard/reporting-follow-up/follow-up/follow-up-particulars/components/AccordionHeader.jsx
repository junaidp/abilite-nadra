import React from "react";

/**
 * AccordionHeader
 * Renders the accordion button/header with icon and status label.
 */
const AccordionHeader = ({ index, item }) => {
  const statusLabel = (() => {
    if (Number(item?.stepNo) === 5) return "Exception To Be  Implemented";
    if (Number(item?.stepNo) === 6) return "Exceptions Implemented";
    if (Number(item?.stepNo) >= 7) return "Observation Completed";
    return "";
  })();

  return (
    <button
      className="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#flush-collapse${index}`}
      aria-expanded="false"
      aria-controls={`flush-collapse${index}`}
    >
      <div className="d-flex w-100 me-3 align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {Number(item?.stepNo) >= 7 && (
            <i className="fa fa-check-circle fs-3 text-success pe-3" />
          )}
          {item?.observationTitle} ----- {statusLabel}
        </div>
      </div>
    </button>
  );
};

export default React.memo(AccordionHeader);
