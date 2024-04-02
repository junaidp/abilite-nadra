import React from "react";
import { useNavigate } from "react-router-dom";
import {
  resetReportingAddSuccess,
  setupGetInitialSingleReport,
  setupGetSingleReport,
  setupUpdateReporting,
  setupUpdateFollowUp,
  resetReports,
} from "../../../../../global-redux/reducers/reporting/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./index.css";
import { CircularProgress } from "@mui/material";
import AccordianItem from "./components/AccordianItem";

const ReportingParticulars = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const followUpId = searchParams.get("followUpId");
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const { singleReport, loading, reportingAddSuccess, initialLoading } =
    useSelector((state) => state?.reporting);
  const [report, setReport] = React.useState([]);

  function handleChange(event, id) {
    setReport((pre) => {
      return {
        ...pre,
        reportingList: pre?.reportingList?.map((singleItem) =>
          Number(singleItem?.id) === Number(id)
            ? {
                ...singleItem,
                followUp: {
                  ...singleItem?.followUp,
                  [event?.target?.name]: event?.target?.value,
                },
              }
            : singleItem
        ),
      };
    });
  }

  function handleSaveToStep6(item) {
    dispatch(
      setupUpdateReporting({
        ...item,
        stepNo: 6,
      })
    );
  }

  function handleSave(item) {
    if (!loading) {
      dispatch(
        setupUpdateFollowUp({
          ...item?.followUp,
          recommendationsImplemented:
            item?.followUp?.recommendationsImplemented.toString() === "true"
              ? true
              : false,
          testInNextYear:
            item?.followUp?.testInNextYear.toString() === "true" ? true : false,
        })
      );
    }
  }

  function handleSaveToStep7(item) {
    dispatch(setupUpdateReporting({ ...item, stepNo: 7 }));
  }

  React.useEffect(() => {
    if (reportingAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetSingleReport(`?reportingAndFollowUpId=${Number(followUpId)}`)
        );
      }
      dispatch(resetReportingAddSuccess());
    }
  }, [reportingAddSuccess]);

  React.useEffect(() => {
    const isEmptyObject =
      Object.keys(singleReport).length === 0 &&
      singleReport.constructor === Object;
    if (!isEmptyObject && followUpId) {
      setReport(singleReport);
    }
  }, [singleReport]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetInitialSingleReport(
          `?reportingAndFollowUpId=${Number(followUpId)}`
        )
      );
    }
  }, [user, year, company]);

  React.useEffect(() => {
    if (!followUpId) {
      navigate("/audit/follow-up");
    }
  }, [followUpId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-followup"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));
    return () => {
      dispatch(resetReports());
    };
  }, []);

  return (
    <div>
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : singleReport[0]?.error === "Not Found" ? (
        "Follow Up Not Found"
      ) : (
        <>
          <header className="section-header my-3 align-items-center  text-start d-flex ">
            <a
              className="text-primary"
              onClick={() =>
                user[0]?.userId?.employeeid?.userHierarchy ===
                "Management_Auditee"
                  ? navigate("/audit/dashboard")
                  : navigate("/audit/follow-up")
              }
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Follow-Up</div>
          </header>
          <div className="row px-4">
            <div className="col-md-12">
              <div className="sub-heading ps-2 mb-3 fw-bold">
                {report?.title}
              </div>

              <hr />

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="accordion" id="accordionFlushExample">
                    {report?.reportingList?.filter(
                      (singleItem) => singleItem?.stepNo >= 5
                    )?.length === 0
                      ? "No Reporting List Found"
                      : report?.reportingList
                          ?.filter((singleItem) => singleItem?.stepNo >= 5)
                          ?.map((item, index) => {
                            return (
                              <AccordianItem
                                key={index}
                                index={index}
                                item={item}
                                handleChange={handleChange}
                                handleSave={handleSave}
                                handleSaveToStep6={handleSaveToStep6}
                                handleSaveToStep7={handleSaveToStep7}
                                loading={loading}
                                singleReport={singleReport}
                                followUpId={followUpId}
                              />
                            );
                          })}
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
