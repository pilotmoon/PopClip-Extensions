// #popclip
// name: Copy as Markdown
// identifier: com.pilotmoon.popclip.extension.copy-as-markdown
// description: Copy web content as Markdown.
// icon: '>md.png'
// popclip version: 4615

const linkedom = require("linkedom");
const TurndownService = require("turndown");

exports.options = [
  {
    identifier: "headingStyle",
    label: "Heading Style",
    type: "multiple",
    values: ["atx", "setext"],
    valueLabels: ["ATX — # Heading", "Setext — Heading⏎======="],
  },
  {
    identifier: "bulletListMarker",
    label: "Bullet List Marker",
    type: "multiple",
    values: ["*", "-", "+"],
  },
  {
    identifier: "emDelimiter",
    label: "<em> Delimiter",
    type: "multiple",
    values: ["*", "_"],
  },
  {
    identifier: "strongDelimiter",
    label: "<strong> Delimiter",
    type: "multiple",
    values: ["**", "__"],
  },
  {
    identifier: "linkStyle",
    label: "Link Style",
    type: "multiple",
    values: ["inlined", "referenced"],
    valueLabels: ["Inline — [text](url)", "Reference — [text][id]"],
  },
];

function htmlToMarkdown(html, options) {
  // generate DOM object from HTML
  function JSDOM(html) {
    return linkedom.parseHTML(html);
  } // facade to work like jsdom
  const { document } = new JSDOM(html);
  // extract markdown using turndown
  const turndownService = new TurndownService(options);
  return turndownService.turndown(document);
}

exports.action = {
  captureHtml: true,
  code(input, options) {
    popclip.copyText(htmlToMarkdown(input.html, options));
  },
};
