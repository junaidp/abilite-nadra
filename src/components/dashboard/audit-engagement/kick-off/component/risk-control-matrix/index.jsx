import React from "react";
import { useSelector } from "react-redux";
import Objective from "./component/objective";
import Rating from "./component/rating";
import Control from "./component/control";
const RiskControlMatrix = ({
  setShowViewLibrary,
  currentAuditEngagement,
  setCurrentAuditEngagement,
  setShowKickOffObjectiveDialog,
  setShowKickOffRatingDialog,
  setShowKickOffControlDialog,
}) => {
  const { loading } = useSelector((state) => state?.auditEngagement);
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFour"
          aria-expanded="false"
          aria-controls="flush-collapseFour"
        >
          Risk Control Matrix
        </button>
      </h2>
      <div
        id="flush-collapseFour"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-2">
              <div className="col-lg-12">
                <button
                  className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow"
                  onClick={() => setShowViewLibrary(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-eye"></i>
                  </span>
                  View Library
                </button>
              </div>
            </div>

            <div className="row">
              <Objective
                currentAuditEngagement={currentAuditEngagement}
                setCurrentAuditEngagement={setCurrentAuditEngagement}
                setShowKickOffObjectiveDialog={setShowKickOffObjectiveDialog}
                loading={loading}
              />

              <Rating
                currentAuditEngagement={currentAuditEngagement}
                setCurrentAuditEngagement={setCurrentAuditEngagement}
                setShowKickOffRatingDialog={setShowKickOffRatingDialog}
                loading={loading}
              />

              <Control
                currentAuditEngagement={currentAuditEngagement}
                setCurrentAuditEngagement={setCurrentAuditEngagement}
                setShowKickOffControlDialog={setShowKickOffControlDialog}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskControlMatrix;
