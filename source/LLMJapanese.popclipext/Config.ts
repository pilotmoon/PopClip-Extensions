// #popclip
// name: LLMJapanese
// icon: square あ
// identifier: com.popclip.extension.llm-japanese
// description: Annotate Japanese with kana readings and break down N3+ grammar. For multiple-choice questions it gives the correct answer and explains why each option is right or wrong. Uses OpenAI-compatible LLM APIs.
// popclipVersion: 4586
// entitlements: [network]

import axios from "axios";

// Languages available for the grammar/meaning explanations.
const explainLanguages = {
  "zh-Hans": "Simplified Chinese",
  "zh-Hant": "Traditional Chinese",
  en: "English",
  ja: "Japanese",
} as const;

type ExplainLang = keyof typeof explainLanguages;

// Localized section/field labels for the plain-text template.
const labels = {
  "zh-Hans": { reading: "假名", meaning: "释义", grammar: "语法点", form: "接续", use: "含义", here: "本句", answer: "正确答案", analysis: "选项解析" },
  "zh-Hant": { reading: "假名", meaning: "釋義", grammar: "文法點", form: "接續", use: "含義", here: "本句", answer: "正確答案", analysis: "選項解析" },
  en: { reading: "Kana", meaning: "Meaning", grammar: "Grammar (N3+)", form: "Form", use: "Use", here: "Here", answer: "Answer", analysis: "Options" },
  ja: { reading: "仮名", meaning: "意味", grammar: "文法ポイント", form: "接続", use: "働き", here: "この文", answer: "正解", analysis: "選択肢" },
} as const;

function resolveLang(code: string): ExplainLang {
  return code in explainLanguages ? (code as ExplainLang) : "zh-Hans";
}

export const options = [
  {
    identifier: "apikey",
    label: "API Key",
    type: "secret",
    description: "Your OpenAI-compatible API key",
  },
  {
    identifier: "apiEndpoint",
    label: "API Endpoint",
    type: "string",
    defaultValue: "https://api.openai.com/v1",
    description: "Full URL of the API endpoint. Leave as default for OpenAI.",
  },
  {
    identifier: "apiModel",
    label: "Model",
    type: "string",
    defaultValue: "gpt-4.1-mini",
    description: "The model to use.",
  },
  {
    identifier: "explainLang",
    label: {
      en: "Explanation Language",
      "zh-Hans": "讲解语言",
      "zh-Hant": "講解語言",
    },
    type: "multiple",
    valueLabels: ["中文（简体）", "中文（繁體）", "English", "日本語"],
    values: ["zh-Hans", "zh-Hant", "en", "ja"],
    defaultValue: "zh-Hans",
    description:
      "Language used to explain grammar points and meaning. Phonetics are always shown as kana (furigana).",
  },
] as const;

type Options = InferOptions<typeof options>;

function buildSystemPrompt(explainLang: string): string {
  const lang = explainLanguages[resolveLang(explainLang)];
  const l = labels[resolveLang(explainLang)];
  return [
    "You are a Japanese-language learning assistant. The user selects a piece of text. First decide which MODE applies, then follow that mode's template exactly.",
    "",
    "MODE A — MULTIPLE-CHOICE QUESTION: the selection is a question with several answer options (e.g. a stem with a blank ___ or a question, followed by choices labelled 1/2/3/4, A/B/C/D, ①②③④, ア/イ/ウ/エ, etc.).",
    "MODE B — PLAIN TEXT: anything else (a sentence, phrase, or passage to study). If the selection is not Japanese, translate it into natural, idiomatic Japanese and study that.",
    "",
    "Reply in PLAIN TEXT only (no markdown, no code fences, no extra commentary).",
    "",
    "================ MODE A template ================",
    `【${l.answer}】<the correct option's label> ＋ <the full correct sentence (stem with the chosen option filled in) written in Japanese>`,
    `【${l.reading}】<full kana (hiragana) reading of that correct sentence, written wakachigaki (see rules)>`,
    `【${l.meaning}】<meaning of the correct sentence in ${lang}>`,
    `【${l.analysis}】`,
    `<label>○ <option text> — <why this one is correct, in ${lang}>`,
    `<label>✗ <option text> — <why it is wrong here: grammar/meaning/usage reason, in ${lang}>`,
    "<one line per option; mark the correct one with ○ and each wrong one with ✗>",
    `【${l.grammar}】`,
    "■ <element> ［<JLPT level>・<category>］",
    `  ${l.form}：<connection / conjugation rule>`,
    `  ${l.use}：<core function in ${lang}>`,
    "■ ... (the key grammar points the question is testing, N3 and above)",
    "",
    "================ MODE B template ================",
    "<the Japanese text, unchanged (or the translation if input was not Japanese)>",
    `【${l.reading}】<full kana (hiragana) reading of the whole text, written wakachigaki (see rules)>`,
    `【${l.meaning}】<meaning in ${lang}>`,
    `【${l.grammar}】`,
    "■ <element> ［<JLPT level>・<category>］",
    `  ${l.form}：<connection / conjugation rule>`,
    `  ${l.use}：<core function in ${lang}>`,
    `  ${l.here}：<how it is used in this sentence, in ${lang}>`,
    "■ ...",
    "",
    "Rules for both modes:",
    `- The 【${l.reading}】 line is the only phonetics (no romaji anywhere). Write it all in kana (keep katakana for loanwords) using wakachigaki: put a half-width space between words/bunsetsu, attaching particles and auxiliaries to the word they follow. Example: 日本語を勉強しています → にほんごを べんきょうして います`,
    "- For grammar, focus on JLPT N3 level and above (advanced particles & combinations; conjugations such as causative/passive/causative-passive/conditional/volitional/te-form chains; set patterns like ～わけではない/～ざるを得ない/～どころか; keigo; nuance). Skip trivial N5/N4 basics unless essential.",
    `- Write every explanation in ${lang}. Keep them concise but informative.`,
  ].join("\n");
}

async function analyze(
  text: string,
  explainLang: string,
  apikey: string,
  endpoint: string,
  model: string,
): Promise<string> {
  const openai = axios.create({
    baseURL: endpoint,
    headers: {
      Authorization: `Bearer ${apikey}`,
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await openai.post("/chat/completions", {
      model: model,
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(explainLang),
        },
        {
          role: "user",
          content: `Selected text:\n\n"${text}"`,
        },
      ],
      max_completion_tokens: 2000,
    });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    }
    throw new Error("No response received from API");
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Invalid API key - check your configuration");
      }
      if (error.response.status === 429) {
        throw new Error("Rate limit exceeded - try again later");
      }
      if (error.response.data?.error) {
        throw new Error(
          `API Error: ${error.response.data.error.message || error.response.data.error}`,
        );
      }
      throw new Error(`Request failed (Status: ${error.response.status})`);
    }
    if (error.request) {
      throw new Error("Network error - check your connection");
    }
    throw new Error(`Request failed: ${error.message}`);
  }
}

const action: ActionFunction<Options> = async (input, options) => {
  try {
    const result = await analyze(
      input.text,
      options.explainLang,
      options.apikey,
      options.apiEndpoint,
      options.apiModel,
    );
    // Hold Shift to copy the full result instead of showing it full screen.
    if (popclip.modifiers.shift) {
      popclip.copyText(result);
    } else {
      popclip.showText(result, { style: "large" });
    }
  } catch (error) {
    popclip.showText(
      `Error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const actions: Action<Options>[] = [
  {
    title: "Japanese Learn",
    code: action,
  },
];
