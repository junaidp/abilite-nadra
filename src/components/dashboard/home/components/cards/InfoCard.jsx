import React from "react";

const InfoCard = ({ name, icon, value, extra }) => {
  return (
    <div className="card glassmorphism-card">
      <div className="card-content">
        <div className="card-body">
          <div className="media d-flex  justify-content-between">
            <div className="align-self-center">{icon}</div>
            <div className="media-body">
              <span>
                {name}
                {extra && <span className="visibility-hidden m-0 p-0"> {extra}</span>}
              </span>
              <h3>{value}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
