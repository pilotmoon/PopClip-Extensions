// the possible quotes styles
const styles = [
  "“…”",
  "‘…’",
  '"…"',
  "'…'",
  "`…`",
  "```…```",
  "«…»",
  "《…》",
  "‹…›",
  "»…«",
  "›…‹",
  "「…」",
  "『…』",
  "„…“",
  "‚…‘",
];

// generate square icon
function makeIcon(style: string): string {
  // Handle the case of three backticks.
  if (style.startsWith("```")) {
    return "[[```]]";
  }
  return `[[${style[0]}${style[2]}]]`;
}

function makeIdentifier(index: number): string {
  return `style-${index}`;
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
      return styles.filter((style, index) => options[makeIdentifier(index)])
        .map((style, index) => {
          return {
            title: styles[index],
            icon: makeIcon(style),
            code: (selection) => {
              // Handle the case of three backticks.
              if (style.startsWith("```")) {
                // Detect the longest continuous backquote sequence in the text
                const backtickMatch = selection.text.match(/`+/g);
                let maxBackticks = 0;
                if (backtickMatch) {
                  maxBackticks = Math.max(...backtickMatch.map(m => m.length));
                }
                // If the text contains three or more backticks, use one more backtick than the longest sequence
                const wrapperLength = Math.max(3, maxBackticks + 1);
                const wrapper = "`".repeat(wrapperLength);
                // Add line breaks before and after each line to make the backticks occupy a single line
                popclip.pasteText(wrapper + "\n" + selection.text + "\n" + wrapper);
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
