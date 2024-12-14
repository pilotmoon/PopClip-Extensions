on newDocument(theText, theURL)
    tell application id "cc.anybox.Anybox"
        -- Check if theURL is not empty
        if theURL is not "" then
            set combinedContent to theText & return & return & "source: " & theURL
        else
            set combinedContent to theText
        end if
        save combinedContent
    end tell
end newDocument
