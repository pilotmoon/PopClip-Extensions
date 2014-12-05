on run
	
	set theString to "{popclip urlencoded text}" as text
	set theDeviceIndex to "{popclip option ipadposition}"
	if theDeviceIndex = "1st" then
		set theDeviceIndex to "0"
	else if theDeviceIndex = "2nd" then
		set theDeviceIndex to "1"
	else if theDeviceIndex = "3rd" then
		set theDeviceIndex to "2"
	else
		error "Cannot find device. Verify settings in Options." number 502
	end if
	
	tell application "System Events"
		set theURL to "command-c://x-callback-url/copyText?deviceIndex=" & theDeviceIndex & "&text=" & theString
		open location theURL
	end tell
	
end run