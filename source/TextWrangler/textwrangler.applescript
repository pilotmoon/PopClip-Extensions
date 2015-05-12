tell application "TextWrangler"
	activate
	make new text document with properties {contents:"{popclip text}"}
end tell