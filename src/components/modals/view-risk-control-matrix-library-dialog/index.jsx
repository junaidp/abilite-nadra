import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllRiskControlMatrix,
  handleReset,
} from "../../../global-redux/reducers/settings/risk-control-matrix/slice";
import { CircularProgress } from "@mui/material";
import AccordionItem from "./components/AccordionItem";

const ViewRiskControlMatrixLibraryDialog = ({
  setShowViewLibrary,
  currentAuditEngagement,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const { allRCM, loading } = useSelector(
    (state) => state?.settingsRiskControlMatrix
  );
  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (
      companyId &&
      currentAuditEngagement?.process?.id &&
      currentAuditEngagement?.subProcess?.id
    ) {
      dispatch(
        setupGetAllRiskControlMatrix(
          `?company_id=${Number(companyId)}&process_id=${Number(
            currentAuditEngagement?.process?.id
          )}&subProcess_id=${Number(currentAuditEngagement?.subProcess?.id)}`
        )
      );
    }
  }, [currentAuditEngagement]);

  return (
    <div className="mx-5">
      <header className="section-header mt-3  px-4  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="mx-2 m-2 heading">Control Risk Matrix Library</h2>
        </div>
      </header>
      {loading ? (
        <CircularProgress />
      ) : allRCM?.length === 0 || allRCM[0]?.error === "Not Found" ? (
        "No Risk Control Matrix To Show"
      ) : (
        <div className="row mt-4">
          <div className="col-lg-12">
            {allRCM
              ?.filter(
                (singleRCM) => singleRCM?.rcmLibraryObjectives?.length !== 0
              )
              ?.map((item, index) => {
                return <AccordionItem key={index} item={item} />;
              })}
          </div>
        </div>
      )}

      <div className="row py-4 px-4">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => {
              dispatch(handleReset());
              setShowViewLibrary(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRiskControlMatrixLibraryDialog;
