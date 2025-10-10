import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setupSaveReport,
  resetReportAddSuccess,
} from "../../../../../../../global-redux/reducers/reports/planing-report/slice";
import { toast } from "react-toastify";

/**
 * Header section for creating a new Internal Audit Planning Report.
 * Handles form inputs (year, title) and dispatches report creation.
 */
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const { loading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );

  const [data, setData] = React.useState({ year: "", reportTitle: "" });

  /** Handle input field changes */
  const handleChange = React.useCallback((event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  /** Create new report if valid */
  const handleAdd = React.useCallback(() => {
    if (loading) return;

    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;

    if (!companyId) return;

    const { year, reportTitle } = data;
    if (!year || !reportTitle.trim()) {
      toast.error("Provide all values");
      return;
    }

    dispatch(
      setupSaveReport({
        companyId,
        year,
        reportTitle: reportTitle.trim(),
      })
    );
  }, [loading, user, company, data, dispatch]);

  /** Redirect after successful report creation */
  React.useEffect(() => {
    if (reportAddSuccess) {
      dispatch(resetReportAddSuccess());
      navigate("/audit/planning-report");
    }
  }, [reportAddSuccess, dispatch, navigate]);

  return (
    <div>
      {/* ===== Page Header ===== */}
      <header className="section-header my-3">
        <div className="row align-items-center mb-4">
          <div className="col-lg-12 d-flex align-items-center">
            <i
              className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
              onClick={() => navigate("/audit/planning-report")}
            ></i>
            <div className="mb-0 heading">
              Generate Planning Report
            </div>
          </div>
        </div>
      </header>

      {/* ===== Input Form ===== */}
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            {/* Year Selection */}
            <div className="col-lg-6">
              <label className="col-lg-2 label-text w-100 mb-2">Year</label>
              <div className="col-lg-12">
                <select
                  className="form-control h-40"
                  name="year"
                  value={data.year}
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 11 }, (_, i) => {
                    const currentYear = new Date().getFullYear();
                    const year = currentYear - 5 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Report Name Input */}
            <div className="col-lg-6">
              <label className="col-lg-2 label-text w-100 mb-2">
                Report Name
              </label>
              <div className="col-lg-12">
                <input
                  type="text"
                  id="description"
                  className="form-control h-40"
                  value={data.reportTitle}
                  name="reportTitle"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Submit Button ===== */}
      <div
        className={`btn btn-labeled btn-primary px-3 shadow my-4 ${loading ? "disabled" : ""
          }`}
        onClick={handleAdd}
      >
        {loading ? "Loading.." : "Create Report"}
      </div>
    </div>
  );
};

export default Header;
