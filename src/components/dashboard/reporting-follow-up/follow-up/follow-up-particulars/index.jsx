import React from "react";
import { useNavigate } from "react-router-dom";

const FollowUpParticulars = () => {
  let navigate = useNavigate();
  return (
    <div>
      <header className="section-header my-3 align-items-center  text-start d-flex ">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/reportings")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        <div className="mb-0 heading">Reporting & Follow-Up</div>
      </header>

      <div className="mt-4">
        <select
          className="form-select mb-4"
          aria-label="Default select example"
        >
          <option>Recomendations Implemented</option>
          <option value="2">Yes</option>
          <option value="2">No</option>
        </select>
        <select
          className="form-select mb-4"
          aria-label="Default select example"
        >
          <option>Test In Next Year</option>
          <option value="2">Yes</option>
          <option value="2">No</option>
        </select>

        <textarea
          type="text"
          id="fname"
          className="form-control mb-4"
          name="fname"
          placeholder="Add detail here"
          required="required"
          style={{ height: "200px" }}
        ></textarea>
        <div className="row py-3">
          <div className="col-lg-12 text-end">
            <button
              className="btn btn-primary float-end"
              onClick={() => setGeneratePlaningReportDialog(false)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* <div className="row px-4">
        <div className="col-md-12">
          <div className="sub-heading ps-2 mb-3 fw-bold">
            1. Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="accordion" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingeight">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                        <div className=" d-flex align-items-center">
                          Observation No. 1
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        <label
                          className="label-text f-14"
                        >
                          Observation No. 1
                        </label>
                      </p>

                      <div className="d-flex mb-3">
                        <label className="pe-4">Location:</label>
                        <label className="fw-normal">
                          Division/Department to be shown here
                        </label>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>Observation Title:</label>
                          <input
                            className="form-control w-100"
                            placeholder="Enter Observation Title here"
                            type="text"
                          />
                        </div>
                      </div>

                      <label>Observation:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFor"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4">Implication Rating:</label>
                        <select
                          className="form-select mb-2 w-150"
                          aria-label="Default select example"
                        >
                          <option>high</option>
                          <option value="2">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </div>

                      <br />

                      <label>Implication:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>
                      <br />

                      <label>Recommended Action Step:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>
                      <br />

                      <label>Management Comments:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4 w-250">
                          Implementation Date:
                        </label>
                        <input
                          type="date"
                          className="form-control w-150"
                          id="exampleFormControlInput1"
                          placeholder="DD/MM/YYYY"
                        />
                      </div>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4 w-250">
                          Auditee:
                        </label>
                        <select
                          className="form-select mb-2 w-150"
                          aria-label="Default select example"
                        >
                          <option>high</option>
                          <option value="2">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </div>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4 w-250">
                          Recommendations Implemented:
                        </label>
                        <select
                          className="form-select mb-2 w-150"
                          aria-label="Default select example"
                        >
                          <option>high</option>
                          <option value="2">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </div>

                      <label>Final Comments:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>
                      <br />
                      <label htmlFor="fileInput">Add Attachment:</label>
                      <input
                        className="ms-3 f-10"
                        type="file"
                        id="fileInput"
                      />
                      <div className="table-responsive mt-3">
                        <table className="table table-bordered  table-hover rounded">
                          <thead className="bg-secondary text-white">
                            <tr>
                              <th>Files</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  className=" text-primary  fw-bold f-12"
                                >
                                  File Attachment 1
                                </a>
                              </td>
                              <td>
                                <i className="fa fa-eye"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a
                                  className=" text-primary  fw-bold f-12"
                                >
                                  File Attachment 2
                                </a>
                              </td>
                              <td>
                                <i className="fa fa-eye"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="d-flex mb-3 align-items-center">
                            <label className="pe-4 w-250">
                              Recommendations Implemented:
                            </label>
                            <select
                              className="form-select mb-2 w-150"
                              aria-label="Default select example"
                            >
                              <option>high</option>
                              <option value="2">Medium</option>
                              <option value="2">Low</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingeightt">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                        <div className=" d-flex align-items-center">
                          Observation No. 2
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>
                        <label
                          className="label-text f-14"
                        >
                          Observation No. 1
                        </label>
                      </p>

                      <div className="d-flex mb-3">
                        <label className="pe-4">Location:</label>
                        <label className="fw-normal">
                          Division/Department to be shown here
                        </label>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label>Observation Title:</label>
                          <input
                            className="form-control w-100"
                            placeholder="Enter Observation Title here"
                            type="text"
                          />
                        </div>
                      </div>

                      <label>Observation:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFor"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4">Implication Rating:</label>
                        <select
                          className="form-select mb-2 w-150"
                          aria-label="Default select example"
                        >
                          <option>high</option>
                          <option value="2">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </div>

                      <br />

                      <label>Implication:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>
                      <br />

                      <label>Recommended Action Step:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>
                      <br />

                      <label>Management Comments:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4 w-250">
                          Implementation Date:
                        </label>
                        <input
                          type="date"
                          className="form-control w-150"
                          id="exampleFormControlInput1"
                          placeholder="DD/MM/YYYY"
                        />
                      </div>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4 w-250">
                          Auditee:
                        </label>
                        <select
                          className="form-select mb-2 w-150"
                          aria-label="Default select example"
                        >
                          <option>high</option>
                          <option value="2">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </div>

                      <div className="d-flex mb-3 align-items-center">
                        <label className="pe-4 w-250">
                          Recommendations Implemented:
                        </label>
                        <select
                          className="form-select mb-2 w-150"
                          aria-label="Default select example"
                        >
                          <option>high</option>
                          <option value="2">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </div>

                      <label>Final Comments:</label>
                      <textarea
                        className="form-control "
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text mb-3">
                        Maximum 1500 words
                      </label>
                      <br />
                      <label htmlFor="fileInput">Add Attachment:</label>
                      <input
                        className="ms-3 f-10"
                        type="file"
                        id="fileInput"
                      />
                      <div className="table-responsive mt-3">
                        <table className="table table-bordered  table-hover rounded">
                          <thead className="bg-secondary text-white">
                            <tr>
                              <th>Files</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  className=" text-primary  fw-bold f-12"
                                >
                                  File Attachment 1
                                </a>
                              </td>
                              <td>
                                <i className="fa fa-eye"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a
                                  className=" text-primary  fw-bold f-12"
                                >
                                  File Attachment 2
                                </a>
                              </td>
                              <td>
                                <i className="fa fa-eye"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="d-flex mb-3 align-items-center">
                            <label className="pe-4 w-250">
                              Recommendations Implemented:
                            </label>
                            <select
                              className="form-select mb-2 w-150"
                              aria-label="Default select example"
                            >
                              <option>high</option>
                              <option value="2">Medium</option>
                              <option value="2">Low</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 text-end ">
              <div
                className="d-flex align-items-center"
                style={{ placeContent: "end" }}
              >
                <a
                  href="#"
                  className="underline text-primary pt-3 me-4 label-text underline"
                >
                  Feedback
                </a>
                <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                  <span className="btn-label me-2">
                    <i className="fa fa-check"></i>
                  </span>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FollowUpParticulars;
