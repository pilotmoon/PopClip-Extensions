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
  {
    identifier: "padTables",
    label: "Pad Table Columns",
    description: "Pad cells with spaces so the table's pipes line up in plain text.",
    type: "boolean",
    defaultValue: true,
  },
  {
    identifier: "cellLineBreak",
    label: "Line Breaks in Table Cells",
    description: "Not every Markdown app renders <br> inside a table (Apple Notes does not).",
    type: "multiple",
    values: ["br", "space"],
    valueLabels: ["HTML — <br>", "Space"],
  },
];

// Turndown would otherwise emit the text of <style> and <script> elements,
// which pages often embed inline (Wikipedia puts CSS inside table headers).
function createService(options) {
  return new TurndownService(options).remove(["style", "script"]);
}

// --- Tables ---------------------------------------------------------------

function tag(node) {
  return (node.nodeName || "").toUpperCase();
}

function childElements(node) {
  return Array.from(node.childNodes).filter((n) => n.nodeType === 1);
}

// Rows that belong to this table (not to a nested one), in display order:
// thead rows first, tfoot rows last.
function tableRows(table) {
  const head = [];
  const body = [];
  const foot = [];
  for (const child of childElements(table)) {
    const name = tag(child);
    if (name === "TR") body.push(child);
    else if (name === "THEAD") head.push(...childElements(child).filter((n) => tag(n) === "TR"));
    else if (name === "TBODY") body.push(...childElements(child).filter((n) => tag(n) === "TR"));
    else if (name === "TFOOT") foot.push(...childElements(child).filter((n) => tag(n) === "TR"));
  }
  return [...head, ...body, ...foot];
}

function rowCells(tr) {
  return childElements(tr).filter((n) => tag(n) === "TD" || tag(n) === "TH");
}

function isHeaderRow(tr) {
  const cells = rowCells(tr);
  return tag(tr.parentNode) === "THEAD" || (cells.length > 0 && cells.every((cell) => tag(cell) === "TH"));
}

