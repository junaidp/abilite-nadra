import React from "react";

const KeyFindings = ({ singleInternalAuditReport }) => {
  return (
    <div className="border px-3 py-2  mt-3 rounded">
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Key Findings</div>
        </div>
      </div>
      {singleInternalAuditReport?.keyFindingsList?.map((item, index) => {
        return (
          <div className="row mb-3" key={index}>
            <div className="col-lg-12">
              <label>Finding {index + 1}</label>
              <textarea
                className="form-control"
                placeholder="Enter Finding"
                id="exampleFormControlTextarea1"
                rows="3"
                value={item?.summaryOfKeyFinding}
                disabled
                ReadOnly
              ></textarea>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KeyFindings;
