import React, { useEffect, useRef } from "react";

const Output = ({ html, css, js }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const document = iframeRef.current.contentDocument;
    const documentContents = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
    document.open();
    document.write(documentContents);
    document.close();
  }, [html, css, js]);

  return <iframe ref={iframeRef} title="output" className="output-iframe" />;
};

export default Output;
