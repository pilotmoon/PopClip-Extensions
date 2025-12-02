// #popclip
// name: Ollama
// icon: iconify:simple-icons:ollama
// identifier: com.pilotmoon.popclip.extension.ollama
// description: Send the selected text to a local Ollama model.
// app: { name: Ollama, link: 'https://ollama.com/' }
// popclipVersion: 5155
// keywords: ai
// entitlements: [network]

import axios from "axios";

export const options = [
  {
    identifier: "apiroot",
    label: "API Root",
    type: "string",
    defaultValue: "http://127.0.0.1:11434/api",
    description: "Base URL of the Ollama API to use.",
  },
  {
    identifier: "model",
    label: "Model",
    type: "string",
    defaultValue: "",
    description: "Model name, for example `gemma3`.",
  },
  {
    identifier: "systemMessage",
    label: "System Message",
    type: "string",
    description: "Optional system message.",
  },

  {
    identifier: "textMode",
    label: "Response Handling",
    type: "multiple",
    values: ["append", "replace", "copy"],
    valueLabels: ["Append", "Replace", "Copy"],
    defaultValue: "append",
    description:
      "Append the response, replace the selected text, or copy to clipboard.",
  },
  {
    identifier: "resetMinutes",
    label: "Reset Timer (minutes)",
    type: "string",
    description:
      "Reset the conversation if idle for this many minutes. Set blank to disable.",
    defaultValue: "15",
  },
  {
    identifier: "showReset",
    label: "Show Reset Button",
    type: "boolean",
    icon: "broom-icon.svg",
    description: "Show a button to reset the conversation.",
  },
] as const;

type Options = InferOptions<typeof options>;

// typescript interfaces for Ollama API
interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}
interface ResponseData {
  message: Message;
}
interface Response {
  data: ResponseData;
}

// the extension keeps the message history in memory
const messages: Array<Message> = [];

// the last chat date
let lastChat: Date = new Date();

// reset the history
function reset() {
  print("Resetting chat history");
  messages.length = 0;
}

// get the content of the last `n` messages from the chat, trimmed and separated by double newlines
function getTranscript(n: number): string {
  return messages
    .slice(-n)
    .map((m) => m.content.trim())
    .join("\n\n");
}

// the main chat action
const chat: ActionFunction<Options> = async (input, options) => {
  const ollama = axios.create({
    baseURL: `${options.apiroot}`,
  });

  // if the last chat was long enough ago, reset the history
  if (options.resetMinutes.length > 0) {
    const resetInterval = Number.parseInt(options.resetMinutes, 10) * 1000 * 60;
    if (Date.now() - lastChat.getTime() > resetInterval) {
      reset();
    }
  }

  if (messages.length === 0) {
    // add the system message to the start of the conversation
    const systemMessage = options.systemMessage.trim();
    if (systemMessage) {
      messages.push({ role: "system", content: systemMessage });
    }
  }

  // add the new message to the history
  messages.push({ role: "user", content: input.text.trim() });

  // send the whole message history to Ollama
  try {
    const { data }: Response = await ollama.post("chat", {
      model: options.model,
      stream: false,
      messages,
    });

    // add the response to the history
    messages.push(data.message);
    lastChat = new Date();

    // copy?
    let copy = options.textMode === "copy" || popclip.modifiers.shift;

    // append or replace?
    let replace = options.textMode === "replace";
    if (popclip.modifiers.option) {
      // if holding option, toggle append mode
      replace = !replace;
    }

    if (copy) {
      popclip.copyText(getTranscript(1));
    } else if (replace) {
      popclip.pasteText(getTranscript(1));
    } else {
      popclip.pasteText(getTranscript(2));
      popclip.showSuccess();
    }
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
};

export function getErrorInfo(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    // biome-ignore lint/suspicious/noExplicitAny: ideally use zed-like tool here but this is OK
    const response = (error as any).response;
    print(response);
    return `Message from Ollama (code ${response.status}): ${response.data.error}`;
  }
  return String(error);
}

// export the actions
export const actions: Action<Options>[] = [
  {
    title: "Chat",
    code: chat,
  },
  {
    title: "Reset Chat",
    icon: "broom-icon.svg",
    stayVisible: true,
    requirements: ["option-showReset=1"],
    code: reset,
  },
];
