import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Header = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="section-header my-3">
        <div className="row align-items-center mb-4">
          <div className="col-lg-12 d-flex align-items-center">
            <i
              className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
              onClick={() => navigate("/audit/planning-report")}
            ></i>

            <div className="mb-0 heading">
              Update Internal Audit Planning Report
            </div>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6">
              <label className="form-label">From</label>
              <div className="mb-3 d-flex align-items-end">
                {moment.utc(data?.startDate).format("DD-MM-YY")}
              </div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">To</label>
              <div className="mb-3 d-flex align-items-end">
                {moment.utc(data?.endDate).format("DD-MM-YY")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="mb-4 col-lg-12">
          <div className="col-lg-2 label-text w-100 mb-2">Report Name</div>
          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="text"
                id="description"
                className="form-control h-40"
                value={data?.reportTitle}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
