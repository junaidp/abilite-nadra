import React from "react";

const CPListRows = ({cpItem,handleChangeCpList,handleChangeCpListComments}) => {
  return (
    <tr >
      <td>{cpItem?.id}</td>
      <td className="w-400">{cpItem?.description || ""}</td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={cpItem?.inadequate}
            id="flexCheckDefault"
            name="inadequate"
            onChange={(event) => handleChangeCpList(event, cpItem?.id)}
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          ></label>
        </div>
      </td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={cpItem?.needsImprovement}
            id="flexCheckDefault"
            onChange={(event) => handleChangeCpList(event, cpItem?.id)}
            name="needsImprovement"
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          ></label>
        </div>
      </td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={cpItem?.adequate}
            id="flexCheckDefault"
            name="adequate"
            onChange={(event) => handleChangeCpList(event, cpItem?.id)}
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          ></label>
        </div>
      </td>
      <td className="w-300">
        <textarea
          className="form-control"
          placeholder="Enter Reason"
          id="exampleFormCont"
          rows="3"
          value={cpItem?.comments || ""}
          onChange={(event) => handleChangeCpListComments(event, cpItem?.id)}
          name="comments"
        ></textarea>
        <label className="word-limit-info label-text">Maximum 1500 words</label>
      </td>
    </tr>
  );
};

export default CPListRows;
