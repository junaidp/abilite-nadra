import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setupSaveReport,
  resetReportAddSuccess,
} from "../../../../../../../global-redux/reducers/reports/planing-report/slice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const { loading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );
  const [data, setData] = React.useState({
    year: "",
    reportTitle: "",
  });

  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleAdd() {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;

      if (companyId) {
        if (
          data?.year === "" ||
          data?.reportTitle.trim() === ""
        ) {
          toast.error("Provide all values");
          return
        }
        dispatch(
          setupSaveReport({
            companyId: companyId,
            year: data?.year,
            reportTitle: data?.reportTitle,
          })
        );

      }
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      dispatch(resetReportAddSuccess());
      navigate("/audit/planning-report");
    }
  }, [reportAddSuccess]);

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
              Generate Internal Audit Planning Report
            </div>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6">
              <label className="col-lg-2 label-text w-100 mb-2">Year</label>
              <div className="col-lg-12">
                <select
                  className="form-control h-40"
                  name="year"
                  value={data?.year}
                  onChange={(e) => handleChange(e)}
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
            <div className="col-lg-6">
              <label className="col-lg-2 label-text w-100 mb-2">Report Name</label>
              <div className="col-lg-12">
                <input
                  type="text"
                  id="description"
                  className="form-control h-40"
                  value={data?.reportTitle}
                  name="reportTitle"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      </div>

      <div
        className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${loading && "disabled"
          }`}
        onClick={handleAdd}
      >
        <span className="btn-label me-2">
          <i className="fa fa-check-circle f-18"></i>
        </span>
        {loading ? "Loading.." : "Create Report"}
      </div>
    </div>
  );
};

export default Header;
