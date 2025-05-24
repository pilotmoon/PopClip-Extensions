// #popclip
// name: Reading List
// identifier: com.pilotmoon.popclip.extension.safari-reading-list
// description: Save the URL to your Safari Reading List.
// icon: glasses.png
// popclip version: 4586
// requirements: [urls]

export function action(input: Input) {
	let url = input.data.urls[0];
	popclip.share("com.apple.share.System.add-to-safari-reading-list", [{ url }]);
}

// test inputs:
// - https://xkcd.com/353/
// - popclip.app
