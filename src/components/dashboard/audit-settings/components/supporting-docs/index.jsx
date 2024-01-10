import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const SupportingDocs = ({ excelData, setExcelData, handleFileUpload }) => {
  return (
    <div
      className="tab-pane fade active show"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Supporting Documents</div>
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-lg-12 text-center settings-form">
          <form>
            <input type="file" onChange={handleFileUpload} />
            <p className="mb-0">Drag your files here or click in this area.</p>
          </form>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12 text-end">
          <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
            <span className="btn-label me-2">
              <i className="fa fa-save"></i>
            </span>
            Submit
          </button>
        </div>
      </div>

      <div>
        {excelData && (
          <div>
            <LineChart width={700} height={400} data={excelData}>
              <XAxis dataKey={Object.keys(excelData[0])[1]} />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              {Object.keys(excelData[0]).map((item, i) => {
                return (
                  <Line type="monotone" dataKey={item} stroke={`#8884d${i}`} />
                );
              })}
            </LineChart>
          </div>
        )}
      </div>
      {excelData && (
        <div className="my-3">
          <div className="flex">
            <div>
              <i
                className="fa fa-trash text-danger f-18 px-3"
                onClick={() => setExcelData(null)}
              ></i>
            </div>
            <div className="row position-relative">
              <div className="col-lg-12 text-center settings-form h-0 border-none">
                <form>
                  <input type="file" onChange={handleFileUpload} />
                  <i class="bi bi-pencil-square f-18 cursor-pointer"></i>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="col-lg-6">
          <label className="w-100">Search File Name:</label>
          <input
            className="form-control w-100"
            placeholder="Enter"
            type="text"
          />
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered   rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr No.</th>
                  <th>File Name</th>
                  <th>File Location</th>
                  <th className="w-180">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>File Name here</td>
                  <td>File Location here</td>
                  <td>
                    <i className="fa-eye fa f-18"></i>

                    <i className="fa fa-trash text-danger f-18 px-3"></i>

                    <i className="fa fa-download f-18"></i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>File Name here</td>
                  <td>File Location here</td>
                  <td>
                    <i className="fa-eye fa f-18"></i>

                    <i className="fa fa-trash text-danger f-18 px-3"></i>

                    <i className="fa fa-download f-18"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportingDocs;