function spanAttr(cell, name, fallback) {
  const value = parseInt(cell.getAttribute(name), 10);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function cellAlignment(cell) {
  const style = cell.getAttribute("style") || "";
  const match = style.match(/text-align\s*:\s*(left|center|right)/i);
  const align = (match ? match[1] : cell.getAttribute("align") || "").toLowerCase();
  return ["left", "center", "right"].includes(align) ? align : null;
}

// Single-cell tables and tables containing tables are almost always page
// layout, not data. Render their contents as ordinary blocks instead.
function isLayoutTable(table) {
  if (table.querySelector("table")) return true;
  const rows = tableRows(table);
  return rows.length <= 1 && rows.every((tr) => rowCells(tr).length <= 1);
}

function displayWidth(text) {
  return Array.from(text).length;
}

// Inside a table cell only inline Markdown takes effect. Turndown's own
// escaping also covers line-start syntax, which would turn "-5" into "\-5".
function escapeInline(text) {
  return text.replace(/[\\`*_[\]]/g, "\\$&");
}

// Make cell content safe for a one-line GFM table cell.
function flattenCell(markdown, options) {
  const lineBreak = options.cellLineBreak === "space" ? " " : "<br>";
  return markdown
    .replace(/\u00a0/g, " ")
    .trim()
    .replace(/\|/g, "\\|")
    .replace(/\s*\n+\s*/g, lineBreak);
}

function renderTable({ header, body, aligns }, options) {
  const columns = Math.max(header.length, ...body.map((row) => row.length));
  if (columns === 0) return "";
  const rows = [header, ...body].map((row) => Array.from({ length: columns }, (_, c) => row[c] ?? ""));

  const padded = options.padTables !== false;
  const widths = Array.from({ length: columns }, (_, c) =>
    padded ? Math.max(3, ...rows.map((row) => displayWidth(row[c]))) : 3,
  );
  const pad = (text, c) => (padded ? text + " ".repeat(widths[c] - displayWidth(text)) : text);
  const line = (cells) => `| ${cells.join(" | ")} |`;

  const separator = widths.map((width, c) => {
    const align = aligns[c];
    if (align === "center") return `:${"-".repeat(width - 2)}:`;
    if (align === "right") return `${"-".repeat(width - 1)}:`;
    if (align === "left") return `:${"-".repeat(width - 1)}`;
    return "-".repeat(width);
  });

  return [line(rows[0].map(pad)), line(separator), ...rows.slice(1).map((row) => line(row.map(pad)))].join("\n");
}

function tableMarkdown(table, cellService, options) {
  const cellMarkdown = (node) => flattenCell(cellService.turndown(node), options);

  const rows = tableRows(table);
  if (rows.length === 0) return "";

  // Lay cells out on a grid so colspan/rowspan keep later cells in the
  // right column. Each slot records whether a span filled it.
  const grid = rows.map(() => []);
  rows.forEach((tr, r) => {
    let c = 0;
    for (const cell of rowCells(tr)) {
      while (grid[r][c] !== undefined) c++;
      const colspan = Math.min(spanAttr(cell, "colspan", 1) || 1, 1000);
      const rowspanAttr = spanAttr(cell, "rowspan", 1);
      const rowspan = rowspanAttr === 0 ? rows.length - r : Math.min(rowspanAttr, rows.length - r);
      const text = cellMarkdown(cell);
      for (let dr = 0; dr < rowspan; dr++) {
        for (let dc = 0; dc < colspan; dc++) {
          grid[r + dr][c + dc] = {
            text,
            colspan,
            align: cellAlignment(cell),
            isHeader: tag(cell) === "TH",
            rowCopy: dr > 0,
            colCopy: dc > 0,
          };
        }
      }
      c += colspan;
    }
  });

  // GFM allows exactly one header row. The first row is always it, even
  // without <th> cells (typical of spreadsheet copies); further all-<th>
  // rows below it are merged in, e.g. "Latest release" over "Version"
  // becomes "Latest release: Version".
  let headerRows = 1;
  if (isHeaderRow(rows[0])) {
    while (headerRows < rows.length - 1 && isHeaderRow(rows[headerRows])) headerRows++;
  }
  const columns = Math.max(...grid.map((row) => row.length));
  const header = Array.from({ length: columns }, (_, c) => {
    const parts = [];
    for (let r = 0; r < headerRows; r++) {
      const text = grid[r][c]?.text;
      if (text && text !== parts[parts.length - 1]) parts.push(text);
    }
    return parts.join(": ");
  });

  // Markdown has no merged cells, so a merged value is repeated in every
  // cell it covers, keeping each row complete. The exception is a value
  // spanning the full width (a section label or a note), shown once.
  const body = grid.slice(headerRows).map((row) =>
    Array.from({ length: columns }, (_, c) => {
      const slot = row[c];
      return !slot || (slot.colCopy && slot.colspan >= columns) ? "" : slot.text;
    }),
  );

  // Alignment comes from the <td> cells, when those that set one agree.
  // <th> cells are ignored, row headers included: in HTML copied from a
  // browser they carry the browser's default centering (Chrome writes
  // text-align: center onto every <th>).
  const aligns = Array.from({ length: columns }, (_, c) => {
    const found = new Set();
    for (const row of grid.slice(headerRows)) {
      const slot = row[c];
      if (slot && !slot.rowCopy && !slot.colCopy && !slot.isHeader && slot.align) found.add(slot.align);
    }
    return found.size === 1 ? [...found][0] : null;
  });

  const caption = childElements(table).find((n) => tag(n) === "CAPTION");
  const captionText = caption ? cellMarkdown(caption) : "";
  const markdown = renderTable({ header, body, aligns }, options);
  return `${captionText ? `${captionText}\n\n` : ""}${markdown}`;
}

// Data tables are converted before the main Turndown pass and swapped for
// an empty <table data-markdown="..."> placeholder. Converting them inside a
// Turndown rule would not work: the main pass converts the cells first
// (consuming reference-link numbers for discarded output), and every
// TurndownService shares one reference list, so the cell converter would
// flush the page's link definitions into a cell.
function convertDataTables(document, options) {
  // Cells must stay on one line, so links in them are always inline.
  const cellService = createService({ ...options, linkStyle: "inlined" });
  cellService.escape = escapeInline;
  for (const table of Array.from(document.querySelectorAll("table"))) {
    if (isLayoutTable(table)) continue;
    const placeholder = document.createElement("table");
    placeholder.setAttribute("data-markdown", tableMarkdown(table, cellService, options));
    table.replaceWith(placeholder);
  }
}

function addTableRule(service) {
  service.addRule("table", {
    filter: "table",
    replacement(content, node) {
      const markdown = node.getAttribute("data-markdown");
      if (markdown === null) return `\n\n${content}\n\n`; // layout table
      return markdown ? `\n\n${markdown}\n\n` : "";
    },
  });
}

// --------------------------------------------------------------------------

// The raw pasteboard HTML keeps its CSS, so drop what the page hid.
function removeHidden(document) {
  const selector = '[hidden], [style*="display:none"], [style*="display: none"]';
  for (const node of Array.from(document.querySelectorAll(selector))) node.remove();
}

// The text a reader sees, for comparing the raw HTML with the selection.
// linkedom makes the first element of a fragment the document element (a
// leading <meta>, as Chrome writes), so read every top-level node.
function visibleText(html) {
  const { document } = linkedom.parseHTML(html);
  removeHidden(document);
  for (const node of Array.from(document.querySelectorAll("style, script"))) node.remove();
  return Array.from(document.childNodes, (node) => node.textContent || "").join(" ");
}

function htmlToMarkdown(html, options) {
  // generate DOM object from HTML
  function JSDOM(html) {
    return linkedom.parseHTML(html);
  } // facade to work like jsdom
  const { document } = new JSDOM(html);
  removeHidden(document);
  convertDataTables(document, options);
  // extract markdown using turndown
  const turndownService = createService(options);
  addTableRule(turndownService);
  return turndownService.turndown(document);
}

const hasTable = (html) => /<table[\s>]/i.test(html || "");
const letters = (text) => (text || "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

function selectionToMarkdown(input, options) {
  // PopClip sanitizes input.html, and the sanitizer drops colspan and
  // rowspan, which scrambles the columns of any table with merged cells.
  // When there is a table, use the raw pasteboard HTML instead, provided it
  // is the same selection (its text starts like the selected text).
  if (hasTable(input.html)) {
    const raw = input.content?.["public.html"];
    if (hasTable(raw)) {
      const start = letters(input.text).slice(0, 40);
      if (start && letters(visibleText(raw)).includes(start)) return htmlToMarkdown(raw, options);
    }
    return htmlToMarkdown(input.html, options);
  }
  return htmlToMarkdown(input.html, options);
}

exports.action = {
  captureHtml: true,
  code(input, options) {
    popclip.copyText(selectionToMarkdown(input, options));
  },
};
