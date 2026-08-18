on capture(capturedText, documentPath, inboxName, capturePosition)
	if documentPath is "" then
		error "Set the Bike document path in this extension's settings." number 502
	else if documentPath does not start with "/" then
		error "The Bike document path must be absolute (it must start with /)." number 502
	end if

	set targetFile to POSIX file documentPath

	tell application "Bike"
		try
			set targetDocument to first document whose file is targetFile
		on error
			try
				set targetDocument to open targetFile
			on error errorMessage number errorNumber
				error "Could not open Bike document at “" & documentPath & "”: " & errorMessage number errorNumber
			end try
		end try

		tell targetDocument
			if inboxName is "" then
				set destinationRow to root row
			else if exists (first row whose name is inboxName) then
				set destinationRow to first row whose name is inboxName
			else
				tell root row
					set destinationRow to make row at end of rows with properties {name:inboxName, type:heading}
				end tell
			end if

			if capturePosition is "top" then
				import from capturedText as plain text format to front of rows of destinationRow
			else
				import from capturedText as plain text format to end of rows of destinationRow
			end if
		end tell
	end tell
end capture
