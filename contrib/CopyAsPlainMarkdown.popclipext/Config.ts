// #popclip
// name: Copy as Plain Markdown
// identifier: com.yulonglin.popclip.extension.copy-as-plain-markdown
// description: Copy selected text as plain Markdown — structure without formatting.
// icon: symbol:doc.plaintext
// popclip version: 4615

const linkedom = require("linkedom");
const TurndownService = require("turndown");

function htmlToMarkdown(html) {
  const { document } = linkedom.parseHTML(html);
  const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
  return td.turndown(document);
}

function simplifyMarkdown(md) {
  // Preserved as-is: blockquotes (>), indentation, bullets, numbered lists,
  // fenced code blocks, paragraphs, line breaks.

  // Remove heading markers (### Text -> Text), but keep inside blockquotes
  md = md.replace(/^(>\s*)*#{1,6}\s+/gm, "$1");
  // Remove bold (**text** or __text__)
  md = md.replace(/\*\*(.+?)\*\*/g, "$1");
  md = md.replace(/__(.+?)__/g, "$1");
  // Remove italic (*text* or _text_)
  md = md.replace(/(?<![*\w])\*([^*\n]+?)\*(?![*\w])/g, "$1");
  md = md.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, "$1");
  // Remove strikethrough (~~text~~)
  md = md.replace(/~~(.+?)~~/g, "$1");
  // Remove inline code backticks (`text` -> text)
  md = md.replace(/`([^`]+)`/g, "$1");
  // Remove images, keep alt text: ![alt](url) -> alt
  md = md.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  // Convert links to just text: [text](url) -> text
  md = md.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Clean up multiple blank lines
  md = md.replace(/\n{3,}/g, "\n\n");
  return md.trim();
}

exports.action = {
  captureHtml: true,
  code(input) {
    const md = input.html
      ? simplifyMarkdown(htmlToMarkdown(input.html))
      : input.text;
    popclip.copyText(md);
  },
};
