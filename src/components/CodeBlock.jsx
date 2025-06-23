import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Theme can be changed

export function CodeBlock({ code, language = 'cpp' }) {
  return (
    <SyntaxHighlighter language={language} style={tomorrow} wrapLongLines>
      {code}
    </SyntaxHighlighter>
  );
}

export function InlineCode({ code, language = 'cpp' }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      PreTag="span"
      customStyle={{
        display: 'inline',
        background: 'none',
        padding: 0,
        margin: 0,
        fontSize: 'inherit',
        fontFamily: 'inherit',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

