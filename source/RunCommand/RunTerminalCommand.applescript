tell application "Terminal"
	activate
	set theTab to selected tab in first window
	do script "{popclip text}" in theTab
end tell