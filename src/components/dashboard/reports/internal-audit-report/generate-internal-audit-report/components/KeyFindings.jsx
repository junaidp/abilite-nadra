import React from "react";
import RichTextEditor from "../../view-internal-audit-report/components/RichText";

const KeyFindings = ({ reportObject }) => {
  return (
    <div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="heading   fw-bold">Summary of key Finding(s)</div>
        </div>
      </div>

      <div className="border px-3 py-2  mt-3 rounded">
        {reportObject?.reportingList?.filter(
          (singleItem) => singleItem?.implicationRating === 1
        )?.length == 0 ? (
          <p> No summary of key findings in this job!</p>
        ) : (
          reportObject?.reportingList
            ?.filter((reportItem) => reportItem?.implicationRating === 1)
            ?.map((item, index) => {
              return (
                <div className="row mb-3" key={index}>
                  <div className="col-lg-12">
                    <label>Finding {index + 1}</label>
                    <RichTextEditor initialValue={item?.observationName} />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default KeyFindings;
