import React from "react";
import AddTaskManagementDialog from "../../modals/add-task-management-dialog";
import StatusTaskManagementDialog from "../../modals/status-task-management-dialog";

const TaskManagement = () => {
  const [showAddTaskManagementDialog, setShowAddTaskManagementDialog] =
    React.useState(false);
  const [showStatusTaskManagementDialog, setShowStatusTaskManagementDialog] =
    React.useState(false);
  return (
    <div>
      {showAddTaskManagementDialog && (
        <div className="dashboard-modal ">
          <div className="model-wrap ">
            <AddTaskManagementDialog
              setShowAddTaskManagementDialog={setShowAddTaskManagementDialog}
            />
          </div>
        </div>
      )}
      {showStatusTaskManagementDialog && (
        <div className="dashboard-modal ">
          <div className="model-wrap ">
            <StatusTaskManagementDialog
              setShowStatusTaskManagementDialog={
                setShowStatusTaskManagementDialog
              }
            />
          </div>
        </div>
      )}

      <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Task Management</div>
        <div className="">
          <a
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => setShowAddTaskManagementDialog(true)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus-circle"></i>
            </span>
            Add Task
          </a>
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
                  <th>Status</th>
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
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowStatusTaskManagementDialog(true)}
                    >
                      Complete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td>mm/dd/yyyy</td>
                  <td>Lorem Ipsum is simply ………</td>
                  <td>ABCDEF</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => setShowStatusTaskManagementDialog(true)}
                    >
                      In-Complete
                    </button>
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

export default TaskManagement;
