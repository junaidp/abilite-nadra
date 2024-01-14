import React from "react";
import "./index.css";
import Pagination from "../../../common/pagination/Pagination";
import AuditableUnitRatingDialog from "../../../modals/auditable-unit-rating-dialog/index";

const AuditableUnits = () => {
  const [auditableUnitRatingDialog, setAuditableUnitRatingDialog] =
    React.useState(false);
  const data = [
    {
      no: "1",
      objective:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      rating: "53",
    },
  ];
  return (
    <div>
      {auditableUnitRatingDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <AuditableUnitRatingDialog
              setAuditableUnitRatingDialog={setAuditableUnitRatingDialog}
            />
          </div>
        </div>
      )}
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
              <h3 className="mb-0 fw-bold">Auditable Units</h3>
            </header>

            <div className="row">
              <div className="col-md-12">
                <div className="accordion" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                      >
                        1st Autitable Unit
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="w-80">Sr. #</th>
                                <th>Business Objective</th>
                                <th>Risk Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.map((item, index) => {
                                return (
                                  <tr className="h-40" key={index}>
                                    <td>{item?.no}</td>
                                    <td
                                      onClick={() =>
                                        setAuditableUnitRatingDialog(true)
                                      }
                                      className="cursor-pointer"
                                    >
                                      {item?.objective}
                                    </td>
                                    <td>{item?.rating}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed br-8"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFive"
                        aria-expanded="false"
                        aria-controls="flush-collapseFive"
                      >
                        2nd Autitable Unit
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="w-80">Sr. #</th>
                                <th>Business Objective</th>
                                <th>Risk Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.map((item, index) => {
                                return (
                                  <tr className="h-40" key={index}>
                                    <td>{item?.no}</td>
                                    <td
                                      onClick={() =>
                                        setAuditableUnitRatingDialog(true)
                                      }
                                      className="cursor-pointer"
                                    >
                                      {item?.objective}
                                    </td>
                                    <td>{item?.rating}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuditableUnits;
