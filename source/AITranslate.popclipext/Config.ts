// #popclip
// name: AI Translate
// icon: wand-icon.svg
// identifier: com.hiiamtrong.popclip.extension.aitranslate
// description: Translate or improve selected text using an OpenAI-compatible API.
// app: { name: Chat API, link: 'https://platform.openai.com/docs/api-reference/chat' }
// popclipVersion: 4586
// keywords: ai translate improve openai
// entitlements: [network]

import axios from "axios";

export const options = [
  {
    identifier: "apikey",
    label: "API Key",
    type: "secret",
    description: "Obtain an API key from your provider.",
  },
  {
    identifier: "model",
    label: "Model",
    type: "multiple",
    defaultValue: "gpt-4.1-nano",
    values: [
      "gpt-4.1",
      "gpt-4.1-mini",
      "gpt-4.1-nano",
      "gpt-5",
      "gpt-5-mini",
      "gpt-5-nano",
      "o3",
      "o4-mini",
    ],
  },
  {
    identifier: "customModel",
    label: "Custom Model",
    type: "string",
    description: "Will override 'Model'. Model list: https://platform.openai.com/docs/pricing",
  },
  {
    identifier: "domain",
    label: "API Base Domain",
    type: "string",
    defaultValue: "api.openai.com/v1",
    description: "Leave as default unless you use a custom server (e.g. api.groq.com/openai/v1).",
  },
  {
    identifier: "primaryLang",
    label: "Primary Language",
    type: "string",
    defaultValue: "English",
    description: "Your primary language. Text in this language will be translated to the target language, and vice versa.",
  },
  {
    identifier: "secondaryLang",
    label: "Secondary Language",
    type: "string",
    defaultValue: "Spanish",
    description: "The other language to translate to/from.",
  },
  {
    identifier: "translateMode",
    label: "Translate: Response Handling",
    type: "multiple",
    values: ["replace", "append", "copy"],
    valueLabels: ["Replace", "Append", "Copy"],
    defaultValue: "replace",
  },
  {
    identifier: "translateInstructions",
    label: "Translate: Additional Instructions",
    type: "string",
    description: "Extra instructions appended to the system prompt. E.g. 'Keep original formatting. Do not translate code or URLs. Use natural phrasing.'",
  },
  {
    identifier: "improveMode",
    label: "Improve: Response Handling",
    type: "multiple",
    values: ["replace", "append", "copy"],
    valueLabels: ["Replace", "Append", "Copy"],
    defaultValue: "replace",
  },
  {
    identifier: "improveInstructions",
    label: "Improve: Additional Instructions",
    type: "string",
    description: "Extra instructions appended to the system prompt. E.g. 'Be concise. Use professional tone.'",
  },
] as const;

type Options = InferOptions<typeof options>;

interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}
interface ResponseData {
  choices: [{ message: Message }];
}
interface Response {
  data: ResponseData;
}

export function getErrorInfo(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    // biome-ignore lint/suspicious/noExplicitAny: provider error shape varies
    const response = (error as any).response;
    return `Error (code ${response.status}): ${response.data.error.message}`;
  }
  return String(error);
}

function createClient(options: Options) {
  return axios.create({
    baseURL: `https://${options.domain.replace(/\/$/, "")}/`,
    headers: { Authorization: `Bearer ${options.apikey}` },
  });
}

function handleResponse(inputText: string, responseText: string, mode: string) {
  const copy = mode === "copy" || popclip.modifiers.shift;
  const replace = mode === "replace";

  if (copy) {
    popclip.copyText(responseText);
  } else if (replace) {
    popclip.pasteText(responseText);
  } else {
    // append mode: replace selection with original + response
    popclip.pasteText(`${inputText}\n\n${responseText}`);
    popclip.showSuccess();
  }
  // debug: remove after testing
  // print(`[AITranslate] input="${inputText}" response="${responseText}" mode="${mode}"`);
}

async function callAPI(options: Options, systemPrompt: string, inputText: string, mode: string) {
  const client = createClient(options);
  const messages: Message[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: inputText },
  ];
  try {
    const { data }: Response = await client.post("chat/completions", {
      model: options.customModel || options.model || "gpt-4.1-nano",
      messages,
    });
    handleResponse(inputText, data.choices[0].message.content.trim(), mode);
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
}

const DEFAULT_TRANSLATE_PROMPT =
  "You are a translator. Detect the language of the text. If it is {primaryLang}, translate it to {secondaryLang}. Otherwise, translate it to {primaryLang}. Return ONLY the translated text, no explanation.";

const translate: ActionFunction<Options> = async (input, options) => {
  const base = DEFAULT_TRANSLATE_PROMPT
    .replaceAll("{primaryLang}", options.primaryLang)
    .replaceAll("{secondaryLang}", options.secondaryLang);
  const instructions = options.translateInstructions.trim();
  const systemPrompt = instructions ? `${base}\n${instructions}` : base;
  await callAPI(options, systemPrompt, input.text.trim(), options.translateMode);
};

const DEFAULT_IMPROVE_PROMPT =
  "You are a writing assistant. Improve the grammar, clarity, and style of the text. Keep the same language. Return ONLY the improved text, no explanation.";

const improve: ActionFunction<Options> = async (input, options) => {
  const instructions = options.improveInstructions.trim();
  const systemPrompt = instructions ? `${DEFAULT_IMPROVE_PROMPT}\n${instructions}` : DEFAULT_IMPROVE_PROMPT;
  await callAPI(options, systemPrompt, input.text.trim(), options.improveMode);
};

export const actions: Action<Options>[] = [
  {
    title: "Translate",
    icon: "symbol:translate",
    code: translate,
  },
  {
    title: "Improve",
    icon: "symbol:wand.and.stars",
    code: improve,
  },
];
