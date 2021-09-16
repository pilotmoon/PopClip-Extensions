# JavaScript Extensions for PopClip

To be used used with [PopClip Beta](https://pilotmoon.com/popclip/download).

Extension format still to be finalised. Very rough documentation follows....

`Config.js` is the main entry point. This is loaded and evaluated by PopClip. This script should invoke `define()`, passing an object to define the extension.

Example, possibly the simplest extension:

```js
define({
    identifier: "com.pilotmoon.popclip.extension.lowercase",
    name: "Lowercase",
    icon: "text:[[ab]]",
    action: (selection) => {
        popclip.pasteText(selection.text.toLowerCase())
    }
})
```

PopClip may keep the extension's code loaded in the same execution context across repeated invocations. However, extensions should not assume that the context will be preserved across invocations.

Extensions should avoid defining or modifying anything in the global namespace. 

Signed extensions are are assumed to be good citizens and are all loaded into a single execution context, to save memory. Unsigned extensions each get their own JS context so as to avoid the possibility of global namespace pollution by unruly extensions.

PopClip provides `define()` and `require()` globals to allow rudimentary module definition and loading, loosely based on the AMD format. This means that PopClip can load UMD modules, including node modules packed using browserify.

You can use `print()` for debug strings which will appear in PopClip's Console output (requiring `defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES` in Terminal to enable).

For testing code outside PopClip, you can use `/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc` to evaluate scripts. But this does not provide full environment PopClip does.

A `Config.plist` file in the extension is are ignored if a `Config.js` file is present. But it can be included to guard against loading by old PopClip versions and also to add metadata for the website directory.

todo...