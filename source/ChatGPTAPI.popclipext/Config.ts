// #popclip
// name: ChatGPT API
// icon: openai-icon.svg
// identifier: com.pilotmoon.popclip.extension.chatgpt
// description: Send the selected text to OpenAI's Chat API and append the response.
// app: { name: Chat API, link: 'https://platform.openai.com/docs/api-reference/chat' }
// popclipVersion: 4586
// entitlements: [network]

import axios from "axios";

export const options: Option[] = [
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
		defaultValue: "gpt-3.5-turbo",
		values: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo", "gpt-4o"],
	},
	{
		identifier: "prompt",
		label: "Prompt",
		type: "string",
		description:
			"Optional prompt to add before the first message of a new chat. Leave blank for no prompt.",
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
];

type OptionsShape = {
	resetMinutes: string;
	apikey: string;
	model: string;
	prompt: string;
	showReset: boolean;
};

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
const chat: ActionFunction<OptionsShape> = async (input, options) => {
	const openai = axios.create({
		baseURL: "https://api.openai.com/v1",
		headers: { Authorization: `Bearer ${options.apikey}` },
	});

	// if the last chat was long enough ago, reset the history
	if (options.resetMinutes.length > 0) {
		const resetInterval = parseInt(options.resetMinutes) * 1000 * 60;
		if (new Date().getTime() - lastChat.getTime() > resetInterval) {
			reset();
		}
	}

	// insert prompt if this is the first message and a prompt is provided
	let content = input.text;
	let prompt = options.prompt.trim();
	if (prompt && messages.length === 0) {
		content = `${prompt.trim()}\n\nText: """\n${content}\n"""\n`;
	}

	// add the new message to the history
	messages.push({ role: "user", content });

	// send the whole message history to OpenAI
	try {
		const { data }: Response = await openai.post("chat/completions", {
			model: options.model || "gpt-3.5-turbo",
			messages,
		});

		// add the response to the history
		messages.push(data.choices[0].message);
		lastChat = new Date();

		// if holding shift and alt, paste just the response.
		// if holding shift, copy just the response.
		// else, paste the last input and response.
		if (popclip.modifiers.shift && popclip.modifiers.option) {
			popclip.pasteText(getTranscript(1));
		} else if (popclip.modifiers.shift) {
			popclip.copyText(getTranscript(1));
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
export const actions: Action<OptionsShape>[] = [
	{
		title: "ChatGPT: Chat",
		code: chat,
	},
	{
		title: "ChatGPT: Reset",
		icon: "broom-icon.svg",
		stayVisible: true,
		requirements: ["option-showReset=1"],
		code: reset,
	},
];
