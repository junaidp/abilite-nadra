import moment from "moment";
import RichTextEditor from "../../view-internal-audit-report/components/RichText";
import { convertFromBase64 } from "../../../../../../config/helper";

const FollowUpItem = ({ item, consolidatedObservationsItem }) => {
  return (
    <div>
      {consolidatedObservationsItem === false && (
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Observation Title:</label>
            <p>{item.observationTitle}</p>
          </div>
        </div>
      )}
      <div className="mb-3">
        <label>Observation:</label>
        <RichTextEditor initialValue={item?.observationName} />
      </div>

      <div className="mb-3 align-items-center">
        <label className="pe-4">Implication Rating:</label>
        <select
          className="form-select"
          aria-label="Default select example"
          value={item?.implicationRating}
          disabled
        >
          <option value="">Select One</option>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Implication:</label>
        <textarea
          className="form-control "
          placeholder="Enter Reason"
          id="exampleFormControlTextarea1"
          rows="3"
          value={item?.implication}
          disabled
        ></textarea>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Auditee:</label>
          <input
            className="form-control w-100"
            placeholder="Enter Observation Title here"
            type="text"
            value={item?.auditee?.name}
            disabled
          />
        </div>
      </div>

      {/*  */}
      <div className="mb-3">
        <label>Management Comments:</label>
        <RichTextEditor initialValue={item?.managementComments} />
      </div>
      <div className="mb-3">
        <label className="py-1">Implementation Date:</label>
        <input
          type="date"
          className="form-control"
          id="exampleFormControlInput1"
          value={moment(item?.implementationDate).format("YYYY-MM-DD")}
          name="implementationDate"
          disabled
        />
      </div>
      <div className="mb-3 align-items-center">
        <label className="pe-4">Recommendations Implemented:</label>
        <select
          className="form-select"
          aria-label="Default select example"
          value={item?.followUp?.recommendationsImplemented.toString()}
          name="recommendationsImplemented"
          disabled
        >
          <option value="">Select One</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      {item?.followUp?.recommendationsImplemented.toString() === "true" && (
        <div className="mb-3">
          <label>Final Comments:</label>
          <RichTextEditor initialValue={convertFromBase64(item?.followUp?.finalComments)} />
        </div>
      )}

      <div className="mb-3 align-items-center">
        <label className="pe-4">Test In Next Year:</label>
        <select
          className="form-select"
          aria-label="Default select example"
          value={item?.followUp?.testInNextYear.toString()}
          name="testInNextYear"
          disabled
        >
          <option value="">Select One</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  );
};

export default FollowUpItem;
