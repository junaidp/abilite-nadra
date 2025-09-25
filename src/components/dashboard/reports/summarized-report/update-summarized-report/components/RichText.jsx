import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({
    initialValue,
    name,
    onContentChange,
    keyFindings,
    consolidatedItemId,
    consolidatedObservationId,
    onKeyFindingChangeChange, // ✅ missing in original props
}) => {
    const editor = useRef(null);
    const [content, setContent] = useState("");

    // ✅ config memoized so it’s not recreated on every render
    const config = useMemo(
        () => ({
            uploader: {
                insertImageAsBase64URI: true,
            },
            controls: {
                font: {
                    list: {
                        Serif: "Sans Serif",
                        Garamond: "Garamond",
                    },
                },
            },
            toolbarAdaptive: false,
            spellCheck: true,
            readonly: false,
            askBeforePasteHTML: true,
            buttons: [
                "bold",
                "|",
                "strikethrough",
                "|",
                "underline",
                "|",
                "italic",
                "|",
                "ul",
                "|",
                "ol",
                "|",
                "table",
                "|",
                "font",
                "|",
                "fontsize",
                "|",
                "paragraph",
                "|",
                "image",
                "|",
                "align",
                "|",
                "fullsize",
            ],
            buttonsXS: [
                "bold",
                "|",
                "strikethrough",
                "|",
                "underline",
                "|",
                "italic",
                "|",
                "ul",
                "|",
                "ol",
                "|",
                "table",
                "|",
                "font",
                "|",
                "fontsize",
                "|",
                "paragraph",
                "|",
                "image",
                "|",
                "align",
                "|",
                "fullsize",
            ],
            removeButtons: ["about"],
            events: {},
            textIcons: false,
        }),
        []
    );

    // ✅ only update when initialValue changes, prevent extra re-renders
    useEffect(() => {
        if (initialValue !== null && initialValue !== undefined) {
            setContent(initialValue);
        }
    }, [initialValue]);

    // ✅ stable callback
    const handleEditorChange = useCallback(
        (newContent) => {
            setContent(newContent);
            if (!keyFindings) {
                onContentChange?.(newContent, name);
            } else {
                onKeyFindingChangeChange?.(
                    newContent,
                    consolidatedItemId,
                    consolidatedObservationId
                );
            }
        },
        [keyFindings, name, consolidatedItemId, consolidatedObservationId, onContentChange, onKeyFindingChangeChange]
    );

    return (
        <JoditEditor
            ref={editor}
            config={config}
            tabIndex={1}
            value={content}
            onBlur={handleEditorChange}
        />
    );
};

export default React.memo(RichTextEditor);
