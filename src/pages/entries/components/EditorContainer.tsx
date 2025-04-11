import React, { useRef, useMemo, SetStateAction } from "react";
import JoditEditor from "jodit-react";

const EditorContainer = ({
  placeholder,
  content,
  setContent,
}: {
  placeholder: string;
  content: string;
  setContent: React.Dispatch<SetStateAction<string>>;
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
      minHeight: 350,
      color: "black",
      theme: "dark",
      style: {
        textAlign: "left",
      },
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
};

export default EditorContainer;
