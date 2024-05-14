// # popclip Logseq quick capture
// name: Logseq
// identifier: "me.eindex.popclip.extesion.logseq"
// description: Quick capture the text to Logseq
// icon: Logseq.png
// popclip version: 4151
// captureHtml: true
// apps: [{ name: Logseq, link: https://logseq.com/ }]
// language: javascript

let url = new URL("logseq://x-callback-url/quickCapture");
url.searchParams.append("content", popclip.input.markdown);
url.searchParams.append("url", popclip.context.browserUrl);
url.searchParams.append("title", popclip.context.browserTitle);
popclip.openUrl(url.href);
