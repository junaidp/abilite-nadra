import React from "react";
import { useNavigate } from "react-router-dom";
import {
  resetReportingAddSuccess,
  setupGetAllReporting,
  setupUpdateReporting,
  setupGetInitialAllReporting,
} from "../../../../../global-redux/reducers/reporting/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";
import { useDispatch, useSelector } from "react-redux";
import AccordianItem from "./component/accordian-item/AccordianItem";
import { CircularProgress } from "@mui/material";

const ReportingParticulars = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const { allReporting, loading, reportingAddSuccess, initialLoading } =
    useSelector((state) => state?.reporting);
  const [reports, setReports] = React.useState([]);
  const { allUsers } = useSelector((state) => state?.setttingsUserManagement);

  function handleChange(event, mainIndex, id) {
    setReports((pre) =>
      pre.map((all) =>
        Number(all?.id) === Number(mainIndex)
          ? {
              ...all,
              reportingList: all?.reportingList?.map((report) =>
                Number(report?.id) === Number(id)
                  ? { ...report, [event?.target?.name]: event?.target?.value }
                  : report
              ),
            }
          : all
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
            item?.recommendedActionStep !== "" &&
            item?.recommendedActionStep !== null &&
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
            `?companyId=${companyId}&currentYear=${Number(year)}`
          )
        );
      }
      dispatch(resetReportingAddSuccess());
    }
  }, [reportingAddSuccess]);

  React.useEffect(() => {
    if (allReporting?.length !== 0) {
      setReports(allReporting);
    }
  }, [allReporting]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetInitialAllReporting(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
      dispatch(setupGetAllUsers({ shareWith: true }));
    }
  }, [user, year, company]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-reporting"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));
  }, []);

  return (
    <div>
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : allReporting?.length === 0 ||
        allReporting[0]?.error === "Not Found" ? (
        "Reporting Not Found"
      ) : (
        <>
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
              <hr />

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="accordion" id="accordionFlushExample">
                    {reports?.map((item) =>
                      item?.reportingList?.map((report, index) => {
                        return (
                          <AccordianItem
                            mainIndex={item.id}
                            key={index}
                            item={report}
                            handleChange={handleChange}
                            loading={loading}
                            allUsers={allUsers?.filter(
                              (singleUser) =>
                                Number(singleUser?.id) !== user[0]?.userId?.id
                            )}
                            setReports={setReports}
                            handleSave={handleSave}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportingParticulars;
