> **Developer documentation has moved! See <https://www.popclip.app/dev/> for
> the latest docs.**

---

# PopClip Extensions

This repository contains the source files for most of the extensions published
in the official
[PopClip Extensions Directory](https://www.popclip.app/extensions/).

## Repository Layout

The main folders:

- `source` - sources for the published extensions (maintained and supported by
  me)
- `contrib` - folder for unpublished / user-contributed / experimental / niche /
  archived extensions (not maintained or supported)

## Contributing

Fixes and improvements to existing extensions are welcome via pull request.

New extensions should be submitted by pull request **in the `contrib` folder**
of this repo. Please note that the PopClip Extension Directory is curated by me,
and I will not publish all submissions. I may also modify submissions before
publishing them.

Extensions to be published must be of high quality and meet the following
criteria:

- The extension has a clear, single purpose and is useful to a general audience.
- The extension "just works", with only minimal configuration by the user.
- A well-chosen name, in keeping with the naming style of other extensions.
  Names are usually one or two words; for example ✅"Instapaper", not ❌"Send to
  Instapaper"; ✅"Uppercase" not ❌"Convert to Uppercase".
- A well-chosen icon, clearly representing the action.
- In the Config, a clear, concise, one-sentence `description` of what the
  extension does. This is what appears on the website next to the extension
  name.
- Apart from the simplest extensions, include a `Readme.md` file explaining
  briefly how to use the extension, particularly mentioning any special features
  and configuration options. Add a Changelog at the bottom of the readme.
- Where API keys are needed, this should be clearly documented in the readme
  with instructions and a link to obtain the key.
- No pointless scripts. For example, don't use a bash script to open a URL when
  you could just use the `url` action.
- Favour JavaScript actions over Shell Script or AppleScript actions unless the
  particular action really needs to be a shell script or AppleScript.
- Shell Script extensions must work out-of-the-box on a default installation of
  the latest macOS. I won't publish extensions that require the user to install
  additional scripting languages or libraries.
- Use the Readme to give credit to yourself as the author and acknowledge any
  other contributors, open source libraries, or icon creators.
- No compiled binaries. All submissions must be source code only.
- Extensions that interact with a website or app should have an `app` dictionary
  in the Config, defining the `name` and `link` fields. The name will be
  automatically linked in the extension description.
- For extensions that work with a 3rd party macOS app, the `bundleIdentifiers`
  key with the `checkInstalled: true` option should also be used as well.
- No extensions aimed at circumventing copyright, defeating paywalls etc.
- No links to torrent / filesharing sites that predominantly index copyrighted
  content.
- Nothing that "phones home", collects user data, or modifies the user's system
  in any way.
- Nothing illegal or harmful or that you wouldn't show to your grandmother.
- The above list is not exhaustive and I reserve the right to reject a
  submission for any other reason.

With all that said... please do submit your extension! I look forward to seeing
what you come up with.

## Credits

Credits are included in the individual extension readme files.

## License

All source code is published under the MIT License ([LICENSE.txt](LICENSE.txt))
unless stated otherwise in the extension readme files.

## Changelog

Individual changelogs are included in the extension readme files.
