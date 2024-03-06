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
  rcmAddSuccess
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
      />
      {/* First Colimn */}
      {/* Second Colimn */}

      <RiskColumn
        objective={objective}
        handleChangeRisk={handleChangeRisk}
        handleEditableRisk={handleEditableRisk}
        handleSaveRisk={handleSaveRisk}
        loading={loading}
        rcmAddSuccess={rcmAddSuccess}
      />
      {/* Second Colimn */}
      {/* Third Column */}

      <ControlColumn
        objective={objective}
        handleChangeControl={handleChangeControl}
        handleSaveControl={handleSaveControl}
        handleEditableControl={handleEditableControl}
        loading={loading}
        rcmAddSuccess={rcmAddSuccess}
      />
      {/* Third Column */}
      {/* Last Column */}

      <Program
        objective={objective}
        handleChangeProgram={handleChangeProgram}
        handleSaveProgram={handleSaveProgram}
        handleEditableProgram={handleEditableProgram}
        loading={loading}
        rcmAddSuccess={rcmAddSuccess}
      />
      {/* Last Column */}
    </tr>
  );
};

export default TableBody;
