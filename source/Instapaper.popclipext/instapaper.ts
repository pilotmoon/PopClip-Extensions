import axios from "axios";
import OAuth from "oauth-1.0a";
import { client } from "./client.json";

// create OAuth instance for signing requests
const oauth = new OAuth({
	consumer: util.clarify(client),
	signature_method: "HMAC-SHA1",
	hash_function(base_string, key) {
		return Buffer.from(
			util.hmac(Buffer.from(base_string), Buffer.from(key), "sha1"),
		).toString("base64");
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
