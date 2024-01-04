import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import RickTextEditor from "../../../../common/rich-text/index";

const ComplianceCheckListCard = () => {
  let navigate = useNavigate();
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

            <div className="row mt-3 mb-4">
              <div className="col-lg-6">
                <label className="w-100">Add CheckList:</label>
                <input
                  className="form-control w-100"
                  placeholder="Enter"
                  type="text"
                />
              </div>
              <div className="col-lg-6 text-end float-end align-self-end">
                <div className="btn btn-labeled btn-primary px-3 shadow">
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="accordion" id="accordionFlushExample">
                  <i class="fa fa-trash text-danger f-18 flex flex-end w-full mb-2"></i>
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
                        Check List Item
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="p-3">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="table-responsive">
                                    <table className="table table-bordered table-hover rounded equal-columns">
                                      <thead>
                                        <tr>
                                          <th className="sr-col">Sr. #</th>
                                          <th>Area</th>
                                          <th>Subject</th>
                                          <th>Particulars</th>
                                          <th>Remarks</th>
                                          <th>Observation</th>
                                          <th>File attachment</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>1</td>
                                          <td>XYZ</td>
                                          <td>ABC</td>
                                          <td>
                                            <textarea
                                              className="form-control"
                                              placeholder="Enter Here"
                                              id="ds"
                                              rows="3"
                                            ></textarea>
                                          </td>
                                          <td>
                                            <select
                                              className="form-select mb-2 w-80"
                                              aria-label="Default select example"
                                            >
                                              <option selected>Yes</option>
                                              <option value="2">No</option>
                                              <option value="2">
                                                Not Applicable
                                              </option>
                                              <option value="2">
                                                Partially Complied
                                              </option>
                                            </select>
                                          </td>
                                          <td>
                                            <textarea
                                              className="form-control"
                                              placeholder="Enter Here"
                                              id="ds"
                                              rows="3"
                                            ></textarea>
                                          </td>
                                          <td>
                                            <div className="d-flex">
                                              <div className="w-75 d-grid">
                                                <a
                                                  href="#"
                                                  className="text-primary"
                                                >
                                                  Attached file Name 1
                                                </a>
                                                <a
                                                  href="#"
                                                  className="text-primary"
                                                >
                                                  Attached file Name 2
                                                </a>
                                              </div>
                                              <div className="w-25">
                                                <i className="fa fa-paperclip me-3 text-secondary f-18 cursor-pointer"></i>
                                                <i className="fa fa-eye text-primary f-18 cursor-pointer"></i>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
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

export default ComplianceCheckListCard;
