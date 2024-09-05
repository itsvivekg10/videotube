import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css"; // Example theme

import "codemirror/mode/xml/xml"; // HTML mode
import "codemirror/mode/javascript/javascript"; // JS mode
import "codemirror/mode/css/css"; // CSS mode

const Editor = ({ language, code, setCode }) => {
  return (
    <div className="editor-container">
      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
    </div>
  );
};

export default Editor;
