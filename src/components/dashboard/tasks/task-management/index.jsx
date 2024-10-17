import React from "react";
import UpdateTaskDialog from "./update-task-dialog/index";
import { useSelector, useDispatch } from "react-redux";
import {
  resetTaskAddSuccess,
  setupGetAllTasks,
  resetFileUploadSuccess,
} from "../../../../global-redux/reducers/tasks-management/slice";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ViewTaskManagement from "./view-task-dialog";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TaskManagement = () => {
  const dispatch = useDispatch();
  const [showUpdateTaskDialog, setShowUpdateTaskDailog] = React.useState(false);
  const [showViewTaskDialog, setShowViewTasktDialog] = React.useState(false);
  const {
    taskAddSuccess,
    allTasks,
    initialLoading,
    totalNoOfRecords,
    fileUploadSuccess,
  } = useSelector((state) => state?.tasksManagement);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [updateTaskId, setUpdateTaskId] = React.useState("");

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllTasks({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
          isTask: true,
        })
      );
    }
  }

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId && taskAddSuccess === true) {
      setPage(1);
      setItemsPerPage(10);
      dispatch(
        setupGetAllTasks({
          companyId,
          page: 1,
          itemsPerPage: 10,
          isTask: true,
        })
      );
      dispatch(resetTaskAddSuccess());
    }
  }, [taskAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllTasks({
          companyId,
          page,
          itemsPerPage,
          isTask: true,
        })
      );
    }
  }, [dispatch, page]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId && fileUploadSuccess === true) {
      dispatch(
        setupGetAllTasks({
          companyId,
          page,
          itemsPerPage,
          isTask: true,
        })
      );
      dispatch(resetFileUploadSuccess());
    }
  }, [fileUploadSuccess]);

  return (
    <div>
      {showUpdateTaskDialog && (
        <div className="model-parent">
          <div className="model-wrap ">
            <UpdateTaskDialog
              setShowUpdateTaskDailog={setShowUpdateTaskDailog}
              updateTaskId={updateTaskId}
            />
          </div>
        </div>
      )}
      {showViewTaskDialog && (
        <div className="model-parent">
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
                    <td className="w-300">No Tasks Management To Show.</td>
                  </tr>
                ) : (
                  allTasks?.map((task, index) => {
                    return (
                      <tr key={index}>
                        <td>{(page - 1) * itemsPerPage + index + 1}</td>
                        <td>{task?.detailedRequirement}</td>
                        <td>{moment.utc(task?.dueDate).format("DD-MM-YY")}</td>
                        <td>{task?.aeTitle || ""}</td>
                        <td>{task?.assignee?.name}</td>
                        <td>{task?.assignedBy?.name}</td>
                        <td className="d-flex flex-wrap gap-4">
                          <i
                            className="fa fa-edit text-secondary f-18 cursor-pointer"
                            onClick={() => {
                              setUpdateTaskId(task?.id);
                              setShowUpdateTaskDailog(true);
                            }}
                          ></i>
                          <i
                            className="fa-eye fa f-18 cursor-pointer"
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
          </div>
          {allTasks?.length > 0 && (
            <div className="row">
              <div className="col-lg-6 mb-4">
                <Pagination
                  count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                  page={page}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 mb-4 d-flex justify-content-end">
                <div>
                  <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Items Per Page
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Age"
                      value={itemsPerPage}
                      onChange={(event) => handleChangeItemsPerPage(event)}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
