import React from 'react'
import { Helmet } from "react-helmet-async";

import TaskManagement from '../../../components/dashboard/task-management';

const TaskManagementPage = () => {
  return (
    <div>
    <Helmet>
      <title>Information Request</title>
      <meta name="description" content="Nested component" />
    </Helmet>
    <TaskManagement />
  </div>
  )
}

export default TaskManagementPage
