# Notion

Append clipped text to a note in Notion.

The extension works with [Notion](https://www.notion.so/), a popular web-based project workspace app with Mac and iOS clients. THe extension will append the selected text (including formatting and links) to a Notion page of your choice along with the clip's source reference and capture date.

### Options

* **Page Name**: Specify the name of a page in notion, to which this extension will append content. The name give must exactly match (including case) the name of a page in your Notion workspace, to which PopClip has been granted access.

## About

This is an extension for [PopClip](https://www.popclip.app/).

### Author

Nick Moore

### Acknowledgements

This extension uses the JavaScript library [martian](https://github.com/tryfabric/martian), to convert Markdown to Notion's custom Rich Text format.

The SVG icon is from [WikiMedia Commons](https://commons.wikimedia.org/wiki/File:Notion-logo.svg).

### Requirements

Requires PopClip 2022.12, and a Notion account.

## Changelog

### 2023-01-20

* Initial release.

### 2023-03-09

* Bug fix attempt ("undefined is not an object evaluating page.properties.title.title").