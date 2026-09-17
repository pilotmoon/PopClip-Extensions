// #popclip
// name: UpNote
// identifier: com.pilotmoon.popclip.extension.upnote
// description: Create a new note, append to a specific note, or create in a specific notebook in UpNote.
// app: { name: UpNote, link: https://getupnote.com/ }
// popclipVersion: 4586
// icon: upnote.svg
// captureHtml: true
// entitlements: [script]

export const options = [
  {
    identifier: "targetNote",
    label: "Target Note URL or ID",
    type: "string",
    description:
      "Right-click the target note in UpNote, choose 'Copy Link to Note' and paste here (e.g. upnote://x-callback-url/openNote?noteId=... or note UUID).",
  },
  {
    identifier: "targetNotebook",
    label: "Target Notebook Name",
    type: "string",
    description:
      "The name of the target notebook in UpNote (e.g. 'Inbox' or 'Parent/Child Notebook'). Used for 'New Note in Notebook' action.",
  },
  {
    identifier: "sourceLink",
    label: "Include Source Link",
    type: "boolean",
    defaultValue: true,
    description:
      "Append source webpage title and link if the selection is from a web browser.",
  },
  {
    identifier: "includeTimestamp",
    label: "Include Timestamp",
    type: "boolean",
    defaultValue: false,
    description:
      "Prepend timestamp (e.g. - 14:30) to the appended or created content.",
  },
] as const;

type Options = InferOptions<typeof options>;

function extractNoteId(value: string): string {
  if (!value) return "";
  const match = value.match(/noteId=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  return value.trim();
}

function formatContent(
  input: Input,
  options: Options,
  context: Context,
): string {
  let content = (input.markdown || input.text || "").trim();
  if (options.includeTimestamp) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    content = `- ${timeStr} ${content}`;
  }
  if (options.sourceLink && context?.browserUrl) {
    const title = context?.browserTitle || "source";
    content += `\n\n[${title}](${context.browserUrl})`;
  }
  return content;
}

function newNote(input: Input, options: Options, context: Context) {
  try {
    const content = formatContent(input, options, context);
    const url = new URL("upnote://x-callback-url/note/new");
    url.searchParams.set("text", content);
    url.searchParams.set("markdown", "true");
    popclip.openUrl(url.href, { app: "com.getupnote.desktop", activate: true });
    popclip.showSuccess();
  } catch (err: any) {
    popclip.showText("Error: " + (err?.message || String(err)));
  }
}

function newNoteInNotebook(
  input: Input,
  options: Options,
  context: Context,
) {
  try {
    const notebook = (options.targetNotebook || "").trim();
    if (!notebook) {
      popclip.showText("Please specify Target Notebook Name in settings");
      return;
    }
    const content = formatContent(input, options, context);
    const url = new URL("upnote://x-callback-url/note/new");
    url.searchParams.set("notebook", notebook);
    url.searchParams.set("text", content);
    url.searchParams.set("markdown", "true");
    popclip.openUrl(url.href, { app: "com.getupnote.desktop", activate: true });
    popclip.showSuccess();
  } catch (err: any) {
    popclip.showText("Error: " + (err?.message || String(err)));
  }
}

async function appendToNote(
  input: Input,
  options: Options,
  context: Context,
) {
  try {
    const target = (options.targetNote || "").trim();
    if (!target) {
      popclip.showText("Please specify Target Note URL or ID in settings");
      return;
    }
    const noteId = extractNoteId(target);
    if (!noteId) {
      popclip.showText("Invalid Note ID");
      return;
    }

    const content = formatContent(input, options, context);

    // Append to note: prepend newline to clipboard content to create a clear separation
    pasteboard.text = "\n" + content;

    // Open target note in UpNote and activate
    await popclip.openUrl(
      `upnote://x-callback-url/openNote?noteId=${encodeURIComponent(noteId)}`,
      { app: "com.getupnote.desktop", activate: true },
    );

    // Ensure UpNote application window is focused
    try {
      await popclip.runAppleScript('tell application "UpNote" to activate');
    } catch (_) {}

    // Wait for note rendering
    await util.sleep(700);

    // Jump to the end of note
    await popclip.pressKey("command down");
    await util.sleep(120);

    // Insert newline
    await popclip.pressKey("return");
    await util.sleep(120);

    // Paste content
    await popclip.pressKey("command v");
    await util.sleep(200);

    popclip.showSuccess();
  } catch (err: any) {
    popclip.showText("Error: " + (err?.message || String(err)));
  }
}

export const actions: Action<Options>[] = [
  {
    title: "UpNote New Note",
    icon: "upnote.svg",
    captureHtml: true,
    code(input, options, context) {
      newNote(input, options, context);
    },
  },
  {
    title: "UpNote Append to Note",
    icon: "symbol:doc.badge.plus",
    captureHtml: true,
    async code(input, options, context) {
      await appendToNote(input, options, context);
    },
  },
  {
    title: "UpNote New Note in Notebook",
    icon: "symbol:folder.badge.plus",
    captureHtml: true,
    code(input, options, context) {
      newNoteInNotebook(input, options, context);
    },
  },
];
