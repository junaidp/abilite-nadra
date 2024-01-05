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
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Auditable Units</div>
      </header>

      <div className="row">
        <div className="col-lg-12">
          <div className="example-header">
            <div className="mb-2 w-100">
              <input
                placeholder="Filter"
                id="inputField"
                className="input-border-bottom"
              />
            </div>
          </div>
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
                        onClick={() => setAuditableUnitRatingDialog(true)}
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
        <Pagination />
      </div>
    </div>
  );
};

export default AuditableUnits;
