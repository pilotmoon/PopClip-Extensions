// #popclip
// name: Instant Translate
// identifier: com.popclip.extension.instant-translate
// description: Translate the selected word or short phrase instantly within PopClip.
// icon: itrans.png
// popclipVersion: 4586
// regex: (?s)^.{1,200}$
// entitlements: [network]
// after: preview-result

import axios from "axios";
import { languages as languageList } from "./langs.json";

// Languages supported by both DeepL (used with the user's own key) and
// Microsoft Translator (behind the free Pilotmoon service). Built from
// DeepL's /v2/languages?type=target list, keeping only languages Microsoft
// also translates into, and dropping variants Microsoft can't distinguish
// (DE-CH, ES-419) and DeepL's duplicate aliases (DE-DE, ES-ES, FR-FR, ZH).
// `code` is the saved option value: Microsoft-style, matching what versions
// before Nov 2026 saved, so existing choices still show in the menu. The
// free service accepts these codes directly. `deepl` is DeepL's code.
const languages = [...languageList].sort((a, b) =>
  a.name.localeCompare(b.name),
);
const deeplCodes = new Map(languages.map((l) => [l.code, l.deepl]));

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
    values: languages.map((l) => l.code),
    defaultValue: "en",
  },
  {
    identifier: "deeplKey",
    label: "DeepL API Key",
    type: "secret",
    description:
      "Optional. Without a key, Instant Translate uses a free service with a daily limit. With a key, it uses DeepL with no limit set by us. Free DeepL keys are available from the API Keys tab of your [DeepL account](https://www.deepl.com/your-account/keys). Sign up at [DeepL API](https://www.deepl.com/pro-api).",
  },
] as const;

type Options = InferOptions<typeof options>;

// Convert a saved language code to DeepL's. Saved codes outside the list
// (DeepL codes saved by the 9 Nov 2026 version, or languages dropped from
// the menu) are passed on uppercased, for DeepL to accept or reject.
function deeplTarget(code: string): string {
  return deeplCodes.get(code) ?? code.toUpperCase();
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

async function translateWithDeepL(text: string, key: string, to: string) {
  // free API keys end with ":fx" and use a different host
  const host = key.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";
  try {
    const response = await axios.post(
      `https://${host}/v2/translate`,
      { text: [text], target_lang: deeplTarget(to) },
      { headers: { Authorization: `DeepL-Auth-Key ${key}` } },
    );
    return response.data.translations[0].text as string;
  } catch (e) {
    popclip.showText(errorMessage(e));
    return;
  }
}

// Free service run by Pilotmoon (Microsoft Translator behind a rate-limited
// proxy). The session token lives only in this module's memory, so it is
// renewed after PopClip relaunches or the extension reloads.
const FREE_ENDPOINT = "https://api.pilotmoon.com/twix/translate";
let freeToken: string | undefined;

async function registerFreeToken() {
  const response = await axios.post(`${FREE_ENDPOINT}/register`, {});
  freeToken = response.data.token as string;
  return freeToken;
}

function freeErrorMessage(error: unknown): string {
  const response = (
    error as {
      response?: { status: number; data?: { message?: unknown } };
    } | null
  )?.response;
  if (!response) {
    return `Could not reach the translation service: ${String(error)}`;
  }
  const message = response.data?.message;
  return typeof message === "string"
    ? message
    : `Translation service error ${response.status}`;
}

async function translateFree(text: string, to: string) {
  const attempt = async (token: string) => {
    const response = await axios.post(
      `${FREE_ENDPOINT}/text`,
      { text, to },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data.text as string;
  };
  try {
    try {
      return await attempt(freeToken ?? (await registerFreeToken()));
    } catch (e) {
      // expired or unrecognised session: register again, once
      if ((e as { response?: { status?: number } })?.response?.status !== 401) {
        throw e;
      }
      return await attempt(await registerFreeToken());
    }
  } catch (e) {
    popclip.showText(freeErrorMessage(e));
    return;
  }
}

export const action: ActionFunction<Options> = async (input, options) => {
  const key = options.deeplKey.trim();
  return key
    ? translateWithDeepL(input.text, key, options.destlang)
    : translateFree(input.text, options.destlang);
};
