// #popclip
// name: OpenAI Prompt
// icon: openai-icon.svg
// identifier: com.pilotmoon.popclip.extension.openaiprompt
// description: Apply custom instructions to selected text with OpenAI.
// app: { name: Chat API, link: 'https://platform.openai.com/docs/api-reference/chat' }
// popclipVersion: 6221
// keywords: openai prompt ai rewrite translate summarize
// entitlements: [network]

import axios from "axios";
import * as v from "valibot";

const defaultModel = "gpt-5.6-luna";

export const options = [
  {
    identifier: "apikey",
    label: "API Key",
    type: "secret",
    description:
      "Obtain an API key from: https://platform.openai.com/account/api-keys",
  },
  {
    identifier: "model",
    label: "Model",
    type: "multiple",
    defaultValue: defaultModel,
    values: ["gpt-5.6-luna", "gpt-5.6-terra", "gpt-5.6-sol", "gpt-6-astra"],
    allowOther: true,
    description:
      "Choose Other… to enter a model name. [Models and pricing](https://developers.openai.com/api/docs/models)",
  },
  {
    identifier: "reasoningEffort",
    label: "Thinking Effort",
    type: "multiple",
    values: ["default", "none", "low", "medium", "high", "xhigh", "max"],
    valueLabels: [
      "Model default",
      "None",
      "Low",
      "Medium",
      "High",
      "Extra high",
      "Maximum",
    ],
    defaultValue: "default",
    description:
      "Higher effort can take longer and cost more. Supported levels depend on the model and provider. GPT-6 Astra requires Low or higher. Choose Model default for compatibility.",
  },
  {
    identifier: "verbosity",
    label: "Response Detail",
    type: "multiple",
    values: ["default", "low", "medium", "high"],
    valueLabels: ["Model default", "Concise", "Normal", "Detailed"],
    defaultValue: "default",
    description:
      "Control how much explanation appears in the response. Choose Model default if your model or provider does not support this setting.",
  },
  {
    identifier: "instructions",
    label: "Instructions",
    type: "string",
    multiline: true,
    description:
      "Optional instructions applied to every request, such as how to rewrite or translate the selected text.",
  },
  {
    identifier: "domain",
    label: "API Base Domain",
    type: "string",
    defaultValue: "api.openai.com/v1",
    description:
      "Leave as default (api.openai.com/v1) unless you use a custom server.",
  },
  {
    identifier: "textMode",
    label: "Response Handling",
    type: "multiple",
    values: ["replace", "copy"],
    valueLabels: ["Replace", "Copy"],
    defaultValue: "replace",
    description:
      "Replace the selected text with the response, or copy it to the clipboard.",
  },
] as const;

type Options = InferOptions<typeof options>;

interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}

const responseSchema = v.object({
  choices: v.pipe(
    v.array(
      v.object({
        finish_reason: v.string(),
        message: v.object({
          content: v.nullish(v.string()),
          refusal: v.nullish(v.string()),
        }),
      }),
    ),
    v.minLength(1),
  ),
});

function readResponse(data: unknown): string {
  const result = v.safeParse(responseSchema, data);
  if (!result.success) {
    throw new Error("The provider returned an invalid chat response.");
  }
  const choice = result.output.choices[0];
  if (choice.message.refusal) {
    throw new Error(
      `The model declined this request: ${choice.message.refusal}`,
    );
  }
  if (choice.finish_reason === "length") {
    throw new Error(
      "The response was cut short by the model's token limit. Try a shorter request or lower thinking effort.",
    );
  }
  if (choice.finish_reason === "content_filter") {
    throw new Error(
      "The provider blocked this response with its content filter.",
    );
  }
  if (choice.finish_reason !== "stop") {
    throw new Error(
      `The provider returned an unsupported response (${choice.finish_reason}). Choose a model that returns text without tools.`,
    );
  }
  const text = choice.message.content?.trim();
  if (!text) {
    throw new Error("The provider returned an empty response.");
  }
  return text;
}

export function getErrorInfo(error: unknown): string {
  const result = v.safeParse(
    v.object({
      response: v.object({
        status: v.number(),
        data: v.optional(v.unknown()),
      }),
    }),
    error,
  );
  if (result.success) {
    const { status, data } = result.output.response;
    const detail = v.safeParse(
      v.object({ error: v.object({ message: v.string() }) }),
      data,
    );
    const message = detail.success
      ? detail.output.error.message
      : "The provider could not complete the request. Check your API settings and try again.";
    return `Message from API provider (code ${status}): ${message}`;
  }
  return error instanceof Error ? error.message : String(error);
}

// Each action set retains only its last response. Tests replace external I/O.
export type PromptUI = Pick<
  PopClip,
  "modifiers" | "copyText" | "pasteText" | "showText" | "settingsRequiredError"
>;

export interface PromptRequest {
  model: string;
  messages: Message[];
  reasoning_effort?: string;
  verbosity?: string;
}

type SendRequest = (
  domain: string,
  apiKey: string,
  body: PromptRequest,
) => Promise<unknown>;

export function createActions(
  ui: () => PromptUI = () => popclip,
  sendRequest: SendRequest = async (domain, apiKey, body) => {
    const openai = axios.create({
      baseURL: `https://${domain}`,
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const { data } = await openai.post("chat/completions", body);
    return data;
  },
): Action<Options>[] {
  let lastResponse = "";

  const prompt: ActionFunction<Options> = async (input, options) => {
    const model = options.model.trim() || defaultModel;
    const domain = options.domain.trim().replace(/\/+$/, "");
    if (
      domain === "api.openai.com/v1" &&
      /^gpt-6-astra(?:$|-)/.test(model) &&
      options.reasoningEffort === "none"
    ) {
      throw ui().settingsRequiredError(
        "GPT-6 Astra requires Low thinking effort or higher. Choose Model default or another effort level.",
      );
    }

    const userMessage: Message = { role: "user", content: input.text.trim() };
    const instructions = options.instructions.trim();
    const requestMessages: Message[] = instructions
      ? [{ role: "system", content: instructions }, userMessage]
      : [userMessage];
    // Capture modifiers before awaiting the network request.
    const copy = options.textMode === "copy" || ui().modifiers.shift;

    try {
      const data = await sendRequest(domain, options.apikey, {
        model,
        messages: requestMessages,
        ...(options.reasoningEffort && options.reasoningEffort !== "default"
          ? { reasoning_effort: options.reasoningEffort }
          : {}),
        ...(options.verbosity && options.verbosity !== "default"
          ? { verbosity: options.verbosity }
          : {}),
      });
      const text = readResponse(data);
      lastResponse = text;
      if (copy) {
        await ui().copyText(text);
      } else {
        await ui().pasteText(text);
      }
    } catch (error) {
      ui().showText(getErrorInfo(error));
    }
  };

  return [
    {
      title: "Prompt",
      code: prompt,
      submenu: [
        {
          title: "Copy Last Response",
          code: async () => {
            if (lastResponse) {
              await ui().copyText(lastResponse);
            } else {
              ui().showText("No response to copy yet.");
            }
          },
        },
      ],
    },
  ];
}

export const actions = createActions();
