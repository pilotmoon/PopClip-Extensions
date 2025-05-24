on newDocument(theText)
	tell application "BBEdit"
		activate
		make new text document with properties {contents: theText}
	end tell
end newDocument	