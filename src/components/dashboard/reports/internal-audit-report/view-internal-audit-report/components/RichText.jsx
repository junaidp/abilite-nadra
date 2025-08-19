import { Jodit } from "jodit";
import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ initialValue }) => {
  const editor = useRef(null);
  const [content, setContent] = React.useState("");

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
      readonly: true,

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
    []
  );

  React.useEffect(() => {
    if (initialValue !== null && initialValue !== "") {
      setContent(initialValue);
    }
  }, [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
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
