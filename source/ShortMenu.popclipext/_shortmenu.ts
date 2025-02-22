import axios from "axios";
import { replaceRangesAsync } from "@popclip/helpers/replace-ranges";
import { concurrentTransform } from "@popclip/helpers/generator";

export const options = [
	{
		identifier: "apikey",
		label: "API Key",
		type: "secret",
		description:
			"Obtain API key from: https://app.shortmenu.com/settings/api-keys",
	},
	{
		identifier: "domain",
		label: "Domain",
		type: "string",
		description:
			"If you have a custom domain, enter it here. Leave blank to use `shm.to`.",
	},
] as const;

type Options = InferOptions<typeof options>;

// bitly api endpoint
const sm = axios.create({
	baseURL: "https://api.shortmenu.com/",
	headers: { Accept: "application/json" },
});

async function shorten(
	url: string,
	domain: string,
	tags: string[],
	apikey: string,
) {
	print({ apikey });
	const response = await sm.post(
		"links",
		{ destinationUrl: url, domain, tags },
		{ headers: { "X-Api-Key": apikey } },
	);
	print(response.data);
	return response.data.shortUrl;
}

// replace all matched urls with their shortened equivalents, calling duplicates only once
export const action: ActionFunction<Options> = async (input, options) => {
	function shortenWrapped(url: string) {
		return shorten(url, options.domain || "shm.to", [], options.apikey);
	}
	return await replaceRangesAsync(
		input.text,
		input.data.urls.ranges,
		concurrentTransform(input.data.urls, shortenWrapped),
	);
};

export async function test() {
	const key = "XXXX";
	print(await shorten("https://example.com", "shm.to", [], key));
	print(await shorten("https://example.com", "", [], ""));
}
