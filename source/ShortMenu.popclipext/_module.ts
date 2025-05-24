import { replaceRangesAsync } from "@popclip/helpers/replace-ranges";
import { concurrentTransform } from "@popclip/helpers/generator";
import { shorten } from "./_shortmenu.ts";

export const options = [
  {
    identifier: "apikey",
    label: "API Key",
    type: "secret",
    description:
      "Obtain API key from: https://app.shortmenu.com/settings/api-keys",
  },
  {
    identifier: "domain",
    label: "Domain",
    type: "string",
    description:
      "If you have a custom domain, enter it here. Leave blank to use `shm.to`.",
  },
] as const;

type Options = InferOptions<typeof options>;

// replace all matched urls with their shortened equivalents, calling duplicates only once
export const action: ActionFunction<Options> = async (input, options) => {
  return await replaceRangesAsync(
    input.text,
    input.data.urls.ranges,
    concurrentTransform(input.data.urls, (url: string) =>
      shorten(url, options.domain || "shm.to", [], options.apikey),
    ),
  );
};
