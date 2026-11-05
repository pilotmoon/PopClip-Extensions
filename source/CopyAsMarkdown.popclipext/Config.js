// #popclip
// name: Copy as Markdown
// identifier: com.pilotmoon.popclip.extension.copy-as-markdown
// description: Copy web content as Markdown.
// icon: '>md.png'
// popclip version: 4615

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

exports.action = {
  captureHtml: true,
  code(input, options) {
    popclip.copyText(util.htmlToMarkdown(input.html, options));
  },
};
