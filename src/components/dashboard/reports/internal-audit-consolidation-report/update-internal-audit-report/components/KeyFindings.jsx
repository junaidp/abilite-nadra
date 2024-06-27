import React from "react";
import RichTextEditor from "../../view-internal-audit-report/components/RichText";
import Chip from "@mui/material/Chip";
import FollowUpItem from "./FollowUpItem";

const KeyFindings = ({ reportObject }) => {
  return (
    <div>
      <div className="col-lg-12 mt-4">
        <div className="heading  fw-bold">Summary Of Key Findings</div>
      </div>
      <div className="border px-3 py-2  mt-3 rounded">
        {reportObject?.summaryOfKeyFindingsList?.length === 0 ? (
          <p>No summary of key findings in this job!</p>
        ) : (
          reportObject?.summaryOfKeyFindingsList?.map((singleItem, index) => {
            return (
              <div key={index} className="mb-4">
                <div className="sub-heading  fw-bold mb-2">
                  Finding {index + 1}
                </div>
                <div className="mb-4">
                  <RichTextEditor
                    initialValue={singleItem?.summaryOfKeyFinding}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      {/*  */}
      <div className="col-lg-12 mt-4">
        <div className="heading  fw-bold">All Findings</div>
      </div>
      <div className="border px-3 py-2  mt-3 rounded">
        {reportObject?.consolidatedIARKeyFindingsList?.map(
          (singleMainItem, index) => {
            return (
              <div key={index}>
                <h3 className="heading  fw-bold my-4">Finding {index + 1}</h3>
                {singleMainItem?.summaryOfKeyFinding &&
                  singleMainItem?.summaryOfKeyFinding.trim() !== "" && (
                    <>
                      <div className="sub-heading  fw-bold my-2">
                        Consolidated Observation
                      </div>
                      <RichTextEditor
                        initialValue={singleMainItem?.summaryOfKeyFinding}
                      />
                    </>
                  )}
                <div className="row my-4">
                  <div className="col-lg-6">
                    <div>
                      <div className="row mb-3 f-13">
                        <div className="col-lg-6 px-3 d-flex justify-content-between">
                          <label className="mt-2">Location:</label>
                          <div>
                            {!singleMainItem?.subLocationList ||
                            singleMainItem?.subLocationList?.length === 0 ? (
                              <p className="mt-2">No Location To Show</p>
                            ) : (
                              [
                                ...new Set(
                                  singleMainItem?.subLocationList?.map(
                                    (item) => item?.locationid?.description
                                  )
                                ),
                              ]?.map((locationItem, index) => {
                                return (
                                  <Chip
                                    key={index}
                                    label={locationItem}
                                    className="mx-2 mb-2"
                                  />
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 px-3 d-flex justify-content-between">
                    <label className="mt-2">Sub-Location:</label>
                    <div className="">
                      {!singleMainItem?.subLocationList ||
                      singleMainItem?.subLocationList?.length === 0 ? (
                        <p className="mt-2">No Sub Location To Show</p>
                      ) : (
                        singleMainItem?.subLocationList?.map((item, index) => {
                          return (
                            <Chip
                              key={index}
                              label={item?.description}
                              className="mx-2 mb-2"
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
                <div className="sub-heading  fw-bold mb-4">
                  Key Findings List
                </div>
                {singleMainItem?.reportingList?.map((item, keyFindingIndex) => {
                  return <FollowUpItem key={keyFindingIndex} item={item} />;
                })}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default KeyFindings;
