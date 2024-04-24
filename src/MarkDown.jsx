import React, { useState } from "react";
import "./MarkDown.css";

function MarkDown() {
  const [markdown, setMarkdown] = useState("");

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const convertToHtml = (markdownText) => {
    const html = markdownText
      .replace(/^# (.+)$/gm, "<h2>$1</h2>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h2>$1</h2>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/`(.+?)`/g, "<code>$1</code>");

    const htmlWithLinks = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );

    const paragraphs = htmlWithLinks
      .split("\n")
      .map((line) => (line.trim() ? `<p>${line}</p>` : ""))
      .join("");

    return paragraphs;
  };

  return (
    <div className="markDown">
      <div className="container">
        <h1 className="heading">MARK DOWN</h1>
        <div className="editor-preview-container">
          <div className="editor">
            <h2>Editor:</h2>
            <textarea
              value={markdown}
              onChange={handleChange}
              placeholder="Type some Markdown here..."
            />
          </div>
          <div className="preview">
            <h2>Preview:</h2>
            <div
              dangerouslySetInnerHTML={{ __html: convertToHtml(markdown) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkDown;
