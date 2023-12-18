import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const BusinessCheckListCard = () => {
  let navigate = useNavigate();
  return (
    <div>
      <header className="section-header my-3 align-items-center  text-start d-flex ">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/business-objective")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        <h3 className="mb-0 fw-bold">Compliance Checklist</h3>
      </header>
    </div>
  );
};

export default BusinessCheckListCard;
