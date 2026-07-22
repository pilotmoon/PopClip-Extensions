# LLMJapanese

A PopClip extension to help you learn Japanese. Select text anywhere, and it shows the Japanese with a **kana reading line**, a meaning translation, and a structured breakdown of the **N3+ grammar points**. It also handles **multiple-choice questions**: select a whole question and it gives the correct answer and explains why each option is right or wrong.

Based on the LLMTranslate extension, using OpenAI-compatible LLM APIs.

## What it does

It automatically picks one of two modes:

- **Plain text** — select a Japanese sentence/phrase (or any text). It shows the Japanese, a full kana (hiragana) reading on its own line, the meaning, and a structured list of grammar points (JLPT N3 and above). Non-Japanese input is translated into natural Japanese first.
- **Multiple-choice question** — select a whole question with options (1/2/3/4, A/B/C/D, ①②③④, ア/イ/ウ/エ, a blank `___`, etc.). It identifies the correct option, shows the full correct sentence with its kana reading and meaning, then goes through every option marking it ○ (correct) or ✗ (wrong) with the reason, and finishes with the grammar points the question is testing.

Phonetics are shown as a single **kana** line written *wakachigaki* (with spaces between words, like a Japanese textbook), and there is no romaji. Grammar/meaning explanations default to **Simplified Chinese** (configurable).

The result is shown as macOS **Large Type** (full screen), which appears on the screen you're working on. Hold **Shift** while clicking to copy the full result to the clipboard instead.

## Output format

Plain text:

```
日本語を勉強しています。
【假名】にほんごを べんきょうして います。
【释义】我正在学习日语。
【语法点】
■ ～ている ［N4・补助动词］
  接续：动词て形 ＋ いる
  含义：表示动作正在持续
  本句：描述此刻正在学习的状态
```

Multiple-choice question:

```
【正确答案】3 ＋ 雨が降りそうなので、傘を持っていきます。
【假名】あめが ふりそうなので、かさを もって いきます。
【释义】看起来要下雨了，所以带伞去。
【选项解析】
1 ✗ 降るそう — 「そうだ」传闻用法，意为"听说要下雨"，与语境（自己的推测）不符。
2 ✗ 降りそう…のに — 「のに」是逆接，语义不通。
3 ○ 降りそうなので — 「ます形去ます＋そう」表样态推测，＋「ので」表原因，正确。
4 ✗ 降るらしい — 「らしい」也是传闻/推断，但接续与样态推测不同，不如3贴切。
【语法点】
■ ～そうだ（様態） ［N4-N3・助动词］
  接续：动词ます形去ます ＋ そう
  含义：根据眼前迹象推测"看起来快要…"
```

## Setup

1. Open PopClip Preferences and find **LLMJapanese**.
2. Click the settings icon to configure:
   - **API Key**: Your OpenAI-compatible API key (stored securely by PopClip).
   - **API Endpoint**: Full URL of the API endpoint (default: `https://api.openai.com/v1`).
   - **Model**: The model to use (default: `gpt-4.1-mini`). A more capable model gives better grammar analysis and answer reasoning.
   - **Explanation Language**: Language for grammar/meaning explanations (default: 中文（简体）). Options: 中文（简体）/ 中文（繁體）/ English / 日本語.

## Usage

1. Select Japanese (or any) text — a sentence, or a whole multiple-choice question — in any application.
2. Click the **Japanese Learn** button in the PopClip bar.
3. The breakdown is shown full screen. Press any key to dismiss it.
4. Hold **Shift** while clicking to copy the full result to the clipboard instead.

## Requirements

- PopClip 4586 or later (2024.5+)
- An OpenAI-compatible API key
- Internet connection

## Credits

- Based on the LLMTranslate extension by wenhe.

## License

Released under the MIT License.
