import React from "react";
import { useNavigate } from "react-router-dom";
import {
  resetAddEngagementSuccess,
  setupGetSingleEngagementObject,
  setupSaveMapProcessBusinessObjective,
  handleCleanUp,
  setupGetInitialSingleEngagementObject,
  setupGetIndustryAndCompanyUpdates,
  setupSaveIndustryAndCompanyUpdates,
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import {
  setupGetFinancialQuantifiableYesForEngagement,
  setupGetFinancialQuantifiableNoForEngagement,
} from "../../../../../global-redux/reducers/settings/business-objective/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import IndustryUpdates from "./components/industry-updates";
import CompanyUpdates from "./components/company-updates";
import BusinessObjectiveMapProcess from "./components/business-objective-map-process";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import SubmitDialog from "./submit-dialog";

const BusinessObjectiveRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const {
    planingEngagementSingleObject,
    engagementAddSuccess,
    loading,
    initialLoading,
    companyAndIndustryUpdates,
    companyAndIndustryUpdateAddSuccess,
  } = useSelector((state) => state.planningEngagement);
  const [domain, setDomain] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [object, setObject] = React.useState({
    industryUpdates: "",
    companyUpdates: "",
  });
  const [values, setValues] = React.useState({
    enterpriseValue: "",
    companyProfitability: "",
    companyRevenue: "",
    impactOnBrand: "",
    impactOnPeople: "",
  });

  function handleChange(event) {
    setObject((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleUpdateBusinessObjective() {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      dispatch(
        setupSaveIndustryAndCompanyUpdates({ ...object, companyId: companyId })
      );
    }
  }

  function handleSaveBusinessObjectiveMapProcess() {
    if (!loading) {
      if (!description || description === "" || domain === "" || !domain) {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupSaveMapProcessBusinessObjective({
            ...values,
            businessObjective: planingEngagementSingleObject,
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
    if (companyAndIndustryUpdates) {
      setObject({
        industryUpdates: companyAndIndustryUpdates?.industryUpdates,
        companyUpdates: companyAndIndustryUpdates?.companyUpdates,
      });
    }
  }, [companyAndIndustryUpdates]);

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
    if (companyAndIndustryUpdateAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetIndustryAndCompanyUpdates({ companyId }));
    }
  }, [companyAndIndustryUpdateAddSuccess]);

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetSingleEngagementObject(engagementId));
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    if (user[0]?.token && engagementId) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      dispatch(setupGetInitialSingleEngagementObject(engagementId));
      setTimeout(() => {
        dispatch(setupGetIndustryAndCompanyUpdates({ companyId }));
      }, 900);
      setTimeout(() => {
        dispatch(
          setupGetFinancialQuantifiableYesForEngagement({ engagementId })
        );
      }, 900);
      setTimeout(() => {
        dispatch(
          setupGetFinancialQuantifiableNoForEngagement({ engagementId })
        );
      }, 900);
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
            <div className="mb-0 heading">Business Objectives</div>
          </header>

          <div className="row px-4">
            <div className="col-md-12">
              <div className="accordion" id="accordionFlushExample">
                <IndustryUpdates
                  handleUpdateBusinessObjective={handleUpdateBusinessObjective}
                  handleChange={handleChange}
                  object={object}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                  loading={loading}
                />
                <CompanyUpdates
                  handleUpdateBusinessObjective={handleUpdateBusinessObjective}
                  handleChange={handleChange}
                  object={object}
                  planingEngagementSingleObject={planingEngagementSingleObject}
                  loading={loading}
                />

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
                  engagementId={engagementId}
                />
              </div>

              {planingEngagementSingleObject?.complete === false &&
                planingEngagementSingleObject?.businessObjectiveAndMapProcessList &&
                planingEngagementSingleObject
                  ?.businessObjectiveAndMapProcessList?.length > 0 && (
                  <button
                    className={`btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow mx-4 float-end`}
                    onClick={() => setShowSubmitDialog(true)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    Submit
                  </button>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessObjectiveRedirect;
