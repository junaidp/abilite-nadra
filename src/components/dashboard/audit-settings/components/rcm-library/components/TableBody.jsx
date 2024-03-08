import React from "react";
import ObjectiveColumn from "./columns/Objective";
import RiskColumn from "./columns/Risk";
import ControlColumn from "./columns/Control";
import Program from "./columns/Program";

const TableBody = ({
  objective,
  handleEditableObjective,
  handleChangeObjective,
  handleEditableRisk,
  handleChangeRisk,
  handleEditableControl,
  handleChangeControl,
  handleEditableProgram,
  handleChangeProgram,
  handleSaveObjective,
  handleSaveRisk,
  handleSaveControl,
  handleSaveProgram,
  loading,
  rcmAddSuccess,
  userHierarchy,
  userRole,
}) => {
  return (
    <tr>
      {/* First Colimn */}
      <ObjectiveColumn
        objective={objective}
        handleSaveObjective={handleSaveObjective}
        handleChangeObjective={handleChangeObjective}
        handleEditableObjective={handleEditableObjective}
        loading={loading}
        rcmAddSuccess={rcmAddSuccess}
        userHierarchy={userHierarchy}
        userRole={userRole}
      />
      {/* Second Colimn */}

      <RiskColumn
        objective={objective}
        handleChangeRisk={handleChangeRisk}
        handleEditableRisk={handleEditableRisk}
        handleSaveRisk={handleSaveRisk}
        loading={loading}
        rcmAddSuccess={rcmAddSuccess}
        userHierarchy={userHierarchy}
        userRole={userRole}
      />
      {/* Third Column */}

      <ControlColumn
        objective={objective}
        handleChangeControl={handleChangeControl}
        handleSaveControl={handleSaveControl}
        handleEditableControl={handleEditableControl}
        loading={loading}
        rcmAddSuccess={rcmAddSuccess}
        userHierarchy={userHierarchy}
        userRole={userRole}
      />
      {/* Last Column */}

      <Program
        objective={objective}
        handleChangeProgram={handleChangeProgram}
        handleSaveProgram={handleSaveProgram}
        handleEditableProgram={handleEditableProgram}
        loading={loading}
        rcmAddSuccess={rcmAddSuccess}
        userHierarchy={userHierarchy}
        userRole={userRole}
      />
    </tr>
  );
};

export default TableBody;
