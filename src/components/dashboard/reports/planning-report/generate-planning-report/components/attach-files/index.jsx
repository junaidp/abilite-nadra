import React from "react";

const AttachFiles = () => {
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label me-3 mb-3"
        >
          Annexure
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
  );
};

export default AttachFiles;
