import React from "react";
import UpdateTaskDialog from "./update-task-dialog/index";
import { useSelector, useDispatch } from "react-redux";
import {
  resetTaskAddSuccess,
  setupGetAllTasks,
} from "../../../../global-redux/reducers/tasks-management/slice";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ViewTaskManagement from "./view-task-dialog";
import moment from "moment";

const TaskManagement = () => {
  const dispatch = useDispatch();
  const [showUpdateTaskDialog, setShowUpdateTaskDailog] = React.useState(false);
  const [showViewTaskDialog, setShowViewTasktDialog] = React.useState(false);
  const { taskAddSuccess, allTasks, initialLoading } = useSelector(
    (state) => state?.tasksManagement
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const [updateTaskId, setUpdateTaskId] = React.useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllTasks({ companyId: companyId, isTask: true }));
    }
  }, [user, company]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId && taskAddSuccess === true) {
      dispatch(setupGetAllTasks({ companyId: companyId, isTask: true }));
      dispatch(resetTaskAddSuccess());
    }
  }, [taskAddSuccess]);

  return (
    <div>
      {showUpdateTaskDialog && (
        <div className="dashboard-modal ">
          <div className="model-wrap ">
            <UpdateTaskDialog
              setShowUpdateTaskDailog={setShowUpdateTaskDailog}
              updateTaskId={updateTaskId}
            />
          </div>
        </div>
      )}
      {showViewTaskDialog && (
        <div className="dashboard-modal ">
          <div className="model-wrap ">
            <ViewTaskManagement
              setShowViewTasktDialog={setShowViewTasktDialog}
              updateTaskId={updateTaskId}
            />
          </div>
        </div>
      )}
      <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Task Management</div>
      </header>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered table-hover rounded equal-columns">
              <thead>
                <tr>
                  <th className="sr-col">Sr. #</th>
                  <th>Requirement</th>
                  <th>Due Date</th>
                  <th>Job Name</th>
                  <th>Assignee</th>
                  <th>Assigned by</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialLoading ? (
                  <tr>
                    <td>
                      <CircularProgress />
                    </td>
                  </tr>
                ) : allTasks?.length === 0 ? (
                  <tr>
                    <td className="w-300">No data available!</td>
                  </tr>
                ) : (
                  allTasks
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((task, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{task?.detailedRequirement}</td>
                          <td>
                            {moment.utc(task?.dueDate).format("DD-MM-YY")}
                          </td>
                          <td>{task?.auditEngagement?.title}</td>
                          <td>{task?.assignee?.name}</td>
                          <td>{task?.assignedBy?.name}</td>
                          <td>
                            <i
                              className="fa fa-edit mx-3 text-secondary f-18 cursor-pointer mx-2"
                              onClick={() => {
                                setUpdateTaskId(task?.id);
                                setShowUpdateTaskDailog(true);
                              }}
                            ></i>
                            <i
                              className="fa-eye fa f-18 cursor-pointer mx-2"
                              onClick={() => {
                                setUpdateTaskId(task?.id);
                                setShowViewTasktDialog(true);
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(allTasks?.length / 10)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
