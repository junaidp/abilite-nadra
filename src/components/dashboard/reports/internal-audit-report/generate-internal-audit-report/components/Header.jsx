import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
      <div className="mb-0 heading">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/internal-audit-report")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        Generated Internal Audit Report
      </div>
      <div className="">
        <div className="btn btn-labeled btn-primary px-3 shadow">
          <span className="btn-label me-2">
            <i className="fa fa-plus"></i>
          </span>
          Add Section
        </div>
        <i
          className="fa fa-info-circle ps-3 text-secondary cursor-pointer"
          title="Info"
        ></i>
      </div>
    </header>
  );
};

export default Header;
