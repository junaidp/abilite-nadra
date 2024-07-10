import React from "react";

const HeadingTable = ({
  editable,
  data,
  handleDeleteHeading,
  setEditGeneratePlaningId,
  setEditGeneratePlaningReportDialog,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered  table-hover rounded">
        <thead className="bg-secondary text-white">
          <tr>
            <th>Heading </th>
            <th>Description</th>
            {editable !== "false" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.newHeading?.length === 0 ? (
            <tr>
              <td className="w-300">No Heading Added!</td>
            </tr>
          ) : (
            data?.newHeading?.map((head, index) => {
              return (
                <tr key={index}>
                  <td>{head?.heading}</td>
                  <td>{head?.description}</td>
                  {editable !== "false" && (
                    <td className="w-130">
                      <i
                        className="fa fa-trash text-danger f-18 cursor-pointer"
                        onClick={() => handleDeleteHeading(head?.id)}
                      ></i>
                      <i
                        className="fa fa-edit  px-3 f-18 cursor-pointer"
                        onClick={() => {
                          setEditGeneratePlaningId(head?.id);
                          setEditGeneratePlaningReportDialog(true);
                        }}
                      ></i>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HeadingTable;
