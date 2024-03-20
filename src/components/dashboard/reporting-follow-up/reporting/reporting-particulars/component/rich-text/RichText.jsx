import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";

const RichTextEditor = ({ onContentChange, initialValue, id, editable }) => {
  const editor = useRef(null);
  const [content, setContent] = React.useState(initialValue || "");
  const { resetRichTextFieldState } = useSelector((state) => state?.common);
  const { reportingAddSuccess } = useSelector((state) => state?.reporting);

  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true, // Converts the image to base64 and embeds it
      },
      // askBeforePasteHTML: false,
      controls: {
        font: {
          list: {
            Serif: "Sans Serif",
            Garamond: "Garamond",
          },
        },
      },
      toolbarAdaptive: false,
      // processPasteHTML: false,
      // scrollToPastedContent: false,
      // nl2brInPlainText: true,
      readonly: editable === "false" ? true : false,
      spellcheck: true,
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
        "image",
        "|",
        "table",
        "|",
        "font",
        "|",
        "fontsize",
        "|",
        "paragraph",
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
        "image",
        "|",
        "table",
        "|",
        "font",
        "|",
        "fontsize",
        "|",
        "paragraph",
        "|",
        "fullsize",
      ],

      events: {},
      textIcons: false,
    }),
    [reportingAddSuccess]
  );

  React.useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    if (onContentChange) {
      onContentChange(id, newContent);
    }
  };

  React.useEffect(() => {
    if (resetRichTextFieldState === true) {
      setContent("");
    }
  }, [resetRichTextFieldState]);

  return (
    <JoditEditor
      ref={editor}
      config={config}
      tabIndex={1}
      value={content}
      onChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
