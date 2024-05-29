import React from "react";

const InfoCard = ({name,icon,value}) => {
  return (
    <div className="card glassmorphism-card">
      <div className="card-content">
        <div className="card-body">
          <div className="media d-flex  justify-content-between">
            <div className="align-self-center">
                {icon}
            </div>
            <div className="media-body">
              <span>{name}</span>
              <h3>
                {value}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
