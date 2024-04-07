import React from "react";
import ObjectiveColumn from "./columns/Objective";
import RiskColumn from "./columns/Risk";
import ControlColumn from "./columns/Control";
import Program from "./columns/Program";
import {
  setupDeleteRCMObjective,
  setupDeleteRCMRisk,
  setupDeleteRCMControl,
  setupDeleteRCMProgram,
} from "../../../../.././../global-redux/reducers/settings/risk-control-matrix/slice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  function deleteRCMObjective(id) {
    if (!loading) {
      dispatch(setupDeleteRCMObjective(Number(id)));
    }
  }
  function deleteRCMRisk(id) {
    if (!loading) {
      dispatch(setupDeleteRCMRisk(Number(id)));
    }
  }
  function deleteRCMControl(id) {
    if (!loading) {
      dispatch(setupDeleteRCMControl(Number(id)));
    }
  }
  function deleteRCMProgram(id) {
    if (!loading) {
      dispatch(setupDeleteRCMProgram(Number(id)));
    }
  }
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
        deleteRCMObjective={deleteRCMObjective}
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
        deleteRCMRisk={deleteRCMRisk}
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
        deleteRCMControl={deleteRCMControl}
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
        deleteRCMProgram={deleteRCMProgram}
      />
    </tr>
  );
};

export default TableBody;
