// #popclip
// name: ChatGPT Website
// identifier: com.pilotmoon.popclip.extension.chatgpt-website
// description: Start a new chat on the ChatGPT Website.
// icon: square filled scale=85 iconify:simple-icons:openai
// app: { name: ChatGPT Website, link: 'https://chatgpt.com/' }
// popclip version: 4586
// keywords: openai
// language: typescript
// module: true

export const options = [
  {
    identifier: "model",
    label: "Model",
    type: "multiple",
    values: [
      "",
      "gpt-4o",
      "o3",
      "o4-mini",
      "o4-mini-high",
      "gpt-4-5",
      "gpt-4-1",
      "gpt-4-1-mini",
    ],
    valueLabels: [
      "Default",
      "GPT-4o",
      "o3",
      "o4-mini",
      "o4-mini-high",
      "GPT-4.5",
      "GPT-4.1",
      "GPT-4.1-mini",
    ],
  },
  {
    identifier: "prompt",
    label: "Prompt",
    type: "string",
    description:
      "Optional prompt to insert before the text. Leave blank for no prompt.",
  },
  {
    identifier: "temporary",
    label: "Temporary Chat",
    type: "boolean",
    defaultValue: false,
    description: "Whether to open the chat in temporary mode by default.",
  },
] as const;

type Options = InferOptions<typeof options>;

function openSite(text: string, model: string, temporary: boolean) {
  let url = new URL("https://chatgpt.com/");
  url.searchParams.append("q", text.trim());
  if (model) {
    url.searchParams.append("model", model);
  }
  if (temporary) {
    url.searchParams.append("temporary-chat", "true");
  }
  popclip.openUrl(url.href);
}

function prepareText(text: string, prompt: string) {
  // Add prompt if provided
  text = text.trim();
  prompt = prompt.trim();
  if (prompt) {
    text = `${prompt}\n\n${text}`;
  }
  return text;
}

export const regex = /^.{1,8000}$/s; // Allow up to 8000 characters since the website can't handle much longer inputs

export const action: ActionFunction<Options> = (input, options) => {
  const temporary = popclip.modifiers.option
    ? !options.temporary
    : options.temporary;
  openSite(prepareText(input.text, options.prompt), options.model, temporary);
};
