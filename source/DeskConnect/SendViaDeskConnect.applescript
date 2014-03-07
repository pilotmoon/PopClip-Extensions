tell application id "com.deskconnect.mac"
	send pasteboard named "Apple CFPasteboard general" to all devices from source "PopClip"
end tell
