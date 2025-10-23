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
  // 处理三个反引号的情况
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
              // 处理三个反引号的情况
              if (style.startsWith("```")) {
                // 检测文本中最长的连续反引号序列
                const backtickMatch = selection.text.match(/`+/g);
                let maxBackticks = 0;
                if (backtickMatch) {
                  maxBackticks = Math.max(...backtickMatch.map(m => m.length));
                }
                // 如果文本中包含3个或更多反引号，使用比最长序列多1个的反引号
                const wrapperLength = Math.max(3, maxBackticks + 1);
                const wrapper = "`".repeat(wrapperLength);
                // 前后各添加换行符，让反引号独占一行
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
