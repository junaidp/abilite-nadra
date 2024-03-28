import React from "react";
import RichTextEditor from "./RichText";
import Chip from "@mui/material/Chip";
import FollowUpItem from "./FollowUpItem";

const KeyFindings = ({ reportObject, handleChangeSummaryOfKeyFinding }) => {
  return (
    <div>
      <div className="col-lg-12 mt-4">
        <div className="sub-heading  fw-bold">All Findings</div>
      </div>
      <div className="border px-3 py-2  mt-3 rounded">
        {reportObject?.consolidatedIARKeyFindingsList?.map(
          (singleItem, index) => {
            return (
              <div key={index}>
                <div className="mb-4">
                  <label className="mb-2">Summary of key finding:</label>
                  <RichTextEditor
                    initialValue={singleItem?.summaryOfKeyFinding}
                    handleChangeSummaryOfKeyFinding={
                      handleChangeSummaryOfKeyFinding
                    }
                    keyFindingId={singleItem?.id}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <div>
                      <div className="row mb-3 f-13">
                        <div className="col-lg-6 px-3 d-flex justify-content-between">
                          <label className="mt-2">Location:</label>
                          <div>
                            {!singleItem?.subLocationList ||
                            singleItem?.subLocationList?.length === 0 ? (
                              <p className="mt-2">No Location To Show</p>
                            ) : (
                              [
                                ...new Set(
                                  singleItem?.subLocationList?.map(
                                    (item) => item?.locationid?.description
                                  )
                                ),
                              ]?.map((locationItem) => {
                                return (
                                  <Chip
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
                      {!singleItem?.subLocationList ||
                      singleItem?.subLocationList?.length === 0 ? (
                        <p className="mt-2">No Sub Location To Show</p>
                      ) : (
                        singleItem?.subLocationList?.map((item) => {
                          return (
                            <Chip
                              label={item?.description}
                              className="mx-2 mb-2"
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
                {singleItem?.reportingList?.map((item, index) => {
                  return <FollowUpItem key={index} item={item} />;
                })}
                {index + 1 !==
                  reportObject?.consolidatedIARKeyFindingsList?.length && (
                  <hr />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default KeyFindings;
