// #popclip
// name: Instapaper
// identifier: com.pilotmoon.popclip.extension.instapaper
// description: Save a URL to read later with Instapaper.
// popclip version: 4688
// icon: i.png
// app: { name: Instapaper, link: https://www.instapaper.com/ }
// entitlements: [network]

import { instapaper } from "./instapaper.ts";
export const options: Option[] = [
	{
		identifier: "username",
		label: "Email",
		type: "string",
	},
	{
		identifier: "password",
		label: "Password",
		type: "password",
	},
];

export const auth: AuthFunction = async (info, flow) => {
	const { data } = await instapaper.post(
		"https://www.instapaper.com/api/1/oauth/access_token",
		{
			x_auth_username: info.username,
			x_auth_password: info.password,
			x_auth_mode: "client_auth",
		},
	);
	return data;
};

export const action: Action = {
	requirements: ["url"],
	async code(input, options) {
		const auth = Object.fromEntries(new URLSearchParams(options.authsecret));
		await instapaper.post("https://www.instapaper.com/api/1/bookmarks/add", {
			url: input.data.urls[0],
			...auth,
		});
		popclip.showSuccess();
	},
};
