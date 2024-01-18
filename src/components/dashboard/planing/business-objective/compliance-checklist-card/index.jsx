import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { setupGetAllCheckLists } from "../../../../../global-redux/reducers/settings/check-list/slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  resetAddEngagementSuccess,
  setupGetSingleCheckListObjective,
  setupSaveCheckListObjective,
} from "../../../../../global-redux/reducers/planing/engagement/slice";

const ComplianceCheckListCard = () => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const { planingEngagementSingleObject, engagementAddSuccess } = useSelector(
    (state) => state.planingEngagements
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const { checkList } = useSelector((state) => state.setttingsCheckList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setupGetSingleCheckListObjective(engagementId));
  }, [engagementId]);

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetSingleCheckListObjective(engagementId));
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    let email = user[0]?.email;
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    if (email && companyId) {
      dispatch(
        setupGetAllCheckLists(`?userEmailId=${email}&companyId=${companyId}`)
      );
    }
  }, [user]);

  function handleChange(event, id) {
    dispatch(
      setupSaveCheckListObjective({
        ...planingEngagementSingleObject,
        checklist_id: id,
      })
    );
  }

  return (
    <div>
      <div>
        <section className="faq-section">
          <div className="container" data-aos="fade-up">
            <header className="section-header my-3 align-items-center  text-start d-flex ">
              <a
                className="text-primary"
                onClick={() => navigate("/audit/business-objective")}
              >
                <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
              </a>
              <h3 className="mb-0 fw-bold">Compliance Check List</h3>
            </header>
          </div>
          <div>
            {checkList?.map((item) => {
              return (
                <div className="p-2 flex border bg-light ckecklist-item-wrap">
                  <div className="col-lg-6">
                    <p>{item?.description}</p>
                  </div>
                  <div class="form-check cursor-pointer">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      value=""
                      onChange={(e) => handleChange(e, item?.id)}
                    />
                    <label
                      class="form-check-label"
                      for="flexCheckDefault"
                    ></label>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComplianceCheckListCard;
