import React from "react";
import InformationRequestDialog from "../../../components/modals/raise-request-information-dialog";

const InformationRequest = () => {
  const [showInformationRequestDialog, setShowInformationRequestDialog] =
    React.useState(false);
  return (
    <div>
      {showInformationRequestDialog && (
        <div className="dashboard-modal ">
          <div className="model-wrap ">
            <InformationRequestDialog
              setShowInformationRequestDialog={setShowInformationRequestDialog}
            />
          </div>
        </div>
      )}
      <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Information Request</div>
        <div className="">
          <div
            className="btn btn-labeled btn-primary px-3 shadow "
            onClick={() => setShowInformationRequestDialog(true)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus-circle"></i>
            </span>
            Raise Request
          </div>
        </div>
      </header>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered table-hover rounded equal-columns">
              <thead>
                <tr>
                  <th className="sr-col">Sr. #</th>
                  <th>Particulars</th>
                  <th>Due Date</th>
                  <th>Job Name</th>
                  <th>Assignee</th>
                  <th>Assigned by</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td>mm/dd/yyyy</td>
                  <td>Lorem Ipsum is simply ………</td>
                  <td>ABCDEF</td>
                  <td>ABCDEF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationRequest;
