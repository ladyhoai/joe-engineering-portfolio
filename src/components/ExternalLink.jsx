import React from "react";

export default function ExternalLink({ href, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline font-bold ml-1"
        >
            {children}
        </a>
    );
}
