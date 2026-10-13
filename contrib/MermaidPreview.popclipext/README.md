# Mermaid Preview

Preview Mermaid diagrams from selected text using macOS Quick Look.

## Usage

Select Mermaid diagram syntax and click the extension to preview. Supports:

- Raw Mermaid syntax
- Markdown code blocks (` ```mermaid ... ``` `)
- Unclosed code blocks (` ```mermaid ... `)

## Rendering

If [mermaid-cli](https://github.com/mermaid-js/mermaid-cli) (`mmdc`) is installed locally, it will be used for rendering. Otherwise, falls back to the [mermaid.ink](https://mermaid.ink) online service.

### Install mermaid-cli (optional)

```sh
npm install -g @mermaid-js/mermaid-cli
```
