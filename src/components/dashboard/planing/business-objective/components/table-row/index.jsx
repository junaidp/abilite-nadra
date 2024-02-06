import React from "react";

const TableRow = ({ index, item, handleClickEngagement }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td
        onClick={() => handleClickEngagement(item?.id, item?.natureThrough)}
        className="cursor-pointer"
      >
        {item?.engagementName}
      </td>
      <td
        onClick={() => handleClickEngagement(item?.id, item?.natureThrough)}
        className="cursor-pointer"
      >
        {item?.natureThrough}
      </td>
      <td
        onClick={() => handleClickEngagement(item?.id, item?.natureThrough)}
        className="cursor-pointer"
      >
        {item?.initiatedBy?.name}
      </td>
    </tr>
  );
};

export default TableRow;
