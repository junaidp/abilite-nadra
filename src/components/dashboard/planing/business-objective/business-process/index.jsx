import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const BusinessProcess = () => {
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
              <h3 className="mb-0 fw-bold">Business Process</h3>
            </header>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Select Process</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>List of Department</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label>Select Sub Process</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>List of Department</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <h6 className="fw-bold">Risk Assessment</h6>

                <div className="card border  px-3 py-3">
                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label className="w-100">Define Risk Factor</label>
                      <input
                        className="form-control w-100"
                        placeholder="Enter"
                        type="text"
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="w-100">Define Basis/Comments</label>
                      <input
                        className="form-control w-100"
                        placeholder="Enter"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label>Impact Rating</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>Select</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label>Probability</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>Select</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-lg-12">
                      <button
                        className="btn btn-labeled btn-primary px-3 shadow"
                        type="button"
                      >
                        <span className="btn-label me-2">
                          <i className="fa fa-plus-circle"></i>
                        </span>
                        Add New Risk Assessment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                        Set Meeting Time
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="row mb-3">
                          <div className="col-lg-6">
                            <label>Select Department</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option>List of Department</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <div className="col-lg-6">
                            <label className="w-100">Meeting Date</label>
                            <input
                              className="form-control w-100"
                              placeholder="Select Date"
                              type="date"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <label className="w-100">From</label>
                            <input
                              className="form-control w-100"
                              placeholder="Select Date"
                              type="time"
                            />
                          </div>
                          <div className="col-lg-6">
                            <label className="w-100">To</label>
                            <input
                              className="form-control w-100"
                              placeholder="Select Date"
                              type="time"
                            />
                          </div>
                        </div>

                        <button className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow">
                          <span className="btn-label me-2">
                            <i className="fa fa-check-circle"></i>
                          </span>
                          Save
                        </button>
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
                        Document Minutes of Meeting
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Rich text field to document the meeting of minutes
                          </label>
                          <textarea
                            className="form-control"
                            placeholder="Enter Here"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                          <p className="word-limit-info mb-0">
                            Maximum 1500 words
                          </p>

                          <button className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow">
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle"></i>
                            </span>
                            Save
                          </button>
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

export default BusinessProcess;
