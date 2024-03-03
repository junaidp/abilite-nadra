import React from "react";
import Select from "../select/Select";

const AccordianItem = ({
  mainIndex,
  item,
  handleChange,
  loading,
  allUsers,
  setReports,
  handleSave,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${item?.id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${item?.id}`}
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {item?.observationTitle}
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`flush-collapse${item?.id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <p>
            <label className="label-text f-14">{item?.observationName}</label>
          </p>

          <div className="d-flex mb-3">
            <label className="pe-4">Location:</label>
            <label className="fw-normal">
              {item?.subLocation?.locationid?.description}
            </label>
          </div>
          <div className="row mb-3">
            <div className="col-lg-6">
              <label>Observation Title:</label>
              <input
                className="form-control w-100"
                placeholder="Enter Observation Title here"
                type="text"
                value={item?.observationTitle}
                name="observationTitle"
                onChange={(event) => handleChange(event, mainIndex, item?.id)}
              />
            </div>
          </div>

          <label>Observation:</label>
          <textarea
            className="form-control "
            placeholder="Enter Reason"
            id="exampleFor"
            rows="3"
            value={item?.observationName}
            name="observationName"
            onChange={(event) => handleChange(event, mainIndex, item?.id)}
          ></textarea>
          <label className="word-limit-info label-text mb-3">
            Maximum 1500 words
          </label>

          <div className="d-flex mb-3 align-items-center">
            <label className="pe-4">Implication Rating:</label>
            <select
              className="form-select mb-2 w-150"
              aria-label="Default select example"
              value={item?.implicationRating}
              name="implicationRating"
              onChange={(event) => handleChange(event, mainIndex, item?.id)}
            >
              <option value="">Select One</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>

          <br />

          <label>Implication:</label>
          <textarea
            className="form-control "
            placeholder="Enter Reason"
            id="exampleFormControlTextarea1"
            rows="3"
            value={item?.implication || ""}
            name="implication"
            onChange={(event) => handleChange(event, mainIndex, item?.id)}
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
            value={item?.recommendedActionStep || ""}
            name="recommendedActionStep"
            onChange={(event) => handleChange(event, mainIndex, item?.id)}
          ></textarea>
          <label className="word-limit-info label-text mb-3">
            Maximum 1500 words
          </label>
          <br />

          <div className="col-lg-12 mb-4">
            <Select
              label="Auditee"
              value={item?.auditee?.name || ""}
              setReports={setReports}
              list={allUsers?.map((all) => all?.name)}
              id={item?.id}
              allUsers={allUsers}
              mainIndex={mainIndex}
            />
          </div>
          <label htmlFor="fileInput">Add Attachment:</label>
          <input className="ms-3 f-10" type="file" id="fileInput" />
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
                    <a className=" text-primary  fw-bold f-12">
                      File Attachment 1
                    </a>
                  </td>
                  <td>
                    <i className="fa fa-eye"></i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a className=" text-primary  fw-bold f-12">
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
            <div className="col-lg-12 text-end ">
              <div className="d-flex align-items-center place-end">
                <button
                  className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                    loading && "disabled"
                  }`}
                  onClick={() => handleSave(item)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check"></i>
                  </span>
                  {loading ? "Loading..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianItem;
