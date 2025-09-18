import React from "react";
import RichTextEditor from "./TextEditor";
import ObservationFileUpload from "./ObservationFileUpload";
import { CircularProgress } from "@mui/material";

const ComplianceRow = ({
  index,
  singleItem,
  handleChange,
  onContentChange,
  allowEdit,
  setCurrentDeleteFileId,
}) => {
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
        <RichTextEditor
          initialValue={singleItem?.observation}
          onContentChange={onContentChange}
          singleItem={singleItem}
          allowEdit={allowEdit}
        />
      </td>

      <td>
        <ObservationFileUpload
          item={singleItem}
          allowEdit={allowEdit}
          setCurrentDeleteFileId={setCurrentDeleteFileId}
        />
      </td>
    </tr>
  );
};

export default React.memo(ComplianceRow);
