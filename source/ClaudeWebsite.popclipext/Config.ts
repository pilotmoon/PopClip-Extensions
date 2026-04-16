// #popclip
// name: Claude Website
// identifier: com.pilotmoon.popclip.extension.claude-website
// description: Start a new chat on the Claude Website.
// icon: iconify:simple-icons:claude
// app: { name: Claude Website, link: 'https://claude.ai/' }
// popclip version: 4586
// keywords: anthropic claude
// language: typescript
// module: true

const options = [
  {
    identifier: "prompt",
    label: "Prompt",
    type: "string",
    description:
      "Optional prompt to insert before the text. Leave blank for no prompt.",
  },
] as const;

defineExtension<InferOptions<typeof options>>({
  options,
  regex: /^.{1,8000}$/s, // URL handoff becomes unreliable with much longer inputs
  action: (input, options) => {
    openSite(prepareText(input.text, options.prompt));
  },
});

function openSite(text: string) {
  const url = new URL("https://claude.ai/new");
  url.searchParams.append("q", text.trim());
  popclip.openUrl(url);
}

function prepareText(text: string, prompt: string) {
  text = text.trim();
  prompt = prompt.trim();
  if (prompt) {
    text = `${prompt}\n\n${text}`;
  }
  return text;
}
