import React from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";

interface SyntaxHighlighterProps {
    language: string;
    theme: any;
    children: React.ReactNode
}

export default function Highlighter(props: SyntaxHighlighterProps) {
    const {language, theme, children} = props;

    return (
        <SyntaxHighlighter
            language={language}
            style={theme}
            className="min-h-[300px] h-full w-[47%] rounded-lg p-2"
        >
            {children}
        </SyntaxHighlighter>
    );
}
