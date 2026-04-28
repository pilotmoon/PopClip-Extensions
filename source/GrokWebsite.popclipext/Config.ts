// #popclip
// name: Grok Website
// identifier: com.pilotmoon.popclip.extension.grok-website
// description: Start a new chat on the Grok Website.
// icon: iconify:bxl:grok
// app: { name: Grok Website, link: 'https://grok.com/' }
// popclip version: 4586
// keywords: xai grok
// language: typescript
// module: true

const grokWebsiteOptions = [
  {
    identifier: "prompt",
    label: "Prompt",
    type: "string",
    description:
      "Optional prompt to insert before the text. Leave blank for no prompt.",
  },
] as const;

defineExtension<InferOptions<typeof grokWebsiteOptions>>({
  options: grokWebsiteOptions,
  regex: /^.{1,8000}$/s, // URL handoff becomes unreliable with much longer inputs
  action: (input, options) => {
    openGrokWebsite(prepareGrokWebsiteText(input.text, options.prompt));
  },
});

function openGrokWebsite(text: string) {
  const url = new URL("https://grok.com/");
  url.searchParams.append("q", text.trim());
  popclip.openUrl(url);
}

function prepareGrokWebsiteText(text: string, prompt: string) {
  text = text.trim();
  prompt = prompt.trim();
  if (prompt) {
    text = `${prompt}\n\n${text}`;
  }
  return text;
}
