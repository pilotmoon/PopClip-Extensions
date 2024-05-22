<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD001 -->

> **Developer documentation has moved! See <https://www.popclip.app/dev/> for the latest docs.**

---

# PopClip Extensions

This repository contains the source files for many of the extensions published in the official [PopClip Extensions Directory](https://www.popclip.app/extensions/).

## Repository Layout

The main folders:

- `source` - sources for the published extensions (maintained and supported by me)
- `source-contrib` - folder for as-yet-unpublished user-contributed and experimental extensions

## Contributing

Fixes and improvements to existing extensions are welcome via pull request.

To contribute new extensions to the directory, the preferred way is for you to submit it directly to the directory server from your own repo. The extension's directory page will be linked to your repo and you will maintain and update the extension yourself. Contact me at <mailto:support@pilotmoon.com> for the submission instructions.

Alternatively, new extensions may be submitted by pull request **in the `source-contrib` folder** of this repo. (If I publish it, I will move it to the `source` folder myself.)

### Quality Guidelines

Please note I will not publish all submissions. Extensions to be published must be of high quality and meet the following criteria:

- The extension has a clear, single purpose and is useful to a general audience.
- The extension "just works", with only minimal configuration by the user.
- A well-chosen name, in keeping with the naming style of other extensions. Names are usually one or two words; for example ✅"Instapaper", not ❌"Send to Instapaper"; ✅"Uppercase" not ❌"Convert to Uppercase".
- A good icon, clearly representing the action. (Use [Iconify or SF Symbols](https://www.popclip.app/dev/icons) if you're not a designer.)
- In the Config, a clear, concise `description` of what the extension does.
- Except for the very very simplest extensions, include a `readme.md` file explaining briefly how to use the extension, particularly mentioning any special features and configuration options.
- Where API keys are needed, this should be clearly documented in the readme with instructions and a link to obtain the key.
- No pointless scripts. For example, don't use a bash script to open a URL when you could just use the `url` action.
- Favour JavaScript actions over Shell Script or AppleScript actions unless the particular action really needs to be a shell script or AppleScript.
- Shell Script extensions must work out-of-the-box on a default installation of the latest macOS. I won't publish extensions that require the user to install additional scripting languages or libraries.
- Use the Readme to give proper credit to any open source libraries or icons used.
- No compiled binaries. All submissions must be source code only.
- Extensions that interact with a website or app should have an `app` dictionary in the Config, defining the `name` and `link` fields. For macOS apps, the `bundleIdentifiers` key with the `checkInstalled: true` option should also be used.
- No extensions aimed at circumventing copyright, defeating paywalls etc.
- No links to torrent / filesharing sites that predominantly index copyrighted content.
- Nothing that "phones home", collects user data, or modifies the user's system in any way.
- Nothing illegal or harmful or that you wouldn't show to your grandmother.
- The above list is not exhaustive and I reserve the right to reject a submission for any other reason.

With all that said... please do submit your extension! I'm looking forward to seeing what you come up with.

## Credits

All the extensions were created by Nick Moore, except where stated. Individual extension credits are included in the extension's readme file.

## License

All extensions in this repo are published under the MIT License (see [LICENSE.txt](LICENSE.txt)) unless noted otherwise in the readme file.

## Changelog

Where provided, individual changelogs are included in the extension readme files.
