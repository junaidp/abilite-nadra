// sub/AuditeeSection.jsx
import React from "react";

/**
 * AuditeeSection
 * Display auditee name (readonly).
 */
const AuditeeSection = ({ item }) => {
    return (
        <div className="row mb-4">
            <div className="col-lg-12">
                <label>Auditee:</label>
                <input
                    className="form-control w-100"
                    type="text"
                    value={item?.auditee?.name}
                    disabled
                />
            </div>
        </div>
    );
};

export default React.memo(AuditeeSection);
