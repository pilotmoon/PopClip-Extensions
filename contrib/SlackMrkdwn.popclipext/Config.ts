// #popclip
// name: Slack mrkdwn
// identifier: com.yulonglin.popclip.extension.slack-mrkdwn
// description: Convert between Slack mrkdwn and standard Markdown/rich text.
// icon: iconify:simple-icons:slack
// popclip version: 4615

const linkedom = require("linkedom");
const TurndownService = require("turndown");

// --- Conversion functions ---

function htmlToSlackMrkdwn(html) {
  const { document } = linkedom.parseHTML(html);
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });

  // Disable Turndown's default markdown escaping — we're outputting Slack mrkdwn, not markdown
  td.escape = (str) => str;

  td.addRule("slackBold", {
    filter: ["strong", "b"],
    replacement(content) {
      return content.trim() ? `*${content.trim()}*` : "";
    },
  });

  td.addRule("slackItalic", {
    filter: ["em", "i"],
    replacement(content) {
      return content.trim() ? `_${content.trim()}_` : "";
    },
  });

  td.addRule("slackStrikethrough", {
    filter: ["del", "s", "strike"],
    replacement(content) {
      return content.trim() ? `~${content.trim()}~` : "";
    },
  });

  td.addRule("slackLink", {
    filter(node) {
      return node.nodeName === "A" && node.getAttribute("href");
    },
    replacement(content, node) {
      const href = node.getAttribute("href");
      const text = content.trim();
      if (!text || text === href) return `<${href}>`;
      return `<${href}|${text}>`;
    },
  });

  td.addRule("slackHeading", {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement(content) {
      return content.trim() ? `\n\n*${content.trim()}*\n\n` : "";
    },
  });

  td.addRule("slackListItem", {
    filter: "li",
    replacement(content, node) {
      const text = content.trim().replace(/^\n+/, "").replace(/\n+$/, "");
      const parent = node.parentNode;
      if (parent && parent.nodeName === "OL") {
        const items = Array.from(parent.children).filter(
          (n) => n.nodeName === "LI"
        );
        const index = items.indexOf(node) + 1;
        return `${index}. ${text}\n`;
      }
      return `• ${text}\n`;
    },
  });

  td.addRule("slackList", {
    filter: ["ul", "ol"],
    replacement(content) {
      return `\n${content}\n`;
    },
  });

  return td.turndown(document).trim();
}

function protectCode(text) {
  const codeBlocks = [];
  let result = text.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `\x00CODEBLOCK${codeBlocks.length - 1}\x00`;
  });
  const inlineCode = [];
  result = result.replace(/`[^`]+`/g, (match) => {
    inlineCode.push(match);
    return `\x00INLINE${inlineCode.length - 1}\x00`;
  });
  return { result, codeBlocks, inlineCode };
}

function restoreCode(text, codeBlocks, inlineCode) {
  let result = text.replace(
    /\x00INLINE(\d+)\x00/g,
    (_, i) => inlineCode[i]
  );
  result = result.replace(
    /\x00CODEBLOCK(\d+)\x00/g,
    (_, i) => codeBlocks[i]
  );
  return result;
}

function markdownToSlackMrkdwn(text) {
  let { result, codeBlocks, inlineCode } = protectCode(text);

  result = result.replace(/^#{1,6}\s+(.+)$/gm, "*$1*");
  result = result.replace(/\*\*(.+?)\*\*/g, "*$1*");
  result = result.replace(/__(.+?)__/g, "*$1*");
  result = result.replace(/~~(.+?)~~/g, "~$1~");
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<$2|$1>");
  result = result.replace(/^[\-\*]\s+/gm, "• ");

  return restoreCode(result, codeBlocks, inlineCode);
}

function slackMrkdwnToMarkdown(text) {
  let { result, codeBlocks, inlineCode } = protectCode(text);

  result = result.replace(/<([^|>]+)\|([^>]+)>/g, "[$2]($1)");
  result = result.replace(/<(https?:\/\/[^>]+)>/g, "$1");
  result = result.replace(/(?<!\w)\*([^*\n]+)\*(?!\w)/g, "**$1**");
  result = result.replace(/(?<!\w)~([^~\n]+)~(?!\w)/g, "~~$1~~");
  result = result.replace(/^•\s+/gm, "- ");
  result = result.replace(/&amp;/g, "&");
  result = result.replace(/&lt;/g, "<");
  result = result.replace(/&gt;/g, ">");

  return restoreCode(result, codeBlocks, inlineCode);
}

// --- Actions ---

exports.actions = [
  {
    title: "Copy as Slack mrkdwn",
    icon: "iconify:simple-icons:slack",
    captureHtml: true,
    code(input) {
      // Use HTML conversion if rich text is available, otherwise treat as Markdown
      const result = input.html
        ? htmlToSlackMrkdwn(input.html)
        : markdownToSlackMrkdwn(input.text);
      popclip.copyText(result);
    },
  },
  {
    title: "Slack to Markdown",
    icon: `svg:<svg viewBox="0 0 208 128" xmlns="http://www.w3.org/2000/svg"><g fill="#000"><path clip-rule="evenodd" d="m15 10c-2.7614 0-5 2.2386-5 5v98c0 2.761 2.2386 5 5 5h178c2.761 0 5-2.239 5-5v-98c0-2.7614-2.239-5-5-5zm-15 5c0-8.28427 6.71573-15 15-15h178c8.284 0 15 6.71573 15 15v98c0 8.284-6.716 15-15 15h-178c-8.28427 0-15-6.716-15-15z" fill-rule="evenodd"/><path d="m30 98v-68h20l20 25 20-25h20v68h-20v-39l-20 25-20-25v39zm125 0-30-33h20v-35h20v35h20z"/></g></svg>`,
    code(input) {
      popclip.copyText(slackMrkdwnToMarkdown(input.text));
    },
  },
];
