function decodeEntities(value) {
  const entities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: "\""
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, function(match, entity) {
    if (entity[0] === "#") {
      const radix = entity[1].toLowerCase() === "x" ? 16 : 10;
      const code = parseInt(entity.replace(/^#x?/i, ""), radix);
      return isNaN(code) ? match : String.fromCharCode(code);
    }

    return entities[entity.toLowerCase()] || match;
  });
}

function cellToMarkdown(html) {
  return decodeEntities(html)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p\s*>/gi, " ")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .replace(/\|/g, "\\|")
    .trim();
}

function tableToMarkdown(tableHtml) {
  const rows = [];
  const rowMatches = tableHtml.match(/<tr\b[\s\S]*?<\/tr>/gi) || [];

  for (const rowHtml of rowMatches) {
    const cells = [];
    const cellRegex = /<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi;
    let match;

    while ((match = cellRegex.exec(rowHtml)) !== null) {
      cells.push(cellToMarkdown(match[1]));
    }

    if (cells.length > 0) {
      rows.push(cells);
    }
  }

  if (rows.length === 0) {
    return "";
  }

  const columnCount = rows.reduce(function(max, row) {
    return Math.max(max, row.length);
  }, 0);

  const normalizedRows = rows.map(function(row) {
    const normalized = row.slice();
    while (normalized.length < columnCount) {
      normalized.push("");
    }
    return normalized;
  });

  const separator = [];
  for (let index = 0; index < columnCount; index++) {
    separator.push("---");
  }

  return [
    "| " + normalizedRows[0].join(" | ") + " |",
    "| " + separator.join(" | ") + " |"
  ].concat(normalizedRows.slice(1).map(function(row) {
    return "| " + row.join(" | ") + " |";
  })).join("\n");
}

function htmlToMarkdownWithTables(html) {
  const converted = decodeEntities(html)
    .replace(/<table\b[\s\S]*?<\/table>/gi, function(tableHtml) {
      return "\n\n" + tableToMarkdown(tableHtml) + "\n\n";
    })
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, function(match, level, content) {
      const prefix = "#".repeat(parseInt(level, 10));
      return "\n\n" + prefix + " " + cellToMarkdown(content) + "\n\n";
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|header|footer|h[1-6]|li)\s*>/gi, "\n")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, "_$2_")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return converted || popclip.input.markdown || popclip.input.text;
}

const html = popclip.input.html || "";
let markdown = /<table\b/i.test(html)
  ? htmlToMarkdownWithTables(html)
  : (popclip.input.markdown || popclip.input.text);

const browserUrl = popclip.context.browserUrl;
const browserTitle = popclip.context.browserTitle || "Source";

if (browserUrl) {
  markdown += "\n\n---\n\nSource: [" + browserTitle + "](" + browserUrl + ")";
}

const url = "bear://x-callback-url/create"
  + "?text=" + encodeURIComponent(markdown)
  + "&open_note=yes"
  + "&edit=yes";

popclip.openUrl(url);
