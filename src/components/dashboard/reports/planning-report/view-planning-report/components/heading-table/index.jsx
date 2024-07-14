import React from "react";

const HeadingTable = ({ data }) => {
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered  table-hover rounded">
          <thead className="bg-secondary text-white">
            <tr>
              <th>Heading </th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data?.newHeading?.length === 0 || !data?.newHeading ? (
              <tr>
                <td className="w-300">No Heading Added!</td>
              </tr>
            ) : (
              data?.newHeading?.map((head, index) => {
                return (
                  <tr key={index}>
                    <td>{head?.heading}</td>
                    <td>{head?.description}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeadingTable;
