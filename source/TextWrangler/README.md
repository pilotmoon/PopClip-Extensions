# PopClip TextWranger Extension README

This extension for [PopClip][pclip] will take the selected text and create a new `text document` in [TextWrangler][tw]. 

Being an avid [PopClip][pclip] user, I was looking for an extension that took helped me move the selection to [TextWranger][tw] (my "hack text together" tool of choice in Mac). There is not such extension in the official [PopClip Extension Directory][pclipext], but given that there is a BBEdit one, and that the extensions source is available in [GitHub][extsource], I decided to put one together.

The operating word here is *hack*. This works for me, will likely be considered ugly by everyone else, etc... Feel free to take it and make it into whatever you need for your use. If you use/keep the icon, please retain the credits 


The starting point of the extension is the already existing [BBEdit Extension][bbeditext].

I've taken "inspiration/information" for this quick hack from several sources online:

* The *canonical* extensions page: [https://github.com/pilotmoon/PopClip-Extensions][extsource]
* Other sources online, mostly <http://computers.tutsplus.com/tutorials/create-your-own-custom-extension-for-popclip--mac-50637>

### Other tricks
This StackExchange post, [How do I find out the applescript commands available for a particular app?][sepost], allowed me to get "unstuck" and change the original AppleScript. I didn't want the selected text to end up on a new window, but rather on a new *document* on the main TextWrangler  window. I tend to work with between 5 and 12 open "*untitled*" documents and didn't want to have that many windows.

A couple of other useful snippets that I've found very useful for this:

* Getting the bundle identifier of TextWrangler was so simple (once you have the solution pointed to you!) as running in a Terminal:
	`osascript -e 'id of app "TextWrangler"'`
* Before I discovered I could just "reinstall" the .popclipext Package over and over without restarting PopClip, being able to tell it to quit was also useful:
`osascript -e 'tell app "PopClip" to quit'`

### Extension Icon
Having not artistic qualities whatsoever, I haven't been able to generate a black and white version of the TextWrangler icon

The icon I've put together for the extension is a crudely hacked version of a lovely looking "alternate" icon for TextWrangler I've found [online][icon], created by [sethlilly](http://sethlilly.deviantart.com/).

![Original TextWrangler Alternative Icon](textwrangler_replacement_icon_by_sethlilly-d2zpaak.png)


[pclip]: http://pilotmoon.com/popclip/
[pclipext]: http://pilotmoon.com/popclip/extensions/
[extsource]: https://github.com/pilotmoon/PopClip-Extensions
[bbeditext]: https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/BBEdit
[tw]: http://www.barebones.com/products/textwrangler/
[icon]: http://sethlilly.deviantart.com/art/TextWrangler-Replacement-Icon-180898652
[sepost]: http://apple.stackexchange.com/questions/46521/how-do-i-find-out-the-applescript-commands-available-for-a-particular-app


