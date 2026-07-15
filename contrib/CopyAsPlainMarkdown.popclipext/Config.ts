// #popclip
// name: Copy as Plain Markdown
// identifier: com.yulonglin.popclip.extension.copy-as-plain-markdown
// description: Copy selected text as plain Markdown — structure without formatting.
// icon: symbol:doc.plaintext
// popclip version: 4615

import * as linkedom from "linkedom";
import TurndownService from "turndown";

function htmlToMarkdown(html: string): string {
  const { document } = linkedom.parseHTML(html);
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });
  return td.turndown(document);
}

function protectCode(text: string) {
  const codeBlocks: string[] = [];
  let result = text.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `\uFFFDCODEBLOCK${codeBlocks.length - 1}\uFFFD`;
  });
  const inlineCode: string[] = [];
  result = result.replace(/`[^`]+`/g, (match) => {
    inlineCode.push(match);
    return `\uFFFDINLINE${inlineCode.length - 1}\uFFFD`;
  });
  return { result, codeBlocks, inlineCode };
}

function restoreCode(
  text: string,
  codeBlocks: string[],
  inlineCode: string[],
): string {
  let result = text.replace(
    /\uFFFDINLINE(\d+)\uFFFD/g,
    (_, i) => inlineCode[i],
  );
  result = result.replace(
    /\uFFFDCODEBLOCK(\d+)\uFFFD/g,
    (_, i) => codeBlocks[i],
  );
  return result;
}

function simplifyMarkdown(md: string): string {
  // Protect code blocks and inline code from transformation
  const { result, codeBlocks, inlineCode } = protectCode(md);
  let text = result;

  // Preserved as-is: blockquotes (>), indentation, bullets, numbered lists,
  // fenced code blocks, paragraphs, line breaks.

  // Remove heading markers (### Text -> Text), but keep inside blockquotes
  text = text.replace(/^(>\s*)*#{1,6}\s+/gm, "$1");
  // Remove bold+italic (***text***) before processing bold and italic separately
  text = text.replace(/\*{3}(.+?)\*{3}/g, "$1");
  // Remove bold (**text** or __text__)
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");
  text = text.replace(/__(.+?)__/g, "$1");
  // Remove italic (*text* or _text_)
  text = text.replace(/(?<![*\w])\*([^*\n]+?)\*(?![*\w])/g, "$1");
  text = text.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, "$1");
  // Remove strikethrough (~~text~~)
  text = text.replace(/~~(.+?)~~/g, "$1");
  // Remove images, keep alt text: ![alt](url) -> alt
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  // Convert links to just text: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Clean up multiple blank lines
  text = text.replace(/\n{3,}/g, "\n\n");

  return restoreCode(text.trim(), codeBlocks, inlineCode);
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
