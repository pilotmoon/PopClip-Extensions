tell application id "com.deskconnect.mac"
	set theurl to first paragraph of "{popclip urls}"
	if length of theurl > 0 then
		send URL theurl to all devices
	else
		send text "{popclip text}" to all devices
	end if	
end tell
