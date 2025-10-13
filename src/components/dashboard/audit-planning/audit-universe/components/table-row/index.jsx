
const TableRow = ({
  item,
  handleClickEngagement,
  setShowDeleteEngagementDialog,
  setCurrentEngagementId,
  index,
  page,
  itemsPerPage,
}) => {
  // Calculate serial number based on pagination
  const serialNumber = (page - 1) * itemsPerPage + index + 1;

  // Handle engagement view click
  const handleViewClick = () => {
    handleClickEngagement(item?.id, item?.natureThrough);
  };

  // Handle delete action
  const handleDeleteClick = () => {
    setCurrentEngagementId(item?.id);
    setShowDeleteEngagementDialog(true);
  };

  // Resolve name depending on type
  const displayName =
    item?.natureThrough !== "Compliance Checklist"
      ? item?.name || "Engagement In Progress"
      : item?.engagementName;

  return (
    <tr>
      <td>{serialNumber}</td>

      {/* Engagement Name */}
      <td onClick={handleViewClick} className="cursor-pointer">
        {displayName}
      </td>

      {/* Identified Through */}
      <td onClick={handleViewClick} className="cursor-pointer">
        {item?.natureThrough}
      </td>

      {/* Initiated By */}
      <td onClick={handleViewClick} className="cursor-pointer">
        {item?.initiatedBy?.name}
      </td>

      {/* Actions */}
      <td className="cursor-pointer d-flex flex-wrap gap-4">
        {item?.natureThrough === "Previous Observation" ? (
          <p>View Only</p>
        ) : (
          <i
            className="fa fa-eye f-18 cursor-pointer"
            onClick={handleViewClick}
          ></i>
        )}

        {!item?.locked && (
          <i
            className="fa fa-trash text-danger f-18 cursor-pointer"
            onClick={handleDeleteClick}
          ></i>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
