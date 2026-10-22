// the possible quotes styles
// new styles must be appended at the end, because each style's option
// identifier is derived from its position in this list
const styles = [
  "“…”",
  "‘…’",
  '"…"',
  "'…'",
  "`…`",
  "«…»",
  "《…》",
  "‹…›",
  "»…«",
  "›…‹",
  "「…」",
  "『…』",
  "„…“",
  "‚…‘",
  "```…```",
];

const codeFence = "```…```";

// generate square icon
function makeIcon(style: string): string {
  if (style === codeFence) {
    return "square filled ```";
  }
  return `square filled ${style[0]}${style[2]}`;
}

function makeIdentifier(index: number): string {
  return `style-${index}`;
}

// wrap text in a fenced code block, using a fence longer than any run of
// backticks already in the text
function fence(text: string): string {
  const runs = text.match(/`+/g) ?? [];
  const longest = Math.max(0, ...runs.map((run) => run.length));
  const wrapper = "`".repeat(Math.max(3, longest + 1));
  const body = text.endsWith("\n") ? text.slice(0, -1) : text;
  return `${wrapper}\n${body}\n${wrapper}`;
}

const extension: Extension = {
  options: styles.map((style, index) => {
    return {
      identifier: makeIdentifier(index),
      label: style,
      type: "boolean",
      icon: makeIcon(style),
      defaultValue: !(index > 0),
    };
  }),
  actions(selection, options) {
    if (selection.text.length > 0) {
      return styles
        .filter((_style, index) => options[makeIdentifier(index)])
        .map((style) => {
          return {
            title: style,
            icon: makeIcon(style),
            code: (selection) => {
              if (style === codeFence) {
                popclip.pasteText(fence(selection.text));
              } else {
                popclip.pasteText(style[0] + selection.text + style[2]);
              }
            },
          };
        });
    }
  },
};

export default extension;
