import React from "react";
import ObservationFileUpload from "./ObservationFileUpload";
import { CircularProgress } from "@mui/material";

const ComplianceRow = ({
  index,
  singleItem,
  handleChange,
  onViewObservation,
  observationLoadingId,
  allowEdit,
  setCurrentDeleteFileId,
  onFileUploaded,
  onFileDeleted,
}) => {
  const isObservationLoading = Number(observationLoadingId) === Number(singleItem?.id);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{singleItem?.area}</td>
      <td>{singleItem?.subject || "null"}</td>
      <td>{singleItem?.particulars}</td>

      <td>
        <select
          className="form-select mb-2"
          value={singleItem?.remarks}
          name="remarks"
          onChange={(event) => handleChange(event, singleItem?.id)}
          disabled={!allowEdit}
        >
          <option value="">Select Remark</option>
          <option value={1}>Complied</option>
          <option value={2}>Not Complied</option>
          <option value={3}>Not Applicable</option>
          <option value={4}>Partially Complied</option>
        </select>
      </td>

      <td>
        <button
          type="button"
          className={`btn ${
            singleItem?.observationComplete ? "btn-success" : "btn-primary"
          } btn-sm`}
          onClick={() => onViewObservation(singleItem)}
          disabled={isObservationLoading}
        >
          {isObservationLoading ? (
            <span className="d-flex align-items-center gap-2">
              <CircularProgress size={14} color="inherit" /> Loading...
            </span>
          ) : (
            "View Observation"
          )}
        </button>
      </td>

      <td>
        <ObservationFileUpload
          item={singleItem}
          allowEdit={allowEdit}
          setCurrentDeleteFileId={setCurrentDeleteFileId}
          onFileUploaded={onFileUploaded}
          onFileDeleted={onFileDeleted}
        />
      </td>
    </tr>
  );
};

export default React.memo(ComplianceRow);
