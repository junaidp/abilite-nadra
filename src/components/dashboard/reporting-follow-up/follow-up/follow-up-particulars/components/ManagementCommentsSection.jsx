import React from "react";
import RichTextEditor from "./RichText";

/**
 * ManagementCommentsSection
 * Readonly management comments rich text.
 */
const ManagementCommentsSection = ({ item }) => {
    return (
        <div className="mb-4">
            <label>Management Comments:</label>
            <RichTextEditor initialValue={item?.managementComments} editable="false" />
        </div>
    );
};

export default React.memo(ManagementCommentsSection);
