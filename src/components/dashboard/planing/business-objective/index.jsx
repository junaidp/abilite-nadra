import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import BusinessObjectiveModal from "../../../modals/add-engagement-audit-dialog/index";
import { showBusinessObjectiveDialog } from "../../../../global-redux/reducers/common/slice";

const BusinessObjective = () => {
  let { businessObjectiveDialog } = useSelector((state) => state.common);
  let dispatch = useDispatch();
  return (
    <div>
      {businessObjectiveDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <BusinessObjectiveModal />
          </div>
        </div>
      )}

      <div>
        <section className="faq-section ">
          <div data-aos="fade-up">
            <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Business Objective</div>
              <div className="">
                <div
                  className="btn btn-labeled btn-primary px-3 shadow"
                  onClick={() =>
                    dispatch(
                      showBusinessObjectiveDialog(!businessObjectiveDialog)
                    )
                  }
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus-circle"></i>
                  </span>
                  Add Engagement
                </div>
                <i
                  className="fa fa-info-circle ps-3 text-secondary cursor-pointer"                  title="Info"
                ></i>
              </div>
            </header>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="w-80">Sr No.</th>
                        <th>Engagement Name</th>
                        <th>Nature Through</th>
                        <th>Initiated By</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          loram ipsum is simply dummay text of the prinitng and
                          type settings industry
                        </td>
                        <td>Business Objective</td>
                        <td>AR</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          loram ipsum is simply dummay text of the prinitng and
                          type settings industry
                        </td>
                        <td>Business Objective</td>
                        <td>FP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BusinessObjective;
