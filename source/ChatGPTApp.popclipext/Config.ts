// #popclip
// name: ChatGPT App
// identifier: com.pilotmoon.popclip.extension.chatgpt-app
// description: Activate ChatGPT App and paste the text into the chat.
// icon: square filled scale=85 iconify:simple-icons:openai
// app: { name: ChatGPT App, link: https://help.openai.com/en/articles/9275200-using-the-chatgpt-macos-app }
// keywords: openai
// language: javascript
popclip.performCommand("copy");
popclip.openUrl("chatgpt://");
util.sleep(100);
popclip.pressKey("command V");
popclip.pressKey("return");
