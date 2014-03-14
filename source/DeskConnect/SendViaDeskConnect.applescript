tell application id "com.deskconnect.mac"
	set theUrls to "{popclip urls}"
	if number of paragraphs of theUrls is equal to 1
		send URL theUrls to all devices
	else
		send pasteboard named "Apple CFPasteboard general" to all devices from source "PopClip"
	end if
end tell
