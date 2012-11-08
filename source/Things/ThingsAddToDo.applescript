tell application "Things"
	activate
	set newToDo to make new to do with properties {name:(first paragraph of "{popclip text}"), notes:"{popclip text}"}
	show newToDo
end tell