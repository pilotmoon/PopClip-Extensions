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
	print({ data });
	return data;
};

export const action: Action = {
	requirements: ["url"],
	code(input, options, context) {
		const auth = Object.fromEntries(new URLSearchParams(options.authsecret));
		return instapaper.post("https://www.instapaper.com/api/1/bookmarks/add", {
			url: input.data.urls[0],
			title: context.browserUrl,
			...auth,
		});
	},
};
