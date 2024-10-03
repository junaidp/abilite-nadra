import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  resetAddEngagementSuccess,
  setupGetSingleSpecialProjectAuditObjective,
  handleCleanUp,
  setupGetInitialSingleSpecialProjectAuditObjective,
  setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit,
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import BusinessObjectiveMapProcess from "./components/business-objective-map-process";
import { CircularProgress } from "@mui/material";
import SubmitDialog from "./submit-dialog";

const SpecialProjectAudit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const {
    planingEngagementSingleObject,
    engagementAddSuccess,
    loading,
    initialLoading,
  } = useSelector((state) => state.planningEngagement);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [domain, setDomain] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleSaveBusinessObjectiveMapProcess() {
    if (!loading) {
      if (!description || description === "" || domain === "" || !domain) {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit({
            specialProjectOrAudit: planingEngagementSingleObject,
            description,
            domain,
            id:
              planingEngagementSingleObject?.businessObjectiveAndMapProcessList &&
              planingEngagementSingleObject?.businessObjectiveAndMapProcessList
                ?.length !== 0
                ? planingEngagementSingleObject
                    ?.businessObjectiveAndMapProcessList[0]?.id
                : 0,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (planingEngagementSingleObject?.businessObjectiveAndMapProcessList) {
      setDomain(
        planingEngagementSingleObject?.businessObjectiveAndMapProcessList[0]
          ?.domain
      );
      setDescription(
        planingEngagementSingleObject?.businessObjectiveAndMapProcessList[0]
          ?.description
      );
    }
  }, [planingEngagementSingleObject]);

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetSingleSpecialProjectAuditObjective(engagementId));
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    if (user[0]?.token && engagementId) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetInitialSingleSpecialProjectAuditObjective(engagementId)
        );
      }
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!engagementId) {
      navigate("/audit/business-objective");
    }
  }, [engagementId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-business-objective"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
      {showSubmitDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <SubmitDialog
              object={planingEngagementSingleObject}
              setShowSubmitDialog={setShowSubmitDialog}
            />
          </div>
        </div>
      )}
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : planingEngagementSingleObject[0]?.error === "Not Found" ? (
        "Engagement Not Found"
      ) : (
        <>
          <header className="section-header my-3 align-items-center  text-start d-flex ">
            <a
              className="text-primary"
              onClick={() => navigate("/audit/business-objective")}
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Special Project/Audit</div>
          </header>

          <div className="px-4">
            <div className="col-md-12">
              <div className="accordion" id="accordionFlushExample">
                <BusinessObjectiveMapProcess
                  handleSaveBusinessObjectiveMapProcess={
                    handleSaveBusinessObjectiveMapProcess
                  }
                  loading={loading}
                  domain={domain}
                  description={description}
                  setDomain={setDomain}
                  setDescription={setDescription}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                />
              </div>
            </div>
            {planingEngagementSingleObject?.complete === false &&
              planingEngagementSingleObject?.businessObjectiveAndMapProcessList &&
              planingEngagementSingleObject?.businessObjectiveAndMapProcessList
                ?.length > 0 && (
                <button
                  className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow mx-4 float-end ${
                    loading && "disabled"
                  }`}
                  onClick={() => setShowSubmitDialog(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  Submit
                </button>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default SpecialProjectAudit;
