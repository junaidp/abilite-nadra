import TableBody from "../components/TableBody";
import React from "react";
const AccordionItem = ({ item }) => {
  return (
    <div>
      <div className="container">
        <div className="row py-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered  table-hover rounded">
                <thead>
                  <tr>
                    <th>Objective</th>
                    <th>Risk</th>
                    <th>Controls</th>
                    <th>Program</th>
                    <th>Check</th>
                  </tr>
                </thead>
                <tbody>
                  {item?.rcmLibraryObjectives?.map((objective, index) => {
                    return <TableBody objective={objective} key={index} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
