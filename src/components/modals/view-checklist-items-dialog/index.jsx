import React from "react";
import { useSelector } from "react-redux";
import RichTextEditor from "../../../components/common/rich-text/index";

const ViewCheckListItemDialog = ({ setShowViewCheckListDialog }) => {
  const { currentSubCheckListItem } = useSelector(
    (state) => state.settingsCheckList
  );

  return (
    <div className="px-4 py-4">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">View CheckList Item</h2>
        </div>
      </header>
      {/* Area input field */}
      <div className="row mb-2">
        <div className="col-lg-12">
          <div className="form-group">
            <label htmlFor="area">Area:</label>
            <input
              id="area"
              name="area"
              type="text"
              className="form-control"
              disabled
              readOnly
              value={currentSubCheckListItem.area}
            />
          </div>
        </div>
      </div>

      {/* Subject input field */}
      <div className="row mb-2">
        <div className="col-lg-12">
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              id="subject"
              name="subject"
              type="text"
              disabled
              readOnly
              className="form-control"
              value={currentSubCheckListItem.subject}
            />
          </div>
        </div>
      </div>

      {/* Particulars input field */}
      <div className="row mb-2">
        <div className="col-lg-12">
          <label htmlFor="particulars">Particulars:</label>
          <textarea
            id="particulars"
            name="particulars"
            type="text"
            disabled
            readOnly
            className="form-control h-120"
            value={currentSubCheckListItem.particulars}
          ></textarea>
        </div>
      </div>

      {/* Observation input field */}
      <div className="row mb-2">
        <div className="col-lg-12">
          <label htmlFor="observation">Observation:</label>
          <RichTextEditor
            initialValue={currentSubCheckListItem.observation}
            name="observation"
            editable="false"
          />
        </div>
      </div>

      <div className="row py-3">
        <div
          className="col-lg-12 text-end"
          onClick={() => setShowViewCheckListDialog(false)}
        >
          <button className="btn btn-danger float-end">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCheckListItemDialog;
