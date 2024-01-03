import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const Example = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    uploader: {
      insertImageAsBase64URI: true, // Converts the image to base64 and embeds it
    },
    controls: {
      font: {
        list: {
          Serif: "Sans Serif",
          Garamond: "Garamond",
        },
      },
    },
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

    events: {},
    textIcons: false,
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
};

export default Example;
