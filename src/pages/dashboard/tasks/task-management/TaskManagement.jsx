import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const TaskManagement = lazy(() =>
  import("../../../../components/dashboard/tasks/task-management/index")
);

const TaskManagementPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <TaskManagement />
    </Suspense>
  );
};

export default TaskManagementPage;
