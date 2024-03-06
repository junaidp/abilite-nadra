import React from "react";
import ObjectiveColumn from "./columns/Objective";
import RiskColumn from "./columns/Risk";
import ControlColumn from "./columns/Control";
import Program from "./columns/Program";

const TableBody = ({ objective }) => {
  return (
    <tr>
      <ObjectiveColumn objective={objective} />
      <RiskColumn objective={objective} />
      <ControlColumn objective={objective} />
      <Program objective={objective} />
      <td>
        <input id="rememberMe" type="checkbox" />
      </td>
    </tr>
  );
};

export default TableBody;
