import { Jodit } from "jodit";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";

const RichTextEditor = ({ onContentChange, initialValue, name, editable }) => {
  const editor = useRef(null);
  const [content, setContent] = React.useState(initialValue || "");
  const { resetRichTextFieldState } = useSelector((state) => state?.common);

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
      readonly: editable === "false" ? true : false,
      spellCheck: true,

      pasteHTMLActionList: Jodit.atom([
        {
          value: Jodit.constants.INSERT_ONLY_TEXT,
          text: "Insert this content as text",
        },
      ]),
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
        "fullsize",
      ],

      events: {},
      textIcons: false,
    }),
    []
  );

  React.useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    if (onContentChange) {
      onContentChange(name, newContent);
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
      onChange={(newContent) => {}}
      onBlur={handleEditorChange}
    />
  );
};

export default RichTextEditor;
