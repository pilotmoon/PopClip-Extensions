// #popclip
// name: Smart Translate
// identifier: io.icell.SmartTranslate.PopClipExtension
// description: Send the selected text to OpenAI's API to improve or translate it to the standard target language.
// app: { name: Smart Translate, link: 'https://platform.openai.com/docs/api-reference/chat' }
// popclipVersion: 4586
// keywords: openai chatgpt translate
// entitlements: [network]

import axios from "axios";
import langsJson from './languages.json';

interface Language {
    name: string;
}

interface LangsJson {
    langs: Language[];
}

interface Result {
    names: string[];
}

const languageList = (): Result => {
    const { langs } = langsJson as LangsJson;
    langs.sort((a, b) => a.name.localeCompare(b.name));

    const result: Result = { names: [] };
    for (const lang of langs) {
        result.names.push(lang.name);
    }

    return result;
};

const { names } = languageList();

export const options = [
    {
        identifier: "apikey",
        label: "API Key",
        type: "secret",
        description:
            "Obtain an API key from: https://platform.openai.com/account/api-keys",
    },
    {
        identifier: "model",
        label: "Model",
        type: "multiple",
        defaultValue: "gpt-4o",
        values: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo", "gpt-4o"],
    },
    {
        identifier: 'targetlang',
        label: 'Target Language',
        type: 'multiple',
        values: names,
        defaultValue: 'English',
        description: "Target language, or the language to be optimized."
    }
] as const;

type Options = InferOptions<typeof options>;

// typescript interfaces for OpenAI API
interface Message {
    role: "user" | "system" | "assistant";
    content: string;
}
interface ResponseData {
    choices: [{ message: Message }];
}
interface Response {
    data: ResponseData;
}

// the main chat action
const smartTranslate: ActionFunction<Options> = async (input, options) => {
    const prompt = `You will be provided with statements, if it’s an ${options.targetlang} statement, your task is to convert them to standard ${options.targetlang}, if it’s not a ${options.targetlang} statement, your task is to translate them into standard ${options.targetlang}.`

    const openai = axios.create({
        baseURL: `https://api.openai.com/v1`,
        headers: { Authorization: `Bearer ${options.apikey}` },
    });

    const messages: Array<Message> = [
        { role: "system", content: prompt },
        { role: "user", content: input.text.trim() }
    ];

    try {
        const { data }: Response = await openai.post("/chat/completions", {
            model: options.model || "gpt-4o",
            messages,
        });

        const content = data.choices[0].message.content

        // if holding shift, copy just the response.
        // else, paste the last input and response.
        if (popclip.modifiers.shift) {
            popclip.copyText(content);
        } else {
            popclip.pasteText(input.text.trimEnd() + "\n\n" + content);
            popclip.showSuccess();
        }
    } catch (e) {
        popclip.showText(getErrorInfo(e));
    }
};

export function getErrorInfo(error: unknown): string {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = (error as any).response;
        return `Message from OpenAI (code ${response.status}): ${response.data.error.message}`;
    } else {
        return String(error);
    }
}

export const actions: Action<Options>[] = [
    {
        title: "Smart Translate",
        icon: "iconify:system-uicons:translate",
        code: smartTranslate,
    }
];
