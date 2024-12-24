import React from "react";

const TableRow = ({
  item,
  handleClickEngagement,
  setShowDeleteEngagementDialog,
  setCurrentEngagementId,
  index,
  page,
  itemsPerPage,
}) => {
  const serialNumber = (page - 1) * itemsPerPage + index + 1;
  return (
    <tr>
      <td>{serialNumber}</td>
      <td
        onClick={() => handleClickEngagement(item?.id, item?.natureThrough)}
        className="cursor-pointer"
      >
        {item?.natureThrough !== "Compliance Checklist" &&
        item?.natureThrough !== "Previous Observation"
          ? item?.name || "Engagement In Progress"
          : item?.engagementName}
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
      <td className="cursor-pointer d-flex flex-wrap gap-4">
        {item?.natureThrough === "Previous Observation" ? (
          <p>View Only</p>
        ) : (
          <i
            className="fa fa-eye f-18 cursor-pointer"
            onClick={() => handleClickEngagement(item?.id, item?.natureThrough)}
          ></i>
        )}
        {item?.locked === false && (
          <i
            className="fa fa-trash text-danger f-18 cursor-pointer"
            onClick={() => {
              setCurrentEngagementId(item?.id);
              setShowDeleteEngagementDialog(true);
            }}
          ></i>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
