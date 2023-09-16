"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.getErrorInfo = void 0;
const axios_1 = require("axios");
// the extension keeps the message history in memory
const messages = [];
// the last chat date
let lastChat = new Date();
// reset the history
function reset() {
    print("Resetting chat history");
    messages.length = 0;
    return null;
}
// get the content of the last `n` messages from the chat, trimmed and separated by double newlines
function getTranscript(n) {
    return messages.slice(-n).map((m) => m.content.trim()).join("\n\n");
}
// the main chat action
const chat = async (input, options) => {
    const openai = axios_1.default.create({
        baseURL: "https://api.openai.com/v1",
        headers: { Authorization: `Bearer ${options.apikey}` },
    });
    // if the last chat was long enough ago, reset the history
    if (options.resetMinutes.length > 0) {
        const resetInterval = parseInt(options.resetMinutes) * 1000 * 60;
        if (new Date().getTime() - lastChat.getTime() > resetInterval) {
            reset();
        }
    }
    // add the new message to the history
    messages.push({ role: "user", content: input.text });
    // send the whole message history to OpenAI
    try {
        const { data } = await openai.post("chat/completions", {
            model: "gpt-3.5-turbo",
            messages,
        });
        // add the response to the history
        messages.push(data.choices[0].message);
        lastChat = new Date();
        // if holding shift and alt, pasye just the responsw.
        // if holding shift, copy just the response.
        // else, paste the last input and response.
        if (popclip.modifiers.shift && popclip.modifiers.option) {
            popclip.pasteText(getTranscript(1));
        }
        else if (popclip.modifiers.shift) {
            popclip.copyText(getTranscript(1));
        }
        else {
            popclip.pasteText(getTranscript(2));
            popclip.showSuccess();
        }
    }
    catch (e) {
        popclip.showText(getErrorInfo(e));
    }
    return null;
};
function getErrorInfo(error) {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = error.response;
        //return JSON.stringify(response);
        return `Message from OpenAI (code ${response.status}): ${response.data.error.message}`;
    }
    else {
        return String(error);
    }
}
exports.getErrorInfo = getErrorInfo;
// export the actions
exports.actions = [{
        title: "ChatGPT: Chat",
        code: chat,
    }, {
        title: "ChatGPT: Reset",
        icon: "broom-icon.svg",
        requirements: ["option-showReset=1"],
        code: reset,
    }];
