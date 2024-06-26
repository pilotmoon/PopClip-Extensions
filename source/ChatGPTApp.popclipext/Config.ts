// #popclip
// name: ChatGPT App
// identifier: com.pilotmoon.popclip.extension.chatgpt-app
// description: Send the text to the ChatGPT App.
// popclip version: 4586
// icon: square filled scale=85 iconify:simple-icons:openai
// app: { name: ChatGPT App, link: https://help.openai.com/en/articles/9275200-using-the-chatgpt-macos-app }
// keywords: openai

export const options = [
  {
    identifier: "prompt",
    label: "Prompt",
    type: "string",
    description:
      "Optional prompt to insert before the text. Leave blank for no prompt.",
  },
  {
    identifier: "mode",
    label: "Mode",
    type: "multiple",
    values: ["new", "current"],
    valueLabels: ["New Chat", "Current Chat"],
    description: "Whether to open a new chat or use the current chat.",
    inset: true,
  },
] as const;

type Options = InferOptions<typeof options>;

export const action: ActionFunction<Options> = async (input, options) => {
  let text = input.text.trim();
  if (options.prompt) {
    text = options.prompt.trim() + "\n\n" + text;
  }
  pasteboard.text = text;
  popclip.openUrl("chatgpt://");
  await util.sleep(50);
  if (options.mode === "new") {
    popclip.pressKey("command n");
    await util.sleep(500);
  }
  popclip.pressKey("command v");
  await util.sleep(100);
  popclip.pressKey("return");
};
