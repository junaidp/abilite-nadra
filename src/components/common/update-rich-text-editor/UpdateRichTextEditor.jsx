import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import JoditEditor from "jodit-react";

const UpdateRichTextEditor = ({
    initialValue,
    name,
    onContentChange,
    onKeyFindingChange,
    consolidatedItemId,
    consolidatedObservationId
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
                "|",
                "brush"
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
                "|",
                "brush"
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
            if (!consolidatedItemId) {
                onContentChange?.(newContent, name);
            } else {
                onKeyFindingChange?.(
                    newContent,
                    consolidatedItemId,
                    consolidatedObservationId
                );
            }
        },
        [consolidatedItemId, name, onContentChange, onKeyFindingChange]
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

export default React.memo(UpdateRichTextEditor);

