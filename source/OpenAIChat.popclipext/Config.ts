// #popclip
// name: OpenAI Chat
// icon: openai-icon.svg
// identifier: com.pilotmoon.popclip.extension.chatgpt
// description: Send the selected text to OpenAI's Chat API.
// app: { name: Chat API, link: 'https://platform.openai.com/docs/api-reference/chat' }
// popclipVersion: 4586
// keywords: openai chatgpt
// entitlements: [network]

import axios from "axios";

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
		defaultValue: "gpt-4o-mini",
		values: ["gpt-4o", "gpt-4o-mini", "o1", "o1-mini", "o3-mini"],
	},
	{
		identifier: "systemMessage",
		label: "System Message",
		type: "string",
		description:
			"Optional system message to specify the behaviour of the AI assistant.",
	},
	{
		identifier: "domain",
		label: "API Base Domain",
		type: "string",
		defaultValue: "api.openai.com",
		description: "Leave as default unless you use a custom server.",
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

// typescript interfaces for OpenAI API
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
	const openai = axios.create({
		baseURL: `https://${options.domain}/v1`,
		headers: { Authorization: `Bearer ${options.apikey}` },
	});

	// if the last chat was long enough ago, reset the history
	if (options.resetMinutes.length > 0) {
		const resetInterval = parseInt(options.resetMinutes) * 1000 * 60;
		if (new Date().getTime() - lastChat.getTime() > resetInterval) {
			reset();
		}
	}

	if (messages.length === 0) {
		// add the system message to the start of the conversation
		let systemMessage = options.systemMessage.trim();
		if (systemMessage) {
			messages.push({ role: "system", content: systemMessage });
		}
	}

	// add the new message to the history
	messages.push({ role: "user", content: input.text.trim() });

	// send the whole message history to OpenAI
	try {
		const { data }: Response = await openai.post("chat/completions", {
			model: options.model || "gpt-3.5-turbo",
			messages,
		});

		// add the response to the history
		messages.push(data.choices[0].message);
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
		const response = (error as any).response;
		return `Message from OpenAI (code ${response.status}): ${response.data.error.message}`;
	} else {
		return String(error);
	}
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
