import axios from "axios";
import { hmac } from "@noble/hashes/hmac";
import { sha1 } from "@noble/hashes/sha1";
import OAuth from "oauth-1.0a";
import { client } from "./client.json";

// Polyfill for TextEncoder
// This does not accept an encoding, and always uses UTF-8.
// TODO: move this into PopClip itself for general use, and remove from this script
function ShimTextEncoder() {}
ShimTextEncoder.prototype.encode = (string, options) => {
	return Buffer.from(string);
};
globalThis.TextEncoder = ShimTextEncoder as any;

// create OAuth instance for signing requests
const oauth = new OAuth({
	consumer: util.clarify(client),
	signature_method: "HMAC-SHA1",
	hash_function(base_string, key) {
		return Buffer.from(hmac(sha1, key, base_string)).toString("base64");
	},
});

// create axios instance for accessing instapaper API
export const instapaper = axios.create();
instapaper.interceptors.request.use(async (config) => {
	const { oauth_token, oauth_token_secret, ...data } = config.data;
	const auth = oauth.authorize(
		{
			url: config.url!,
			method: config.method!.toUpperCase(),
			data,
		},
		{
			key: oauth_token,
			secret: oauth_token_secret,
		},
	);
	config.headers.Authorization = oauth.toHeader(auth).Authorization;
	config.data = new URLSearchParams(data);
	return config;
});
