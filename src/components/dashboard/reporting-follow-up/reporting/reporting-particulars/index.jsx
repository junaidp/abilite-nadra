import React from "react";
import { useNavigate } from "react-router-dom";
import {
  resetReportingAddSuccess,
  setupGetSingleReport,
  setupUpdateReporting,
  setupGetInitialSingleReport,
  setupUpdateReportingByManagementAuditee,
  resetReports,
  resetManagementAuditeeReportingAddSuccess,
  resetReportingFileUploadAddSuccess,
} from "../../../../../global-redux/reducers/reporting/slice";
import { useSearchParams } from "react-router-dom";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";
import { useDispatch, useSelector } from "react-redux";
import AccordianItem from "./component/accordian-item/AccordianItem";
import { CircularProgress } from "@mui/material";
import FirstApproveReportingDialog from "./component/approve-dialogs/FirstApprove";
import SecondApproveReportingDialog from "./component/approve-dialogs/SecondApprove";
import FeedBackDialog from "../../components/FeedBackDialog";
import ViewFirstFeedBackDialog from "../../components/FirstFeedBack";
import ViewSecondFeedBackDialog from "../../components/SecondFeedBack";
import { toast } from "react-toastify";

const ReportingParticulars = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const reportingId = searchParams.get("reportingId");
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const [viewFeedBackItem, setViewFeedBackItem] = React.useState({});
  const [viewFirstFeedBackDialog, setViewFirstFeedBackDialog] =
    React.useState(false);
  const [viewSecondFeedBackDialog, setViewSecondFeedBackDialog] =
    React.useState(false);
  const {
    singleReport,
    loading,
    reportingAddSuccess,
    initialLoading,
    managementAuditeeReportingAddSuccess,
    reportingFileUploadSuccess,
  } = useSelector((state) => state?.reporting);
  const [report, setReport] = React.useState([]);
  const { allUsers } = useSelector((state) => state?.settingsUserManagement);
  const [currentApproveItem, setCurrentApproveItem] = React.useState({});
  const [firstApproveDialog, setFirstApproveDialog] = React.useState(false);
  const [secondApproveDialog, setSecondApproveDialog] = React.useState(false);
  const [feedBackDialog, setFeedBackDialog] = React.useState(false);
  const [currentReportingAndFollowUpId, setCurrentReportingAndFollowUpId] =
    React.useState("");
  const [currentOpenItem, setCurrentOpenItem] = React.useState({});

  function handleChange(event, id) {
    setReport((pre) => {
      return {
        ...pre,
        reportingList: pre?.reportingList?.map((report) =>
          Number(report?.id) === Number(id)
            ? { ...report, [event?.target?.name]: event?.target?.value }
            : report
        ),
      };
    });
  }

  function handleObservationChange(id, content) {
    setReport((pre) => {
      return {
        ...pre,
        reportingList: pre?.reportingList?.map((report) =>
          Number(report?.id) === Number(id)
            ? { ...report, observationName: content }
            : report
        ),
      };
    });
  }

  function handleSaveToStep1(item) {
    if (!loading) {
      dispatch(
        setupUpdateReporting({
          ...item,
          stepNo:
            item?.observationTitle !== "" &&
            item?.observationTitle &&
            item?.observationName !== "" &&
            item?.observationName &&
            item?.implicationRating !== "" &&
            item?.implicationRating &&
            Number(item?.implicationRating) !== 0 &&
            item?.implication &&
            item?.implication !== "" &&
            item?.recommendedActionStep !== "" &&
            item?.recommendedActionStep &&
            item?.auditee &&
            item?.auditee?.name
              ? 1
              : 0,
        })
      );
    }
  }
  function handleSaveStep1(item) {
    if (!loading) {
      dispatch(setupUpdateReporting(item));
    }
  }

  function handleSaveToStep2(item) {
    if (
      item?.observationTitle === "" ||
      !item?.observationTitle ||
      item?.observationName === "" ||
      !item?.observationName ||
      item?.implicationRating === "" ||
      !item?.implicationRating ||
      Number(item?.implicationRating) === 0 ||
      !item?.implication ||
      item?.implication === "" ||
      item?.recommendedActionStep === "" ||
      !item?.recommendedActionStep ||
      !item?.auditee ||
      !item?.auditee?.name
    ) {
      toast.error(
        "Fields missing. Please fill them  first and then approve the observation"
      );
      return;
    }
    setCurrentApproveItem(item);
    setFirstApproveDialog(true);
  }

  function handleSaveStep2(item) {
    if (!loading) {
      dispatch(setupUpdateReporting(item));
    }
  }

  function handleSaveToStep3(item) {
    if (!loading) {
      if (
        item?.managementComments === "" ||
        !item?.managementComments ||
        item?.implementationDate === "" ||
        !item?.implementationDate
      ) {
        toast.error(
          "Fields missing. Please fill them  first and then submit the observation"
        );
        return;
      }
      dispatch(
        setupUpdateReportingByManagementAuditee({
          ...item,
          stepNo: 3,
        })
      );
    }
  }

  function handleSaveToStep4(item) {
    setCurrentApproveItem(item);
    setSecondApproveDialog(true);
  }

  // Editibility 1 Starts
  function handleAllowEditSection1(item) {
    let allowEdit = false;
    if (Number(item?.stepNo) === 0) {
      allowEdit = true;
    }
    if (
      Number(item?.stepNo) === 1 &&
      (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
        Number(user[0]?.userId?.id) ===
          Number(
            singleReport?.resourceAllocation?.backupHeadOfInternalAudit?.id
          ) ||
        Number(user[0]?.userId?.id) ===
          Number(singleReport?.resourceAllocation?.proposedJobApprover?.id))
    ) {
      allowEdit = true;
    }

    return allowEdit;
  }

  // Editibility 1 Ends

  React.useEffect(() => {
    if (reportingAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetSingleReport(`?reportingAndFollowUpId=${Number(reportingId)}`)
        );
      }
      dispatch(resetReportingAddSuccess());
    }
  }, [reportingAddSuccess]);

  React.useEffect(() => {
    if (reportingFileUploadSuccess === true) {
      if (currentOpenItem && Object?.keys(currentOpenItem)?.length !== 0) {
        setTimeout(() => {
          dispatch(
            setupUpdateReporting(
              report?.reportingList?.find(
                (item) => Number(item?.id) === Number(currentOpenItem?.id)
              )
            )
          );
        }, 1500);
      }
      dispatch(resetReportingFileUploadAddSuccess());
    }
  }, [reportingFileUploadSuccess]);

  React.useEffect(() => {
    if (
      managementAuditeeReportingAddSuccess === true &&
      user[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee"
    ) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetInitialSingleReport(
            `?reportingAndFollowUpId=${Number(reportingId)}`
          )
        );
      }
      dispatch(resetManagementAuditeeReportingAddSuccess());
    }
  }, [managementAuditeeReportingAddSuccess]);

  React.useEffect(() => {
    const isEmptyObject =
      Object.keys(singleReport).length === 0 &&
      singleReport.constructor === Object;
    if (!isEmptyObject && reportingId) {
      if (user[0]?.userId?.employeeid?.userHierarchy !== "Management_Auditee") {
        setReport(singleReport);
      }
      if (user[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee") {
        setReport({
          ...singleReport,
          reportingList: singleReport?.reportingList?.filter(
            (all) => Number(all?.stepNo) >= 2
          ),
        });
      }
    }
  }, [singleReport]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetInitialSingleReport(
          `?reportingAndFollowUpId=${Number(reportingId)}`
        )
      );
      dispatch(setupGetAllUsers({ shareWith: true }));
    }
  }, [user, year, company]);

  React.useEffect(() => {
    if (!reportingId) {
      navigate("/audit/reportings");
    }
  }, [reportingId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-reporting"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));
    return () => {
      dispatch(resetReports());
    };
  }, []);

  return (
    <div>
      {firstApproveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <FirstApproveReportingDialog
              setFirstApproveDialog={setFirstApproveDialog}
              currentApproveItem={currentApproveItem}
            />
          </div>
        </div>
      )}
      {secondApproveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <SecondApproveReportingDialog
              setSecondApproveDialog={setSecondApproveDialog}
              currentApproveItem={currentApproveItem}
            />
          </div>
        </div>
      )}
      {feedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <FeedBackDialog
              setFeedBackDialog={setFeedBackDialog}
              currentReportingAndFollowUpId={currentReportingAndFollowUpId}
            />
          </div>
        </div>
      )}
      {viewFirstFeedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ViewFirstFeedBackDialog
              setViewFirstFeedBackDialog={setViewFirstFeedBackDialog}
              viewFeedBackItem={viewFeedBackItem}
            />
          </div>
        </div>
      )}
      {viewSecondFeedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ViewSecondFeedBackDialog
              setViewSecondFeedBackDialog={setViewSecondFeedBackDialog}
              viewFeedBackItem={viewFeedBackItem}
            />
          </div>
        </div>
      )}
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : singleReport[0]?.error === "Not Found" ? (
        "Reporting Not Found"
      ) : (
        <>
          <header className="section-header my-3 align-items-center  text-start d-flex ">
            <a
              className="text-primary"
              onClick={() =>
                user[0]?.userId?.employeeid?.userHierarchy ===
                "Management_Auditee"
                  ? navigate("/audit/dashboard")
                  : navigate("/audit/reportings")
              }
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Reporting</div>
          </header>
          <div className="row px-4">
            <div className="col-md-12">
              <hr />
              <div className="mb-0">{report?.title}</div>

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="accordion" id="accordionFlushExample">
                    {report?.reportingList?.length === 0
                      ? "No Reporting List Found"
                      : report?.reportingList?.map((item, index) => {
                          return (
                            <AccordianItem
                              key={index}
                              item={item}
                              handleChange={handleChange}
                              loading={loading}
                              allUsers={allUsers?.filter(
                                (singleUser) =>
                                  singleUser?.employeeid?.userHierarchy ===
                                  "Management_Auditee"
                              )}
                              singleReport={singleReport}
                              reportingId={reportingId}
                              setReport={setReport}
                              handleSaveToStep1={handleSaveToStep1}
                              handleSaveToStep2={handleSaveToStep2}
                              handleSaveStep2={handleSaveStep2}
                              handleSaveToStep3={handleSaveToStep3}
                              handleSaveToStep4={handleSaveToStep4}
                              handleObservationChange={handleObservationChange}
                              setCurrentReportingAndFollowUpId={
                                setCurrentReportingAndFollowUpId
                              }
                              setFeedBackDialog={setFeedBackDialog}
                              setCurrentOpenItem={setCurrentOpenItem}
                              handleAllowEditSection1={handleAllowEditSection1}
                              setViewFirstFeedBackDialog={
                                setViewFirstFeedBackDialog
                              }
                              setViewSecondFeedBackDialog={
                                setViewSecondFeedBackDialog
                              }
                              setViewFeedBackItem={setViewFeedBackItem}
                              handleSaveStep1={handleSaveStep1}
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
