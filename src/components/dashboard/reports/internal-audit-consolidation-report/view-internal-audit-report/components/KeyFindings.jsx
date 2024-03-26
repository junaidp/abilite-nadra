import React from "react";
import RichTextEditor from "./RichText";

const KeyFindings = ({ singleInternalAuditReport }) => {
  return (
    <div>
      <div className="col-lg-12 mt-4">
        <div className="sub-heading  fw-bold">Key Findings</div>
      </div>

      <div className="border px-3 py-2  mt-3 rounded">
        <div className="row my-3"></div>
        {singleInternalAuditReport?.keyFindingsList?.map((item, index) => {
          return (
            <div className="row mb-3" key={index}>
              <div className="col-lg-12">
                <label>Finding {index + 1}</label>
                <RichTextEditor initialValue={item?.summaryOfKeyFinding} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyFindings;
