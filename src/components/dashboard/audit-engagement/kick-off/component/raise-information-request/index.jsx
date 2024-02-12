import React from "react";
import MultipleSelect from "../select/Select";

const RaiseInformationRequest = () => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseThree"
          aria-expanded="false"
          aria-controls="flush-collapseThree"
        >
          Raise Information Request
        </button>
      </h2>
      <div
        id="flush-collapseThree"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-end">
                <button className="btn btn-labeled btn-primary px-3 mb-3 shadow">
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  Raise Request
                </button>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-lg-6">
                <div className="select-auditee">
                  <MultipleSelect />
                </div>
              </div>
              <div className="col-lg-6">
                <label className="w-100">Due Date</label>
                <input
                  className="form-control w-100"
                  placeholder="Select Date"
                  type="date"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <label>1. Add a Question</label>
                  <i className="fa fa-trash text-danger"></i>
                </div>
                <textarea
                  className="form-control"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 1500 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Required
                  </label>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center">
                  <label className="me-3 w-25">Get it in a form of:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Text</option>
                    <option value="2">Attachment</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <label>Your Response:</label>
                  <i className="fa fa-trash text-danger"></i>
                </div>
                <textarea
                  className="form-control"
                  placeholder="Enter Response"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 1500 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label me-3 mb-3"
                >
                  Attach files
                </label>

                <input type="file" id="file-upload" name="file-upload" />

                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="sr-col">Sr No.</th>
                        <th>Attach Files </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <a href="#">Loram File will be displayed here</a>
                        </td>

                        <td className="f-130">
                          <i className="fa fa-eye text-primary f-18"></i>
                          <i className="fa fa-edit mx-3 text-secondary f-18"></i>
                          <i className="fa fa-trash text-danger f-18"></i>
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
  );
};

export default RaiseInformationRequest;
