// #popclip
// name: MarkdownMate
// identifier: com.pilotmoon.popclip.extension.markdownmate
// description: Create a new MarkdownMate note from the selected text, with formatting converted to Markdown.
// keywords: markdown notes
// popclip version: 6260
// captureHtml: true
// icon: markdownmate.svg
// app:
//   name: MarkdownMate
//   link: https://markdownmate.homielab.com/
//   bundleIdentifier: com.homielab.MarkdownMate
//   checkInstalled: true

export function action(input: Input) {
  // Option sends the plain text, e.g. for Markdown source shown on a web page
  const text = popclip.modifiers.option ? input.text : input.markdown;
  createNote(text.trim());
}

function createNote(text: string) {
  const url = new URL("markdownmate://create");
  url.searchParams.set("text", text);
  popclip.openUrl(url);
}

export function test() {
  createNote(
    "# Hello\n\nSome **bold** text with a [link](https://example.com/?a=1&b=2).",
  );
}
