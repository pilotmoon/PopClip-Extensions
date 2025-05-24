// #popclip
// name: Roam Research
// identifier: com.pilotmoon.popclip.extension.roamresearch
// description: Capture text to Roam Research.
// popclip version: 4586
// app: { name: Roam Research, link: https://roamresearch.com/ }
// icon: iconify:simple-icons:roamresearch
// entitlements: ["network"]

import axios from "axios";

const options: Option[] = [
	{
		identifier: "apiToken",
		label: "API Token (required)",
		type: "secret",
		description:
			"An `append-only` API token from Roam Research. See this extension's README for instructions.",
	},
	{
		identifier: "graphName",
		label: "Graph Name (required)",
		type: "string",
		description: "Name of the hosted graph.",
	},
	{
		identifier: "pageTitle",
		label: "Page Title",
		type: "string",
		description:
			"Optional destination page. Leave blank to use Daily Note page.",
	},
	{
		identifier: "nestUnder",
		label: "Nest Under",
		type: "string",
		description:
			"Optional text to nest captures under. Leave blank to append to the page root.",
	},
];

interface RoamOptions {
	apiToken: string;
	graphName: string;
	pageTitle: string;
	nestUnder: string;
}

function api(options: RoamOptions) {
	return axios.create({
		baseURL: "https://append-api.roamresearch.com/",
		headers: {
			Authorization: `Bearer ${options.apiToken}`,
		},
	});
}

function dailyNoteDate() {
	const date = new Date();
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${month}-${day}-${year}`;
}

const action: Action<RoamOptions> = {
	captureHtml: true,
	async code(input, options, context) {
		// check for required options
		if (!options.apiToken || !options.graphName) {
			throw new Error("API Key and graph name are required.");
		}

		// add source URL if available
		let string = input.markdown.trim();
		if (context.browserUrl) {
			string += `\n- Source: ${context.browserUrl}`;
		}

		// post to API
		await api(options).post(`api/graph/${options.graphName}/append-blocks`, {
			location: {
				page: {
					title: options.pageTitle || { "daily-note-page": dailyNoteDate() },
				},
				"nest-under": options.nestUnder
					? { string: options.nestUnder }
					: undefined,
			},
			"append-data": [{ string }],
		});

		popclip.showSuccess();
	},
};

export { options, action };
