import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Theme can be changed

export default function CodeBlock({ code, language = 'cpp' }) {
  return (
    <SyntaxHighlighter language={language} style={tomorrow} wrapLongLines>
      {code}
    </SyntaxHighlighter>
  );
}
