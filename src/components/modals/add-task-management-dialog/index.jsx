import React from "react";

const AddTaskManagementDialog = ({setShowAddTaskManagementDialog}) => {
  return (
    <div className="add-task-management-dialog p-4">
      <div className="mx-3">
        <header className="section-header my-3   text-start d-flex align-items-center justify-content-between">
          <div className="mb-0 heading d-flex align-items-center">
            <h2 className="mx-2 m-2 heading">Add Task Management</h2>
          </div>

          <div className="w-350">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </header>

        <div className="row mb-3">
          <div className="col-lg-6">
            <label className="me-3">Select Job</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>loram</option>
              <option value="2">loram</option>
              <option value="3">loram</option>
            </select>
          </div>
          <div className="col-lg-6">
            <label className="me-3">Select Assignee</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>loram</option>
              <option value="2">loram</option>
              <option value="3">loram</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Detailed Requirement:</label>
            <textarea
              className="form-control"
              placeholder="Enter Detailed Requirement"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 400 words
            </label>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Comments:</label>

            <p className="mb-2">
              <span className="fw-bolder">XYZ:</span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <p className="mb-2">
              <span className="fw-bolder">XYZ:</span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <p className="mb-2">
              <span className="fw-bolder">XYZ:</span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Your Response:</label>
            <textarea
              className="form-control"
              placeholder="Enter Your Response"
              id="exampleFormControlTextar"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 400 words
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <label className="form-label me-3 mb-3">Attach files</label>

            <input className="f-10" type="file" id="fileInpu" />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="sr-col">Sr No.</th>
                    <th>Name of File</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <a href="#">File Name here</a>
                    </td>

                    <td className="w-130">
                      <i className="fa fa-eye text-primary f-18"></i>
                      <i className="fa fa-edit mx-3 text-secondary f-18"></i>
                      <i className="fa fa-trash text-danger f-18"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <a href="#">File Name here</a>
                    </td>

                    <td className="w-130">
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

        <div className="row mb-2">
          <div className="col-lg-4">
            <label className="me-3">Status</label>
            <select
              className="form-select w-100"
              aria-label="Default select example"
            >
              <option selected>Complete</option>
              <option value="2">Incomplete</option>
            </select>
          </div>

          <div className="col-lg-8 align-self-end" onClick={()=>setShowAddTaskManagementDialog(false)}>
            <button  className="btn btn-primary float-end">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskManagementDialog;
