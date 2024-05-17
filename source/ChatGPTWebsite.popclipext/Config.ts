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

const modelOption: Option = {
	identifier: "model",
	label: "Model",
	type: "multiple",
	values: ["", "gpt-4", "gpt-4o"],
	valueLabels: ["Default", "GPT-4", "GPT-4o"],
};

const gptOption: Option = {
	identifier: "customGpt",
	label: "Custom GPT identifier",
	type: "string",
	description:
		"Optional: identifier of custom GPT to use, for example `g-HMNcP6w7d-data-analyst`. Leave blank for none.",
};

const promptOption: Option = {
	identifier: "prompt",
	label: "Prompt",
	type: "string",
	description:
		"Optional prompt to insert before the text. Leave blank for no prompt.",
};

function openSite(text: string, model: string, customGpt: string) {
	let url = new URL("https://chatgpt.com/");
	if (customGpt) {
		url.pathname = `/g/${customGpt}`;
	}
	url.searchParams.append("q", text.trim());
	if (model) {
		url.searchParams.append("model", model);
	}
	popclip.openUrl(url.href);
}

function prepareText(text: string, prompt: string) {
	// Add prompt if provided
	prompt = prompt.trim();
	if (prompt) {
		text = `${prompt}\n\nText: """\n${text}\n"""\n`;
	}
	return text;
}

export default {
	options: [modelOption, gptOption, promptOption],
	action: () =>
		openSite(
			prepareText(popclip.input.text, popclip.options.prompt as string),
			popclip.options.model as string,
			popclip.options.customGpt as string,
		),
};
