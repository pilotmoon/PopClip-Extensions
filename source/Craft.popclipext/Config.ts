// #popclip
// name: Craft
// identifier: com.pilotmoon.popclip.extension.craft
// description: Capture text to a Craft document.
// popclip version: 4615
// icon: scale=90 file:craft_logo_black.svg
// app: { name: Craft, link: https://www.craft.do/ }

export const options = [
  {
    identifier: "spaceId",
    label: "Space ID",
    type: "string",
    description: "Find this within a Deeplink URL to a page in the space.",
  },
  {
    identifier: "folderName",
    label: "Folder Name",
    type: "string",
    description:
      "The name of the folder to create the document in. Leave blank to create in the root.",
  },
] as const;
type Options = InferOptions<typeof options>;

export const action: Action<Options> = {
  captureHtml: true,
  code(input, options, context) {
    let content = input.markdown.trim();
    if (context.browserUrl) {
      content += `\n\n[${context.browserTitle || "Source"}](${context.browserUrl})`;
    }
    createClipping(content, options);
  },
};

function createClipping(content: string, options: Options) {
  const url = new URL("craftdocs://createdocument");
  url.searchParams.set("title", `Clipped ${new Date().toLocaleString()}`);
  url.searchParams.set("spaceId", options.spaceId);
  url.searchParams.set("content", content);
  url.searchParams.set("folder", options.folderName);
  popclip.openUrl(url.href.replaceAll("+", "%20"));
}

const SAMPLE_SPACEID = "6035f4d1-43da-a41e-e344-9d7e5b612d9c";
export function test() {
  createClipping("# Some Content\n[fdfdf](https://example.com/)", {
    spaceId: SAMPLE_SPACEID,
    folderName: "My Folder",
  });
}
