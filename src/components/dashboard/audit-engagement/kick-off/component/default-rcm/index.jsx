import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Objective from "./objective/index";
import Risk from "./risk";
import Control from "./control";
import { toast } from "react-toastify";
import { setupAddObjectiveRiskControl } from "../../../../../../global-redux/reducers/audit-engagement/slice";

const DefaultRCM = ({ auditEngagementId }) => {
  const dispatch = useDispatch();
  const { defaultRCM, loading } = useSelector(
    (state) => state?.auditEngagement
  );
  const [selectedRCM, setSelectedRCM] = React.useState([]);

  function handleSelectRCM(rcm) {
    let ifAlreadyPresent = selectedRCM?.find(
      (singleRCM) => singleRCM?.id === rcm?.id
    );
    if (ifAlreadyPresent) {
      setSelectedRCM((pre) => {
        return pre?.filter((singleRCM) => singleRCM?.id !== rcm?.id);
      });
    }
    if (!ifAlreadyPresent) {
      let newRCMArray = [...selectedRCM, rcm];
      setSelectedRCM(newRCMArray);
    }
  }

  async function handleSubmit() {
    if (loading) {
      return;
    }
    if (!selectedRCM || selectedRCM.length === 0) {
      toast.error("No Risk Control Matrix Selected");
      return;
    }

    for (const objectiveItem of selectedRCM) {
      let object = {
        objective: {
          auditEngagementId: auditEngagementId,
          description: objectiveItem?.description,
          rating: objectiveItem?.rating,
          rcmLibraryObjectives_id: 0,
        },
        risks: objectiveItem?.rcmLibraryRiskRating?.map((riskItem) => ({
          addNewRiskRatingRequest: {
            description: riskItem?.description,
            rating: riskItem?.rating,
            rcmLibraryRiskRating_id: 0,
          },
          controls: riskItem?.rcmLibraryControlRisk?.map((controlItem) => ({
            description: controlItem?.description,
            rating: controlItem?.rating,
            rcmLibraryControlRisk_id: 0,
            engagement_id: auditEngagementId,
          })),
        })),
      };

      dispatch(setupAddObjectiveRiskControl(object));

      // Adding a delay of 900 ms before the next dispatch
      await new Promise((resolve) => setTimeout(resolve, 900));
    }
  }

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseSeven"
          aria-expanded="false"
          aria-controls="flush-collapseSeven"
        >
          Default Risk Control Matrix
        </button>
      </h2>
      <div
        id="flush-collapseSeven"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {!defaultRCM[0]?.rcmLibraryObjectives ||
          defaultRCM[0]?.rcmLibraryObjectives?.length === 0 ? (
            <p>No Default Risk Control Matrix Available.</p>
          ) : (
            <div>
              <div className="row">
                <div className="col-lg-3">
                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                    <span>Objective</span>
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                    <span>Risk</span>
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                    <span>Control</span>
                  </p>
                </div>
                <div className="col-lg-1">
                  <p className="px-1 py-1 bg-secondary rounded text-white">
                    <span>Select</span>
                  </p>
                </div>
              </div>
              {defaultRCM[0]?.rcmLibraryObjectives?.map((singleRCM, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col-lg-3">
                      <Objective singleRCM={singleRCM} />
                    </div>
                    <div className="col-lg-8">
                      {singleRCM?.rcmLibraryRiskRating?.map(
                        (risk, riskIndex) => {
                          return (
                            <div key={riskIndex} className="row">
                              <div className="col-lg-6">
                                <Risk risk={risk} />
                              </div>
                              <div className="col-lg-6">
                                {risk?.rcmLibraryControlRisk?.map(
                                  (control, controlIndex) => {
                                    return (
                                      <div key={controlIndex}>
                                        <Control control={control} />
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <div className="col-lg-1">
                      <input
                        className="form-check-input w-26 h-26 border-black"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        name="yesOrNo"
                        onChange={() => handleSelectRCM(singleRCM)}
                        checked={selectedRCM?.some(
                          (rcm) => rcm?.id === singleRCM?.id
                        )}
                      ></input>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {defaultRCM[0]?.rcmLibraryObjectives &&
            defaultRCM[0]?.rcmLibraryObjectives?.length > 0 && (
              <div onClick={handleSubmit} className="mt-3">
                <div className="justify-content-end text-end">
                  <div
                    className={`btn btn-labeled btn-primary  shadow ${
                      loading && "disabled"
                    }`}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DefaultRCM;
