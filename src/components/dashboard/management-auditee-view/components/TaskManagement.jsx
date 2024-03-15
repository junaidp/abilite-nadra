import React from "react";
import TaskManagementPage from "../../task-management/index";

const TaskManagement = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-task-management"
      role="tabpanel"
      aria-labelledby="nav-task-management-tab"
    >
      <TaskManagementPage />
    </div>
  );
};

export default TaskManagement;
