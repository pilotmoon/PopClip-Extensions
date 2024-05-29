// #popclip
// name: Agenda
// identifier: com.marcboulos.popclip.extension.Agenda
// description: Capture text to an Agenda note.
// popclip version: 4151
// icon: agenda.svg
// app:
//   name: Agenda
//   link: https://agenda.com/
//   bundleIdentifier: com.momenta.agenda.macos
//   checkInstalled: true

type AgendaOptions = { title: string };
export const options: Option[] = [
	{
		identifier: "title",
		label: "Project Title",
		type: "string",
		defaultValue: "Snippets",
		description: "Name of existing project in which to insert notes.",
	},
];
export const action: Action<AgendaOptions> = {
	captureHtml: true,
	code(input, options, context) {
		let text = input.markdown;
		if (context.browserUrl) {
			text += `\n[${context.browserTitle || "Source"}](${context.browserUrl})`;
		}
		addNote(text, options);
	},
};
function addNote(text: string, options: AgendaOptions) {
	const url = new URL("agenda://x-callback-url/create-note");
	url.searchParams.set("project-title", options.title);
	url.searchParams.set("title", "Clipped with PopClip");
	url.searchParams.set("text", text.trim());
	popclip.openUrl(url.href.replaceAll("+", "%20"));
}
export function test() {
	addNote("Hello, World!", { title: "Snippets" });
}
