import React from "react";
import { useNavigate } from "react-router-dom";
import {
  resetReportingAddSuccess,
  setupGetAllReporting,
  setupUpdateReporting,
} from "../../../../../global-redux/reducers/reporting/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";
import { useDispatch, useSelector } from "react-redux";
import AccordianItem from "./component/accordian-item/AccordianItem";

const ReportingParticulars = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const { allReports, loading, reportingAddSuccess } = useSelector(
    (state) => state?.reporting
  );
  const [reports, setReports] = React.useState([]);
  const { allUsers } = useSelector((state) => state?.setttingsUserManagement);

  function handleChange(event, id) {
    setReports((pre) =>
      pre.map((item) =>
        Number(item?.id) === Number(id)
          ? { ...item, [event?.target?.name]: event?.target?.value }
          : item
      )
    );
  }

  function handleSave(item) {
    if (!loading) {
      dispatch(
        setupUpdateReporting({
          ...item,
          stepNo:
            item?.observationTitle !== "" &&
            item?.observationTitle !== null &&
            item?.observationName !== "" &&
            item?.observationName !== null &&
            item?.implicationRating !== "" &&
            item?.implication !== null &&
            item?.implication !== "" &&
            item?.implication !== null &&
            item?.auditee !== null
              ? 2
              : 0,
        })
      );
    }
  }

  React.useEffect(() => {
    if (reportingAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllReporting(
            `?companyId=${companyId}&currentYear=2024&userId=${user[0]?.userId?.id}`
          )
        );
      }
      dispatch(resetReportingAddSuccess());
    }
  }, [reportingAddSuccess]);

  React.useEffect(() => {
    if (allReports?.length !== 0) {
      setReports(allReports[0]?.reportingList);
    }
  }, [allReports]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllReporting(
          `?companyId=${companyId}&currentYear=2024&userId=${user[0]?.userId?.id}`
        )
      );
      dispatch(setupGetAllUsers());
    }
  }, [user]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-reporting"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));
  }, []);

  return (
    <div>
      <header className="section-header my-3 align-items-center  text-start d-flex ">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/reportings")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        <div className="mb-0 heading">Reporting</div>
      </header>
      <div className="row px-4">
        <div className="col-md-12">
          <div className="sub-heading ps-2 mb-3 fw-bold">
            {allReports[0]?.title}
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="accordion" id="accordionFlushExample">
                {reports?.map((item, index) => {
                  return (
                    <AccordianItem
                      key={index}
                      index={index}
                      item={item}
                      handleChange={handleChange}
                      loading={loading}
                      allUsers={allUsers}
                      setReports={setReports}
                      handleSave={handleSave}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingParticulars;
