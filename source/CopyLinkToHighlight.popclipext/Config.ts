// #popclip
// name: Copy Link to Highlight
// identifier: com.pilotmoon.popclip.extension.copy-link-to-Highlight
// popclip version: 5155
// icon: iconify:hugeicons:copy-link
// entitlements: [dynamic]
// language: typescript
// module: true

function createHighlightLink(page, text) {
  const url = new URL(page);
  url.hash = ""; // remove any existing fragmemt
  const encodedText = encodeURIComponent(text).replace(/-/g, "%2D"); // additionally encode "-" as per spec
  return `${url.href}#:~:text=${encodedText}`;
}
defineExtension({
  actions() {
    if (popclip.input.text && popclip.context.browserUrl) {
      return () =>
        popclip.copyText(
          createHighlightLink(popclip.context.browserUrl, popclip.input.text),
        );
    }
  },
});
