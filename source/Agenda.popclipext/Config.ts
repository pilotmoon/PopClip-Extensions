// #popclip
// name: Agenda
// identifier: com.pilotmoon.popclip.extension.agenda
// description: Capture text to an Agenda note.
// popclip version: 4586
// icon: agenda.svg
// app:
//   name: Agenda
//   link: https://agenda.com/
//   bundleIdentifier: com.momenta.agenda.macos
//   checkInstalled: true

type AgendaOptions = { title: string; noteTitle: string };
export const options: Option[] = [
	{
		identifier: "title",
		label: "Project Name",
		type: "string",
		description:
			"Name of project to capture to. Leave blank to capture to the active project.",
	},
	{
		identifier: "noteTitle",
		label: "Note Title",
		type: "string",
		defaultValue: "Clipping",
		description: "Title for clipped notes.",
	},
];
export const action: Action<AgendaOptions> = {
	captureHtml: true,
	code(input, options, context) {
		let text = input.markdown.trim();
		if (context.browserUrl) {
			text += `\n[${context.browserTitle || "Source"}](${context.browserUrl})`;
		}
		addNote(text, options);
	},
};
function addNote(text: string, options: AgendaOptions) {
	const url = new URL("agenda://x-callback-url/create-note");
	if (options.title) {
		url.searchParams.set("project-title", options.title);
	}
	url.searchParams.set("title", options.noteTitle);
	url.searchParams.set("text", text);
	popclip.openUrl(url.href.replaceAll("+", "%20"));
}
export function test() {
	addNote("Hello, World!", { title: "Snippets", noteTitle: "" });
}
