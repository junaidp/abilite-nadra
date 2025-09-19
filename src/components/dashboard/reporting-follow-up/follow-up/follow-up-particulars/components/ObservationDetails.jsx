import React from "react";
import { Chip } from "@mui/material";
import RichTextEditor from "./RichText";

/**
 * ObservationDetails
 * Title, (optional) Area, and Observation rich text (readonly).
 */
const ObservationDetails = ({ item, singleReport }) => {
  const subLocationLabel = singleReport?.subLocationList?.find(
    (s) => s?.id === item?.subLocation
  )?.description;

  return (
    <>
      <div className="d-flex items-center mb-4 justify-content-between">
        <div className="flex-1">
          <label>Observation Title:</label>
          <input
            className="form-control w-100"
            type="text"
            value={item?.observationTitle}
            disabled
          />
        </div>

        <div className="flex-1 d-flex flex-end">
          <Chip label={subLocationLabel} />
        </div>
      </div>

      {singleReport?.riskApproach === "Checklist" && (
        <div className="d-flex items-center mb-4">
          <div className="flex-1">
            <label>Area:</label>
            <input
              className="form-control w-100"
              type="text"
              value={item?.area}
              disabled
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label>Observation</label>
        <RichTextEditor initialValue={item?.observationName} editable="false" />
      </div>
    </>
  );
};

export default React.memo(ObservationDetails);
