import React from "react";
import moment from "moment";
import RichTextEditor from "./RichText";
import FollowUpFileUpload from "./FileUpload";

/**
 * FollowUpSection
 * Contains file upload section, implementation date, recommendation implemented select,
 * final comments (conditional), and test-in-next-year select (conditional).
 *
 * Props:
 * - item
 * - handleChange (event, id)
 * - handleAllowEditLastSection (item) => boolean
 * - handleFinalCommentsChange (id, content)
 * - singleReport
 * - handleShowTestInNextYear (item) => boolean
 */
const FollowUpSection = ({
    item,
    handleChange,
    handleAllowEditLastSection,
    handleFinalCommentsChange,
    singleReport,
    handleShowTestInNextYear,
}) => {
    const recommendationsValue = item?.followUp?.recommendationsImplemented?.toString();

    return (
        <>
            <FollowUpFileUpload item={item} />

            <div className="mb-4">
                <label className="py-1">Implementation Date:</label>
                <input
                    type="date"
                    className="form-control"
                    value={moment(item?.implementationDate).format("YYYY-MM-DD")}
                    disabled
                />
            </div>

            <div className="mb-4 align-items-center">
                <label className="pe-4">Recommendations Implemented:</label>
                <select
                    className="form-select"
                    value={recommendationsValue}
                    name="recommendationsImplemented"
                    onChange={(event) => handleChange(event, item?.id)}
                    disabled={!handleAllowEditLastSection(item)}
                >
                    <option value="">Select One</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            {recommendationsValue === "true" && (
                <div className="mb-4">
                    <label>Final Comments:</label>
                    <RichTextEditor
                        onContentChange={handleFinalCommentsChange}
                        initialValue={item?.followUp?.finalComments}
                        id={item?.id}
                        editable={handleAllowEditLastSection(item) ? "true" : "false"}
                        singleReport={singleReport}
                        item={item}
                    />
                </div>
            )}

            {item?.stepNo >= 6 && (
                <div className="mb-4 align-items-center">
                    <label className="pe-4">Test In Next Year:</label>
                    <select
                        className="form-select"
                        value={item?.followUp?.testInNextYear?.toString()}
                        name="testInNextYear"
                        onChange={(event) => handleChange(event, item?.id)}
                        disabled={!handleShowTestInNextYear(item)}
                    >
                        <option value="">Select One</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            )}
        </>
    );
};

export default React.memo(FollowUpSection);
