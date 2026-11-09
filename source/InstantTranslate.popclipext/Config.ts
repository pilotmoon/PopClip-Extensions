// #popclip
// name: Instant Translate
// identifier: com.popclip.extension.instant-translate
// description: Translate the selected word or short phrase instantly within PopClip, powered by DeepL.
// icon: itrans.png
// popclipVersion: 4586
// regex: (?s)^.{1,200}$
// entitlements: [network]
// after: preview-result

import axios from "axios";
import { target } from "./langs.json";

// language list, from DeepL's API wrapped as {"target": [...]}. To refresh:
// curl -H "Authorization: DeepL-Auth-Key $KEY" "https://api-free.deepl.com/v2/languages?type=target"
// Codes hidden from the menu because another entry has the same name:
// DE-DE/ES-ES/FR-FR duplicate DE/ES/FR, and ZH is DeepL's legacy alias for ZH-HANS.
const hidden = new Set(["DE-DE", "ES-ES", "FR-FR", "ZH"]);
const languages = target
  .filter((l) => !hidden.has(l.language))
  .sort((a, b) => a.name.localeCompare(b.name));

export const options = [
  {
    identifier: "destlang",
    label: {
      en: "Destination Language",
      "zh-Hans": "翻译为",
      "zh-Hant": "轉換為",
    },
    type: "multiple",
    valueLabels: languages.map((l) => l.name),
    values: languages.map((l) => l.language),
    defaultValue: "EN-US",
  },
  {
    identifier: "deeplKey",
    label: "DeepL API Key",
    type: "secret",
    description:
      "Instant Translate now requires a DeepL API key, which is available free. From the API Keys tab of your [DeepL account](https://www.deepl.com/your-account/keys). Sign up at [DeepL API](https://www.deepl.com/pro-api).",
  },
] as const;

type Options = InferOptions<typeof options>;

// Older versions used Microsoft Translator language codes ("en", "zh-Hans"),
// which may still be saved in the settings. Convert them to DeepL codes.
function deeplTarget(code: string): string {
  const legacy: Record<string, string> = {
    en: "EN-US",
    pt: "PT-BR",
    fil: "TL",
    "mn-Cyrl": "MN",
    "sr-Cyrl": "SR",
    "sr-Latn": "SR",
  };
  return legacy[code] ?? code.toUpperCase();
}

interface ErrorResponse {
  status: number;
  data?: { message?: string };
}

// turn API errors into messages a user can act on
function errorMessage(error: unknown): string {
  const response = (error as { response?: ErrorResponse } | null)?.response;
  if (!response) {
    return `Could not reach DeepL: ${String(error)}`;
  }
  switch (response.status) {
    case 400:
      return "DeepL couldn't translate into the selected language. Please choose a Destination Language in the extension's settings.";
    case 403:
      return "DeepL rejected the API key. Check that you copied it correctly from your DeepL account.";
    case 429:
      return "DeepL is rate-limiting requests. Please wait a moment and try again.";
    case 456:
      return "Your DeepL quota has been used up for this month.";
    default: {
      const detail = response.data?.message;
      return `DeepL error ${response.status}${detail ? `: ${detail}` : ""}`;
    }
  }
}

export const action: ActionFunction<Options> = async (input, options) => {
  const key = options.deeplKey.trim();
  if (!key) {
    popclip.showText(
      "Instant Translate needs your DeepL API key. Add it in the extension's settings.",
    );
    return;
  }
  // free API keys end with ":fx" and use a different host
  const host = key.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";
  try {
    const response = await axios.post(
      `https://${host}/v2/translate`,
      { text: [input.text], target_lang: deeplTarget(options.destlang) },
      { headers: { Authorization: `DeepL-Auth-Key ${key}` } },
    );
    return response.data.translations[0].text as string;
  } catch (e) {
    popclip.showText(errorMessage(e));
    return;
  }
};
