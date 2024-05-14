// #popclip
// name: Messages
// description: Create a new message in the Messages app.
// identifier: com.pilotmoon.popclip.extension.messages
// icon: message.png
// popclipVersion: 4586

export function action(input: Input) {
	popclip.share("com.apple.share.Messages.window", [input.text]);
}

// https://xkcd.com/566/
