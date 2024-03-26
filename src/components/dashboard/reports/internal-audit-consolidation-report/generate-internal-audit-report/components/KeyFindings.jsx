import React from "react";
import RichTextEditor from "./RichText";

const KeyFindings = ({ reportObject, handleChangeSummaryOfKeyFinding }) => {
  return (
    <div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading   fw-bold">Summary of key Finding(s)</div>
        </div>
      </div>

      <div className="border px-3 py-2  mt-3 rounded">
        {reportObject?.keyFindingsList?.map((item, index) => {
          return (
            <div className="row mb-3" key={index}>
              <div className="col-lg-12">
                <label>Finding {index + 1}</label>
                <RichTextEditor
                  initialValue={item?.summaryOfKeyFinding}
                  handleChangeSummaryOfKeyFinding={
                    handleChangeSummaryOfKeyFinding
                  }
                  keyFindingId={item?.id}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyFindings;
