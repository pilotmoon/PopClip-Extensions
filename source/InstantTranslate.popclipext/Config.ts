// #popclip
// name: Instant Translate
// identifier: com.popclip.extension.instant-translate
// description: Translate the selected word or short phrase instantly within PopClip, using your own Microsoft Translator key.
// icon: itrans.png
// popclipVersion: 4586
// regex: (?s)^.{1,200}$
// entitlements: [network]
// after: preview-result

import axios from "axios";
import { translation } from "./langs.json";

const setupLink = "https://www.popclip.app/extensions/x/08hhdb";

// build the language list from the json file
// To fetch latest: `curl https://api.cognitive.microsofttranslator.com/languages\?api-version\=3.0\&scope\=translation > langs.json`
function languageList(): { names: string[]; codes: string[] } {
  const entries = Object.entries(translation).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name),
  );
  return {
    codes: entries.map(([code]) => code),
    names: entries.map(([, v]) =>
      v.name === v.nativeName ? v.name : `${v.name} / ${v.nativeName}`,
    ),
  };
}

const { names, codes } = languageList();

export const options = [
  {
    identifier: "destlang",
    label: {
      en: "Destination Language",
      "zh-Hans": "翻译为",
      "zh-Hant": "轉換為",
    },
    type: "multiple",
    valueLabels: names,
    values: codes,
    defaultValue: "en",
  },
  {
    identifier: "apikey",
    label: "Translator Key",
    type: "secret",
    description: `Your Microsoft Translator key (Key 1). Follow the [setup instructions](${setupLink}) to get a free key.`,
  },
  {
    identifier: "region",
    label: "Region",
    type: "string",
    description:
      "Leave blank if you chose the Global region (recommended). Otherwise enter the resource's region, e.g. westeurope.",
  },
] as const;

type Options = InferOptions<typeof options>;

// turn API errors into messages a user can act on
function errorMessage(error: unknown): string {
  // biome-ignore lint/suspicious/noExplicitAny: axios error shape
  const response = (error as any)?.response;
  const status: number | undefined = response?.status;
  const detail: string | undefined = response?.data?.error?.message;
  switch (status) {
    case 401:
      return "Microsoft Translator rejected the key. Check that you copied Key 1 correctly, and set the Region option if your resource isn't Global.";
    case 403:
      return "Your Microsoft Translator free quota has been used up for this month, or the key is not allowed to translate.";
    case 429:
      return "Microsoft Translator is rate-limiting requests. Please wait a moment and try again.";
    case undefined:
      return `Could not reach Microsoft Translator: ${String(error)}`;
    default:
      return `Microsoft Translator error ${status}${detail ? `: ${detail}` : ""}`;
  }
}

export const action: ActionFunction<Options> = async (input, options) => {
  const key = options.apikey.trim();
  if (!key) {
    popclip.showText(
      "Instant Translate needs your Microsoft Translator key. Add it in the extension's settings.",
    );
    return;
  }
  const headers: Record<string, string> = { "Ocp-Apim-Subscription-Key": key };
  const region = options.region.trim();
  if (region) {
    headers["Ocp-Apim-Subscription-Region"] = region;
  }
  try {
    const response = await axios.post(
      "https://api.cognitive.microsofttranslator.com/translate",
      [{ Text: input.text }],
      { headers, params: { "api-version": "3.0", to: options.destlang } },
    );
    return response.data[0].translations[0].text as string;
  } catch (e) {
    popclip.showText(errorMessage(e));
    return;
  }
};
