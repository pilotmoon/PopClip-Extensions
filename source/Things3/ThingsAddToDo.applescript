tell application id "com.culturedcode.ThingsMac"
	activate
	set newToDo to make new to do with properties {name:"{popclip text}"}
	show newToDo
end tell