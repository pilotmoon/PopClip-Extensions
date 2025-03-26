// #popclip
// name: Copy URL with Title
// identifier: com.shahine.omar.copyurlwithtitle
// description: Copy the URL and title from selected text as an HTML or Markdown link.
// icon: symbol:link
// popclip version: 4151
// entitlements: [network]

const axios = require("axios");

async function getTitle(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim() : url;
  } catch (error) {
    popclip.copyText(`Error in getTitle: ${error.toString()}`);
    return url;
  }
}

exports.actions = [
  {
    title: "Copy as HTML Link",
    icon: "symbol:chevron.left.slash.chevron.right",
    requirements: ["url"],
    code: async (selection) => {
      try {
        const url = selection.data.urls[0];
        const title = await getTitle(url);
        return `<a href="${url}">${title}</a>`;
      } catch (error) {
        popclip.copyText(`Error in HTML action: ${error.toString()}`);
        const fallbackUrl = selection.data.urls[0] || selection.text;
        return `<a href="${fallbackUrl}">${fallbackUrl}</a>`;
      }
    },
    after: "copy-result"
  },
  {
    title: "Copy as Markdown Link",
    icon: "iconify:devicon:markdown",
    requirements: ["url"],
    code: async (selection) => {
      try {
        const url = selection.data.urls[0];
        const title = await getTitle(url);
        return `[${title}](${url})`;
      } catch (error) {
        popclip.copyText(`Error in Markdown action: ${error.toString()}`);
        const fallbackUrl = selection.data.urls[0] || selection.text;
        return `[${fallbackUrl}](${fallbackUrl})`;
      }
    },
    after: "copy-result"
  }
]; 