import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const KickOffModal = ({ setShowKickOffDialog, kickOffId }) => {
  const navigate = useNavigate();
  const { loading, navigationInfo } = useSelector((state) => state?.common);
  return (
    <div className="px-4 py-4">
      <h2 className="heading">Kick Off Dialog</h2>
      <p className="py-4">
        Are You Sure You Want To Kick This Job (
        {
          navigationInfo?.jobsDueForKickOffWithinAWeek?.find(
            (job) => job?.id === kickOffId
          )?.name
        }
        )
      </p>
      <div className="row py-3">
        <div className="col-lg-6 text-end">
          <button
            className={`btn btn-primary float-start ${loading && "disabled"}`}
            onClick={() =>
              navigate(`/audit/kick-off?auditEngagementId=${kickOffId}`)
            }
          >
            Kick Off
          </button>
        </div>
        <div className="col-lg-6 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => setShowKickOffDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default KickOffModal;
