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
    startDate: "",
    endDate: "",
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
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      if (
        data?.startDate === "" ||
        data?.endDate === "" ||
        data?.reportTitle === ""
      ) {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupSaveReport({
            companyId: companyId,
            startDate: data?.startDate,
            endDate: data?.endDate,
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
              <label className="form-label">From</label>
              <div className="mb-3 d-flex align-items-end">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                  value={data?.startDate}
                  name="startDate"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">To</label>
              <div className="mb-3 d-flex align-items-end">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                  value={data?.endDate}
                  name="endDate"
                  onChange={(e) => handleChange(e)}
                />
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
                name="reportTitle"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-outline-primary    ${loading && "disabled"}`}
        onClick={handleAdd}
      >
        {loading ? "Loading..." : "Add Report"}
      </button>
    </div>
  );
};

export default Header;
