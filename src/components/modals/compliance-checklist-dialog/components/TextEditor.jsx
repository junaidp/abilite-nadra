import React, { useState, useRef, useMemo } from "react";
import { Jodit } from "jodit";
import JoditEditor from "jodit-react";

const RichTextEditor = ({
  onContentChange,
  initialValue,
  singleItem,
  handleAllowEdit,
}) => {
  const editor = useRef(null);
  const [content, setContent] = React.useState(initialValue || "");

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
      readonly:
        singleItem?.remarks === "1" ||
          singleItem?.remarks === "3" ||
          handleAllowEdit() === false
          ? true
          : false,
      spellCheck: true,

      pasteHTMLActionList: Jodit.atom([
        {
          value: Jodit.constants.INSERT_ONLY_TEXT,
          text: "Insert this content as text",
        },
      ]),
      askBeforePasteHTML: true,
      // buttons: [
      //   "bold",
      //   "|",
      //   "strikethrough",
      //   "|",
      //   "underline",
      //   "|",
      //   "italic",
      //   "|",
      //   "ul",
      //   "|",
      //   "ol",
      //   "|",
      //   "table",
      //   "|",
      //   "font",
      //   "|",
      //   "fontsize",
      //   "|",
      //   "paragraph",
      //   "|",
      // ],

      // buttonsXS: [
      //   "bold",
      //   "|",
      //   "strikethrough",
      //   "|",
      //   "underline",
      //   "|",
      //   "italic",
      //   "|",
      //   "ul",
      //   "|",
      //   "ol",
      //   "|",
      //   "table",
      //   "|",
      //   "font",
      //   "|",
      //   "fontsize",
      //   "|",
      //   "paragraph",
      //   "|",
      // ],
      removeButtons: ['about'],
      events: {},
      textIcons: false,
    }),
    [singleItem?.remarks]
  );

  React.useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onContentChange(singleItem?.id, newContent);
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      tabIndex={1}
      value={content}
      onChange={(newContent) => { }}
      onBlur={handleEditorChange}
    />
  );
};

export default RichTextEditor;
