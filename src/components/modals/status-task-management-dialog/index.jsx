import React from "react";

const StatusTaskManagementDialog = ({ setShowStatusTaskManagementDialog }) => {
  return (
    <div class="p-4">
      <p>status-task-management-dialog works!</p>
      <button
        class="btn btn-outline-indigo"
        onClick={() => setShowStatusTaskManagementDialog(false)}
      >
        Close
      </button>
    </div>
  );
};

export default StatusTaskManagementDialog;
